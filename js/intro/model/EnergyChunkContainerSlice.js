// Copyright 2002-2015, University of Colorado

/**
 * This class represents a "slice" within a 2D container that contains a set of
 * energy chunks and can be used to add some limited 3D capabilities by having
 * some z-dimension information.  The slice consists of a 2D shape and a Z
 * value representing its position in Z space.
 *
 * @author John Blanco
 */


define( function() {
  'use strict';

  //modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ObservableArray = require( 'AXON/ObservableArray' );


  /**
   *
   * @param {Shape} shape
   * @param {Vector2} zPosition
   * @param {Property} anchorPointProperty a vector
   * @constructor
   */
  function EnergyChunkContainerSlice( shape, zPosition, anchorPointProperty ) {
    var self = this;
    this.shape = shape;
    this.zPosition = zPosition;

    this.energyChunkList = new ObservableArray();

    // Monitor the anchor position and move the contained energy chunks to match.
    anchorPointProperty.link( function( newPosition, oldPosition ) {
      // TODO: there is something wrong here
      var translation = newPosition.minus( oldPosition );
      //TODO How to do this in javascript?
      self.shape = AffineTransform.getTranslateInstance( translation.getX(), translation.getY() ).createTransformedShape( EnergyChunkContainerSlice.this.shape );
      self.energyChunkList.forEach( function( energyChunk ) {
        energyChunk.translate( translation );
      } );
    } );
  }

  return inherit( Object, EnergyChunkContainerSlice, {

    addEnergyChunk: function( energyChunk ) {
      energyChunk.zPosition = this.zPosition;
      this.energyChunkList.push( energyChunk );
    },

    getNumEnergyChunks: function() {
      return this.energyChunkList.length;
    },

    setShape: function( shape ) {
      this.shape = shape;
    },

    getShape: function() {
      return shape;
    }
  } );
} );


//// Copyright 2002-2015, University of Colorado

//package edu.colorado.phet.energyformsandchanges.intro.model;
//
//import java.awt.Shape;
//import java.awt.geom.AffineTransform;
//
//import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;
//import edu.colorado.phet.common.phetcommon.model.property.ChangeObserver;
//import edu.colorado.phet.common.phetcommon.model.property.ObservableProperty;
//import edu.colorado.phet.common.phetcommon.util.ObservableList;
//import edu.colorado.phet.energyformsandchanges.common.model.EnergyChunk;
//
///**
// * This class represents a "slice" within a 2D container that contains a set of
// * energy chunks and can be used to add some limited 3D capabilities by having
// * some z-dimension information.  The slice consists of a 2D shape and a Z
// * value representing its position in Z space.
// *
// * @author John Blanco
// */
//public class EnergyChunkContainerSlice {
//  public final ObservableList<EnergyChunk> energyChunkList = new ObservableList<EnergyChunk>();
//  private final double zPosition;
//
//  private Shape shape;
//
//  public EnergyChunkContainerSlice( Shape shape, double zPosition, ObservableProperty<Vector2D> anchorPoint ) {
//    this.shape = shape;
//    this.zPosition = zPosition;
//
//    // Monitor the anchor position and move the contained energy chunks to match.
//    anchorPoint.addObserver( new ChangeObserver<Vector2D>() {
//      public void update( Vector2D newPosition, Vector2D oldPosition ) {
//        Vector2D translation = newPosition.minus( oldPosition );
//        EnergyChunkContainerSlice.this.shape = AffineTransform.getTranslateInstance( translation.getX(), translation.getY() ).createTransformedShape( EnergyChunkContainerSlice.this.shape );
//        for ( EnergyChunk energyChunk : energyChunkList ) {
//          energyChunk.translate( translation );
//        }
//      }
//    } );
//  }
//
//  public void addEnergyChunk( EnergyChunk energyChunk ) {
//    energyChunk.zPosition.set( zPosition );
//    energyChunkList.add( energyChunk );
//  }
//
//  public int getNumEnergyChunks() {
//    return energyChunkList.size();
//  }
//
//  public void setShape( Shape shape ) {
//    this.shape = shape;
//  }
//
//  public Shape getShape() {
//    return shape;
//  }
//}
