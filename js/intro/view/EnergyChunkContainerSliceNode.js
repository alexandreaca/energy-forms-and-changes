// Copyright 2014-2018, University of Colorado Boulder

/**
 * A node that represents a 2D surface on which energy chunks reside.  The surface contains z-dimension information,
 * and can thus be used to create an effect of layering in order to get a bit of a 3D appearance.  The slice itself
 * is generally invisible, but can be shown using when needed for debugging.
 *
 * @author John Blanco
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // modules
  var EFACQueryParameters = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACQueryParameters' );
  var EnergyChunkNode = require( 'ENERGY_FORMS_AND_CHANGES/common/view/EnergyChunkNode' );
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );

  /**
   * @param {EnergyChunkContainerSlice} slice
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function EnergyChunkContainerSliceNode( slice, modelViewTransform ) {

    var self = this;
    this.modelViewTransform = modelViewTransform;
    Node.call( this );

    // define a function that will add and remove energy chunk nodes as energy come and go in the model
    function addEnergyChunkNode( addedChunk ) {
      var energyChunkNode = new EnergyChunkNode( addedChunk, modelViewTransform );
      self.addChild( energyChunkNode );
      slice.energyChunkList.addItemRemovedListener( function removalListener( removedChunk ) {
        if ( removedChunk === addedChunk ) {
          self.removeChild( energyChunkNode );
          energyChunkNode.dispose();
          slice.energyChunkList.removeItemRemovedListener( removalListener );
        }
      } );
    }

    // add the initial energy chunks
    slice.energyChunkList.forEach( addEnergyChunkNode );

    // listen for the arrival of new energy chunks and create a node for each
    slice.energyChunkList.addItemAddedListener( addEnergyChunkNode );

    // for debug
    if ( EFACQueryParameters.showHelperShapes ) {
      this.shapeNode = new Path( modelViewTransform.modelToViewShape( slice.shape ), {
        lineWidth: 1,
        stroke: 'red'
      } );
      this.addChild( this.shapeNode );
    }

    // for debug, move slice outlines when their position moves
    slice.anchorPointProperty.lazyLink( function( newPosition, oldPosition ) {
      if ( EFACQueryParameters.showHelperShapes ) {
        var translation = modelViewTransform.modelToViewDelta( newPosition.minus( oldPosition ) );
        self.shapeNode.translate( translation.x, translation.y );
      }
    } );
  }

  energyFormsAndChanges.register( 'EnergyChunkContainerSliceNode', EnergyChunkContainerSliceNode );

  return inherit( Node, EnergyChunkContainerSliceNode );
} );
