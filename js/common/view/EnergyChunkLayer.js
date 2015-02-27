// Copyright 2002-2015, University of Colorado

/**
 * This node monitors the comings and goings of energy
 * chunks on a observable list and adds/removes them from this node.  This is
 * intended to be used in other Nodes that represent model elements that
 * contain energy chunks.
 * <p/>
 * This was done as a separate class so that it could be used in composition
 * rather than inheritance, because composition allows better control over the
 * layering within the parent PNode.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyChunk = require( 'ENERGY_FORMS_AND_CHANGES/common/model/EnergyChunk' );
  var EnergyChunkNode = require( 'ENERGY_FORMS_AND_CHANGES/common/model/EnergyChunkNode' );
  var EnergyType = require( 'ENERGY_FORMS_AND_CHANGES/common/model/EnergyType' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * *
   * @param energyChunkList
   * @param {Property.<Vector2>} parentPositionProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function EnergyChunkLayer( energyChunkList, parentPositionProperty, modelViewTransform ) {
    Node.call( this );

    // existence in the model.
    var energyChunkLayer = this;

    energyChunkList.addItemAddedListener( function( addedEnergyChunk ) {
      var energyChunkNode = new EnergyChunkNode( addedEnergyChunk, modelViewTransform );
      energyChunkLayer.addChild( energyChunkNode );

      // Remove the energy chunk nodes as they are removed from the model.
      energyChunkList.removeItemAddedListener( function( removedEnergyChunk ) {
        if ( removedEnergyChunk === addedEnergyChunk ) {
          energyChunkLayer.removeChild( energyChunkNode );
        }
      } );
    } );

    // compensate.
    parentPositionProperty.link( function( position ) {
      energyChunkLayer.setOffset( -modelViewTransform.modelToViewX( position.x ), -modelViewTransform.modelToViewY( position.y ) );
    } );
  }

  return inherit( Node, EnergyChunkLayer );
} );

//
//// Copyright 2002-2015, University of Colorado

//package edu.colorado.phet.energyformsandchanges.common.view;
//
//import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;
//import edu.colorado.phet.common.phetcommon.model.property.ObservableProperty;
//import edu.colorado.phet.common.phetcommon.util.ObservableList;
//import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;
//import edu.colorado.phet.common.phetcommon.view.graphics.transforms.ModelViewTransform;
//import edu.colorado.phet.energyformsandchanges.common.model.EnergyChunk;
//import edu.colorado.phet.energyformsandchanges.common.model.EnergyType;
//import edu.umd.cs.piccolo.PNode;
//
///**
// * This class is a PNode that monitors the comings and goings of energy
// * chunks on a observable list and adds/removes them from this node.  This is
// * intended to be used in other PNodes that represent model elements that
// * contain energy chunks.
// * <p/>
// * This was done as a separate class so that it could be used in composition
// * rather than inheritance, because composition allows better control over the
// * layering within the parent PNode.
// *
// * @author John Blanco
// */
//public class EnergyChunkLayer extends PNode {
//
//  public EnergyChunkLayer( final ObservableList<EnergyChunk> energyChunkList, ObservableProperty<Vector2D> parentPosition, final ModelViewTransform modelViewTransform ) {
//
//    // Add energy chunk nodes as children as the energy chunks come in to
//    // existence in the model.
//    energyChunkList.addElementAddedObserver( new VoidFunction1<EnergyChunk>() {
//      public void apply( final EnergyChunk addedEnergyChunk ) {
//        final EnergyChunkNode energyChunkNode = new EnergyChunkNode( addedEnergyChunk, modelViewTransform );
//        addChild( energyChunkNode );
//        // Remove the energy chunk nodes as they are removed from the model.
//        energyChunkList.addElementRemovedObserver( new VoidFunction1<EnergyChunk>() {
//          public void apply( EnergyChunk removedEnergyChunk ) {
//            if ( removedEnergyChunk == addedEnergyChunk ) {
//              removeChild( energyChunkNode );
//            }
//          }
//        } );
//      }
//    } );
//
//    // Since the energy chunk positions are in model coordinates, this node
//    // must maintain a position that is offset from the parent in order to
//    // compensate.
//    parentPosition.addObserver( new VoidFunction1<Vector2D>() {
//      public void apply( Vector2D position ) {
//        setOffset( -modelViewTransform.modelToViewX( position.x ),
//          -modelViewTransform.modelToViewY( position.y ) );
//      }
//    } );
//  }
//}
