// Copyright 2016, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Modules
  var EFACBaseNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/EFACBaseNode' );
  var EnergyChunkLayer = require( 'ENERGY_FORMS_AND_CHANGES/common/view/EnergyChunkLayer' );
  var FaucetAndWater = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/FaucetAndWater' );
  var FaucetNode = require( 'SCENERY_PHET/FaucetNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var WaterDropNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/WaterDropNode' );

  // Constants
  var FAUCET_NODE_HORIZONTAL_LENGTH = 700; // In screen coords, which are close to pixels

  /**
   * @param {FaucetAndWater} faucet EnergySource
   * @param {Property.<boolean>} energyChunksVisibleProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function FaucetAndWaterNode( faucet, energyChunksVisibleProperty, modelViewTransform ) {

    EFACBaseNode.call( this, faucet, modelViewTransform );

    var maxFlowProportion = 1.0;
    var faucetNode = new FaucetNode( maxFlowProportion, faucet.flowProportionProperty, faucet.activeProperty, {
      horizontalPipeLength: FAUCET_NODE_HORIZONTAL_LENGTH,
      verticalPipeLength: 40,
      closeOnRelease: false
    } );

    faucetNode.setScaleMagnitude( 0.5 );

    // Position faucet node
    var faucetToWater = modelViewTransform.modelToViewDelta( FaucetAndWater.OFFSET_FROM_CENTER_TO_WATER_ORIGIN );
    var dx = -faucetNode.center.x + faucetToWater.x;
    var dy = faucetNode.center.y + faucetToWater.y - 120; // y adjustment due to use of different FaucetNode than Java
    faucetNode.translate( dx, dy );

    // Create the water, which consists of a set of water drops.
    var waterLayer = new Node();
    waterLayer.translate(faucetToWater);

    function addDroplet( droplet ) {
      var waterDropNode = new WaterDropNode( droplet, modelViewTransform );
      waterLayer.addChild( waterDropNode );

      // When droplet is removed from the model, remove its node from the view
      var itemRemovedListener = function( removedDroplet ) {
        if ( removedDroplet === droplet ) {
          waterLayer.removeChild( waterDropNode );

          // Remove this listener to reclaim memory
          faucet.waterDrops.removeItemRemovedListener( itemRemovedListener );
        }
      };

      // Link itemRemovedListener to the waterDrops ObservableArray
      faucet.waterDrops.addItemRemovedListener( itemRemovedListener );
    }

    faucet.waterDrops.addItemAddedListener( addDroplet );

    // Create the energy chunk layer.
    var energyChunkLayer = new EnergyChunkLayer( faucet.energyChunkList, faucet.positionProperty, modelViewTransform );

    this.addChild( waterLayer );
    this.addChild( energyChunkLayer );
    this.addChild( faucetNode );
  }

  return inherit( EFACBaseNode, FaucetAndWaterNode );
} );

