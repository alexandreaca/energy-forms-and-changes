// Copyright 2014-2019, University of Colorado Boulder

/**
 * type that represents a chunk of energy in the view
 *
 * @author John Blanco
 */

define( require => {
  'use strict';

  // modules
  const energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  // static data
  let instanceCount = 0; // counter for creating unique IDs

  class EnergyChunk {

    /**
     * @param {EnergyType} initialEnergyType
     * @param {Vector2} initialPosition
     * @param {Vector2} initialVelocity
     * @param {BooleanProperty} visibleProperty
     */
    constructor( initialEnergyType, initialPosition, initialVelocity, visibleProperty ) {

      // @public
      this.positionProperty = new Vector2Property( initialPosition );

      // @public - for simple 3D layering effects
      this.zPositionProperty = new NumberProperty( 0 );

      // @public - TODO: convert to enumeration and enumerationProperty
      this.energyTypeProperty = new Property( initialEnergyType );

      // @public
      this.visibleProperty = visibleProperty;

      // @public (read-only) {number} - an ID that will be used to track this energy chunk
      this.id = instanceCount++;

      // @public {Vector2}
      this.velocity = new Vector2( initialVelocity.x, initialVelocity.y );
    }

    /**
     * set the position
     * @param {number} x
     * @param {number} y
     * @public
     */
    setPositionXY( x, y ) {

      // only update if the position has changed to avoid unnecessary allocations and notifications
      const currentPosition = this.positionProperty.get();
      if ( x !== currentPosition.x || y !== currentPosition.y ) {
        this.positionProperty.set( new Vector2( x, y ) );
      }
    }

    /**
     * set the position
     * @param {Vector2} position
     * @public
     */
    setPosition( position ) {

      // only update if the position has changed to avoid unnecessary allocations and notifications
      const currentPosition = this.positionProperty.get();
      if ( !currentPosition.equals( position ) ) {
        this.positionProperty.set( position );
      }
    }

    /**
     * translate the energy chunk by amount specified
     * @param {number} x
     * @param {number} y
     * @public
     */
    translate( x, y ) {
      const oldPosition = this.positionProperty.get();
      this.positionProperty.set( new Vector2( oldPosition.x + x, oldPosition.y + y ) );
    }

    /**
     * translate the energy chunk based on its velocity
     * @param {number} dt - delta time
     */
    translateBasedOnVelocity( dt ) {
      this.translate( this.velocity.x * dt, this.velocity.y * dt );
    }

    /**
     * Function that returns the velocity of the energy chunk
     * @returns {Vector2}
     * @public
     */
    getVelocity() {
      return this.velocity.copy();
    }

    /**
     * set the X and Y velocity of the energy chunk
     * @param {number} x
     * @param {number} y
     * @public
     */
    setVelocityXY( x, y ) {
      this.velocity.setXY( x, y );
    }

    /**
     * set the velocity of the energy chunk (using a vector)
     * @param {Vector2} newVelocity
     * @public
     */
    setVelocity( newVelocity ) {
      this.velocity.set( newVelocity );
    }

    /**
     * @public
     */
    reset() {
      this.positionProperty.reset();
      this.zPositionProperty.reset();
      this.energyTypeProperty.reset();
      this.visibleProperty.reset();
    }
  }

  return energyFormsAndChanges.register( 'EnergyChunk', EnergyChunk );
} );

