// Copyright 2016-2019, University of Colorado Boulder

/**
 * base type for model elements that can be positioned and faded
 *
 * @author John Blanco
 * @author Andrew Adare
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  const energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PositionableModelElement = require( 'ENERGY_FORMS_AND_CHANGES/systems/model/PositionableModelElement' );
  const Range = require( 'DOT/Range' );

  class PositionableFadableModelElement extends PositionableModelElement {

    /**
     * @param {Vector2} initialPosition
     * @param {number} initialOpacity
     * @param {Tandem} tandem
     */
    constructor( initialPosition, initialOpacity, tandem ) {
      super( initialPosition, tandem );

      // @public {NumberProperty}
      this.opacityProperty = new NumberProperty( initialOpacity, {
        range: new Range( 0, 1 ),
        tandem: tandem.createTandem( 'opacityProperty' )
      } );
    }
  }

  return energyFormsAndChanges.register( 'PositionableFadableModelElement', PositionableFadableModelElement );
} );

