// Copyright 2002-2015, University of Colorado

/**
 * Model element that represents a beaker that can contain other thermal model elements.
 *
 * @author John Blanco
 */

define( function( require ) {
  'use strict';

  // modules
  var Beaker = require( 'ENERGY_FORMS_AND_CHANGES/common/model/Beaker' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'DOT/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var EnergyChunkWanderController = require( 'ENERGY_FORMS_AND_CHANGES/intro/model/EnergyChunkWanderController' );

  /**
   *
   * @param {Vector2} initialPosition
   * @param {number} width
   * @param {number} height
   * @param potentiallyContainedElements
   * @param {Property.<boolean>} energyChunksVisibleProperty
   * @constructor
   */
  function BeakerContainer( initialPosition, width, height, potentiallyContainedElements, energyChunksVisibleProperty ) {

    Beaker.call( this, initialPosition, width, height, energyChunksVisibleProperty );
    this.potentiallyContainedElements = potentiallyContainedElements;

  }

  return inherit( Beaker, BeakerContainer, {

    /**
     * Update the fluid level in the beaker based upon any displacement that could be caused by the given rectangles.
     * This algorithm is strictly two dimensional, even though displacement is more of the 3D concept.
     *
     * @param {Array.<Rectangle>} potentiallyDisplacingRectangles
     *
     */
    updateFluidLevel: function( potentiallyDisplacingRectangles ) {
      // represents the fluid and the displacing rectangles.
      var fluidRectangle = new Rectangle( this.getRect().getX(), this.getRect().getY(), this.width, this.height * this.fluidLevel );
      var overlappingArea = 0;
      potentiallyDisplacingRectangles.forEach( function( rectangle ) {
        if ( rectangle.intersectsBounds( fluidRectangle ) ) {
          var intersection = rectangle.intersection( fluidRectangle );
          overlappingArea += intersection.width * intersection.height;
        }
      } );

      // empirically determined to look good.
      var newFluidLevel = Math.min( EFACConstants.INITIAL_FLUID_LEVEL + overlappingArea * 120, 1 );
      var proportionateIncrease = newFluidLevel / this.fluidLevel;
      this.fluidLevel = newFluidLevel;

      // Update the shapes of the energy chunk slices.
      this.slices.forEach( function( slice ) {

        // TODO: I believe that this is a correct port of the affine transformations required here.  However, I am leaving the in the Java until this
        // can be thoroughly tested.
        var originalShape = slice.shape;
        var expandedOrCompressedShape = originalShape.transformed( Matrix3.scaling( 1, proportionateIncrease ) );
        var translationTransform = Matrix3.translation( originalShape.bounds.minX - expandedOrCompressedShape.bounds.minX,
          originalShape.bounds.y - expandedOrCompressedShape.bounds.y );
        slice.shape = expandedOrCompressedShape.transformed( translationTransform );

        //Shape originalShape = slice.getShape();
        //Shape expandedOrCompressedShape = AffineTransform.getScaleInstance( 1, proportionateIncrease ).createTransformedShape( originalShape );
        //AffineTransform translationTransform = AffineTransform.getTranslateInstance( originalShape.getBounds2D().getX() - expandedOrCompressedShape.getBounds2D().getX(),
        //  originalShape.getBounds2D().getY() - expandedOrCompressedShape.getBounds2D().getY() );
        //slice.setShape( translationTransform.createTransformedShape( expandedOrCompressedShape ) );

      } );
    },

    /**
     * *
     * @private
     * @param {EnergyChunk} energyChunk
     * @returns {boolean}
     */
    isEnergyChunkObscured: function( energyChunk ) {
      this.potentiallyContainedElements.forEach( function( element ) {
        if ( this.getThermalContactArea().bounds.contains( element.getRect() ) && element.getProjectedShape().contains( energyChunk.position ) ) {
          return true;
        }
      } );
      return false;
    },

    /**
     *
     * @param {number} dt
     */
    animateNonContainedEnergyChunks: function( dt ) {
      this.energyChunkWanderControllers.slice( 0 ).forEach( function( energyChunkWanderController ) {
        var energyChunk = energyChunkWanderController.getEnergyChunk();
        if ( this.isEnergyChunkObscured( energyChunk ) ) {
          // beaker to the fluid, so move it sideways.
          var xVel = 0.05 * dt * ( this.getCenterPoint().getX() > energyChunk.position.x ? -1 : 1);
          var motionVector = new Vector2( xVel, 0 );
          energyChunk.translate( motionVector );
        }
        else {
          energyChunkWanderController.updatePosition( dt );
        }
        if ( !this.isEnergyChunkObscured( energyChunk ) && this.getSliceBounds().contains( energyChunk.position ) ) {
          // stop moving.
          this.moveEnergyChunkToSlices( energyChunkWanderController.getEnergyChunk() );
        }
      } );
    },

    /**
     * *
     * @param {EnergyChunk} energyChunk
     */
    addEnergyChunk: function( energyChunk ) {
      if ( this.isEnergyChunkObscured( energyChunk ) ) {
        // because the chunk just came from the model element.
        energyChunk.zPosition.set( 0.0 );
        this.approachingEnergyChunks.add( energyChunk );
        this.energyChunkWanderControllers.add( new EnergyChunkWanderController( energyChunk, this.position ) );
      }
      else {
        this.addEnergyChunk( energyChunk );
      }
    }
  } );
} );
