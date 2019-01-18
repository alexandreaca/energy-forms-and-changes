// Copyright 2019, University of Colorado Boulder

/**
 * an object that is used to keep a record of energy that is exchanged between two model elements
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * inner type which defines the structure where energy exchanges are tracked
   * @param {string} fromID
   * @param {string} toID
   * @param {number} energyAmount - in joules
   * @constructor
   */
  function EnergyBalanceRecord( fromID, toID, energyAmount ) {

    // objects can't exchange energy with themselves
    assert && assert( fromID !== toID );

    // For ease of locating the exchange records, they are set up so that the 'from' ID precedes the 'to' ID in lexical
    // order.  That is checked here.
    assert && assert( fromID < toID, 'fromID must precede toID in lexical order' );

    // @public (read-only) {string} - id of the entity from which the energy was transferred
    this.fromID = fromID;

    // @public (read-only) {string} - id of the entity to which the energy was transferred
    this.toID = toID;

    // @public {number} - amount of energy transferred, negative values indicate reverse direction
    this.energyBalance = energyAmount;

    // @public {boolean} - flag that is used to mark whether energy was recently transferred
    this.recentlyUpdated = true;
  }

  energyFormsAndChanges.register( 'EnergyBalanceRecord', EnergyBalanceRecord );

  return inherit( Object, EnergyBalanceRecord );
} );