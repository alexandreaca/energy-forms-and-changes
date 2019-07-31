// Copyright 2016-2019, University of Colorado Boulder

/**
 * model of a cloud that can block energy coming from the sun
 *
 * @author  John Blanco
 * @author  Andrew Adare
 */
define( require => {
  'use strict';

  // modules
  const energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Shape = require( 'KITE/Shape' );

  // constants
  const WIDTH = 0.035; // In meters, though obviously not to scale.  Empirically determined.
  const HEIGHT = WIDTH * 0.55; // determined from the approximate aspect ratio of the image

  class Cloud {

    /**
     * @param {Vector2} offsetFromParent
     * @param {Property.<Vector2>} parentPositionProperty
     */
    constructor( offsetFromParent, parentPositionProperty ) {

      // @public {NumberProperty} - existence strength, which basically translates to opacity, of the cloud
      this.existenceStrengthProperty = new NumberProperty( 1.0 );

      // @public (read-only) {number} - offset position for this cloud
      this.offsetFromParent = offsetFromParent;

      // @private {number} - used to calculate this cloud's position
      this.parentPositionProperty = parentPositionProperty;

      //REVIEW #247 missing visibility annotation, type expression, description of null
      this.cloudEllipse = null;

      this.parentPositionProperty.link( parentPosition => {
        const center = parentPosition.plus( this.offsetFromParent );
        this.cloudEllipse = Shape.ellipse( center.x, center.y, WIDTH / 2, HEIGHT / 2, 0, 0, 0, false );
      } );
    }

    /**
     * return ellipse with size of this cloud
     * @returns {Shape.ellipse} - ellipse with axes sized to width and height of cloud
     * @public
     */
    getCloudAbsorptionReflectionShape() {
      return this.cloudEllipse;
    }

    /**
     * @returns {Vector2} Center position of cloud
     * @public
     */
    getCenterPosition() {
      return this.parentPositionProperty.get().plus( this.offsetFromParent );
    }

  }

  // statics
  Cloud.WIDTH = WIDTH;
  Cloud.HEIGHT = HEIGHT;

  return energyFormsAndChanges.register( 'Cloud', Cloud );
} );

