// Copyright 2016-2020, University of Colorado Boulder

/**
 * base class for energy sources, i.e. model elements that produce energy and can supply it to other energy system
 * components, such as energy converters or energy users
 *
 * @author John Blanco
 * @author Andrew Adare
 * @author Jesse Greenberg
 */

import energyFormsAndChanges from '../../energyFormsAndChanges.js';
import EnergySystemElement from './EnergySystemElement.js';

class EnergySource extends EnergySystemElement {

  /**
   * @param {Image} iconImage Image to identify source on carousel menu
   * @param {Tandem} tandem
   */
  constructor( iconImage, tandem ) {
    super( iconImage, tandem );
    this.outgoingEnergyChunks = [];
  }

  /**
   * Get the energy chunks that this source wants to transfer to the next energy system element. This is a mutating
   * operation: it removes all outgoing chunks from both this.energyChunkList and this.outgoingEnergyChunks.
   * @returns {EnergyChunk[]} List of energy chunks to transfer
   * @public
   */
  extractOutgoingEnergyChunks() {

    // remove all outgoing chunks from this.energyChunkList
    this.energyChunkList.removeAll( this.outgoingEnergyChunks );

    // return a copy of the outgoing chunk list and clear it in one fell swoop
    return this.outgoingEnergyChunks.splice( 0 );
  }

  /**
   * clear internal list of energy chunks and outgoing energy chunks
   * @protected
   * @override
   */
  clearEnergyChunks() {
    super.clearEnergyChunks();
    this.outgoingEnergyChunks.length = 0;
  }
}

energyFormsAndChanges.register( 'EnergySource', EnergySource );
export default EnergySource;