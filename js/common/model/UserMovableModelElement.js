// Copyright 2014-2019, University of Colorado Boulder

/**
 * base class for model elements that can be moved around by the user
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  const ModelElement = require( 'ENERGY_FORMS_AND_CHANGES/common/model/ModelElement' );
  const Property = require( 'AXON/Property' );

  class UserMovableModelElement extends ModelElement {

    /**
     * {Vector2} initialPosition
     */
    constructor( initialPosition ) {
      super( initialPosition );

      // @public {BooleanProperty}
      this.userControlledProperty = new BooleanProperty( false );

      // @protected {HorizontalSurface|null} - The surface upon which this model element is resting.  This is null if the
      // element is not resting on a movable surface.  This should only be set through the getter/setter methods below.
      this.supportingSurface = null;

      // @public {Property.<number>}
      this.verticalVelocityProperty = new Property( 0 );

      // update internal state when the user picks up this model element
      this.userControlledProperty.link( userControlled => {
        if ( userControlled ) {

          // the user has picked up this model element, so it is no longer sitting on any surface
          this.clearSupportingSurface();
        }
      } );

      // @private - observer that moves this model element if and when the surface that is supporting it moves
      this.surfaceMotionObserver = position => {
        this.positionProperty.value = position;
      };
    }

    /**
     * restore initial state
     * @public
     */
    reset() {
      this.clearSupportingSurface();
      this.userControlledProperty.reset();
      this.verticalVelocityProperty.reset();
      super.reset();
    }

    /**
     * Set the supporting surface of this model element
     * @param {HorizontalSurface} supportingSurface
     * @override
     * @public
     */
    setSupportingSurface( supportingSurface ) {

      // state and parameter checking
      assert && assert(
        supportingSurface !== null,
        'this method should not be used to clear the supporting surface'
      );
      assert && assert(
        this.supportingSurface === null,
        'a supporting surface was already set'
      );

      supportingSurface.positionProperty.link( this.surfaceMotionObserver );
      this.supportingSurface = supportingSurface;
    }

    /**
     * clear the supporting surface so that this model element is no longer sitting on a surface
     * @private
     */
    clearSupportingSurface() {

      // only do something if the supporting surface was set
      if ( this.supportingSurface !== null ) {
        this.supportingSurface.positionProperty.unlink( this.surfaceMotionObserver );
        this.supportingSurface.elementOnSurfaceProperty.set( null );
        this.supportingSurface = null;
      }
    }

    /**
     * get a value that indicates whether this element is stacked upon the given model element
     * @param {ModelElement} element - model element to be checked
     * @returns {boolean} - true if this model element is stacked anywhere on top of the provided element, which
     * includes cases where one or more elements are in between.
     * @public
     * @override
     */
    isStackedUpon( element ) {
      const surface = this.supportingSurface ? this.supportingSurface : null;
      return ( surface !== null ) && ( surface.owner === element || surface.owner.isStackedUpon( element ) );
    }
  }

  return energyFormsAndChanges.register( 'UserMovableModelElement', UserMovableModelElement );
} );

