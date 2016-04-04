// Copyright 2016, University of Colorado Boulder

/**
 * A drop of water, generally used to create a stream of water.
 *
 * @author John Blanco
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // Modules
  var PropertySet = require( 'AXON/PropertySet' );
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Dimension2 = require( 'DOT/Dimension2' );

  // The following constant is used to adjust the way in which the drop
  // elongates as its velocity increases.
  var WIDTH_CHANGE_TWEAK_FACTOR = 2;

  /**
   * @param {Vector2} initialOffsetFromParent (x,y) offset in model space
   * @param {Vector2} initialVelocity         2-D velocity at initialization
   * @param {Dimension2} size                 Droplet dimensions
   */
  function WaterDrop( initialOffsetFromParent, initialVelocity, size ) {

    PropertySet.call( this, {
      offsetFromParent: initialOffsetFromParent,
      velocity: initialVelocity,
      size: size
    } );

    this.velocityProperty.link( function( velocity ) {
      var newWidth = ( 1 / ( 1 + velocity.magnitude() * WIDTH_CHANGE_TWEAK_FACTOR ) ) * this.size.width;
      var newHeight = ( this.size.height * this.size.width ) / newWidth;
      this.size.set( new Dimension2( newWidth, newHeight ) );
    } );
  }

  energyFormsAndChanges.register( 'WaterDrop', WaterDrop );

  return inherit( PropertySet, WaterDrop );
} );
