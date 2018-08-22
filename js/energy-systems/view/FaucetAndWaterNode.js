// Copyright 2016, University of Colorado Boulder

/**
 * a scenery node that represents a faucet from which water flows
 *
 * @author John Blanco
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  var EnergyChunkLayer = require( 'ENERGY_FORMS_AND_CHANGES/common/view/EnergyChunkLayer' );
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var FallingWaterCanvasNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/FallingWaterCanvasNode' );
  var FaucetAndWater = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/FaucetAndWater' );
  var FaucetNode = require( 'SCENERY_PHET/FaucetNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoveFadeModelElementNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/MoveFadeModelElementNode' );

  // constants
  var FAUCET_NODE_HORIZONTAL_LENGTH = 1400; // empirically determined to be long enough that end is generally not seen

  /**
   * @param {FaucetAndWater} faucet EnergySource
   * @param {Property.<boolean>} energyChunksVisibleProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function FaucetAndWaterNode( faucet, energyChunksVisibleProperty, modelViewTransform ) {

    MoveFadeModelElementNode.call( this, faucet, modelViewTransform );

    var maxFlowProportion = 1.0;
    var faucetNode = new FaucetNode( maxFlowProportion, faucet.flowProportionProperty, faucet.activeProperty, {
      horizontalPipeLength: FAUCET_NODE_HORIZONTAL_LENGTH,
      verticalPipeLength: 40,
      scale: 0.45
    } );

    // position faucet node such that the water will appear to come out of it
    var faucetToWater = modelViewTransform.modelToViewDelta( FaucetAndWater.OFFSET_FROM_CENTER_TO_WATER_ORIGIN );
    faucetNode.right = faucetToWater.x + 30;
    faucetNode.bottom = faucetToWater.y;

    // create the water, which consists of a set of water drops
    this.fallingWaterCanvasNode = new FallingWaterCanvasNode(
      faucet.waterDrops,
      modelViewTransform,
      {
        canvasBounds: new Bounds2(
          -modelViewTransform.modelToViewDeltaX( FaucetAndWater.MAX_WATER_WIDTH ),
          0,
          modelViewTransform.modelToViewDeltaX( FaucetAndWater.MAX_WATER_WIDTH ),
          EFACConstants.SCREEN_LAYOUT_BOUNDS.maxY
        )
      }
    );
    this.fallingWaterCanvasNode.translate( faucetToWater.addXY( 0, -40 ) );

    // create the energy chunk layer
    var energyChunkLayer = new EnergyChunkLayer( faucet.energyChunkList, faucet.positionProperty, modelViewTransform );

    this.addChild( this.fallingWaterCanvasNode );
    this.addChild( energyChunkLayer );
    this.addChild( faucetNode );
  }

  energyFormsAndChanges.register( 'FaucetAndWaterNode', FaucetAndWaterNode );

  return inherit( MoveFadeModelElementNode, FaucetAndWaterNode, {
    /**
     * @public
     * @param {number} dt - the change in time
     */
    step: function( dt ) {
      this.fallingWaterCanvasNode.step( dt );
    }
  } );
} );
