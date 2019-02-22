// Copyright 2018-2019, University of Colorado Boulder

/**
 * a scenery node that looks like water in a cylindrical container as seen from slightly above the horizon
 * @author John Blanco
 */

define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  const energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );
  const BeakerSteamCanvasNode = require( 'ENERGY_FORMS_AND_CHANGES/common/view/BeakerSteamCanvasNode' );

  // constants
  const PERSPECTIVE_PROPORTION = -EFACConstants.Z_TO_Y_OFFSET_MULTIPLIER;

  // constants for the PerspectiveWaterNode
  const FLUID_LINE_WIDTH = 2;

  class PerspectiveWaterNode extends Node {

    /**
     * @param {Rectangle} beakerOutlineRect
     * @param {Property.<number>} fluidLevelProperty
     * @param {Property.<number>} temperatureProperty
     * @param {number} fluidBoilingPoint
     * @param {Color} fluidColor
     * @param {Color} steamColor
     */
    constructor( beakerOutlineRect, fluidLevelProperty, temperatureProperty, fluidBoilingPoint, fluidColor, steamColor ) {
      super();

      // @private
      this.beakerOutlineRect = beakerOutlineRect;
      this.fluidLevelProperty = fluidLevelProperty;
      this.temperatureProperty = temperatureProperty;
      this.fluidBoilingPoint = fluidBoilingPoint;
      this.fluidColor = fluidColor;
      this.steamColor = steamColor;

      // @private - a rectangle that defines the size of the fluid within the beaker
      this.fluidBounds = Bounds2.NOTHING.copy();

      // @private - nodes that represent the top and body of the water
      this.liquidWaterTopNode = new Path( null, {
        fill: this.fluidColor.colorUtilsBrighter( 0.25 ),
        lineWidth: FLUID_LINE_WIDTH,
        stroke: this.fluidColor.colorUtilsDarker( 0.2 )
      } );
      this.liquidWaterBodyNode = new Path( null, {
        fill: this.fluidColor,
        lineWidth: FLUID_LINE_WIDTH,
        stroke: this.fluidColor.colorUtilsDarker( 0.2 )
      } );

      this.steamCanvasNode = new BeakerSteamCanvasNode(
        this.beakerOutlineRect,
        this.fluidLevelProperty,
        this.temperatureProperty,
        this.fluidBoilingPoint,
        this.steamColor, {
          canvasBounds: new Bounds2(
            -EFACConstants.SCREEN_LAYOUT_BOUNDS.maxX / 2,
            -EFACConstants.SCREEN_LAYOUT_BOUNDS.maxY,
            EFACConstants.SCREEN_LAYOUT_BOUNDS.maxX / 2,
            EFACConstants.SCREEN_LAYOUT_BOUNDS.maxY
          )
        } );
      this.addChild( this.liquidWaterBodyNode );
      this.addChild( this.liquidWaterTopNode );
      this.addChild( this.steamCanvasNode );

      // update the appearance of the water as the level changes
      this.fluidLevelProperty.link( fluidLevel => {
        const fluidHeight = beakerOutlineRect.height * fluidLevel;
        this.fluidBounds.setMinMax(
          beakerOutlineRect.minX,
          beakerOutlineRect.maxY - fluidHeight,
          beakerOutlineRect.maxX,
          0
        );
        this.updateWaterAppearance();
      } );
    }

    /**
     * @public
     */
    reset() {
      this.steamCanvasNode.reset();
    }

    /**
     * time step function for the water
     * @param {number} dt - the change in time
     * @public
     */
    step( dt ) {
      this.steamCanvasNode.step( dt );
    }

    /**
     * update the appearance of the water
     * @private
     */
    updateWaterAppearance() {
      const ellipseWidth = this.fluidBounds.width;
      const ellipseHeight = PERSPECTIVE_PROPORTION * ellipseWidth;
      const liquidWaterTopEllipse = Shape.ellipse(
        this.fluidBounds.centerX,
        this.fluidBounds.minY,
        ellipseWidth / 2,
        ellipseHeight / 2,
        0,
        0,
        Math.PI / 2,
        false
      );

      const halfWidth = this.fluidBounds.width / 2;
      const halfHeight = ellipseHeight / 2;
      const liquidWaterBodyShape = new Shape()
        .moveTo( this.fluidBounds.minX, this.fluidBounds.minY ) // Top left of the beaker body.
        .ellipticalArc( this.fluidBounds.centerX, this.fluidBounds.minY, halfWidth, halfHeight, 0, Math.PI, 0, false )
        .lineTo( this.fluidBounds.maxX, this.fluidBounds.maxY ) // Bottom right of the beaker body.
        .ellipticalArc( this.fluidBounds.centerX, this.fluidBounds.maxY, halfWidth, halfHeight, 0, 0, Math.PI, false )
        .close();

      this.liquidWaterBodyNode.setShape( liquidWaterBodyShape );
      this.liquidWaterTopNode.setShape( liquidWaterTopEllipse );
    }
  }

  return energyFormsAndChanges.register( 'PerspectiveWaterNode', PerspectiveWaterNode );
} );