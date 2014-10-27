// Copyright 2002-2013, University of Colorado
/**
 * Scenery Node that is used to represent thermometers in the tool box and that
 * controls the initial movement of thermometers in and out of the tool
 * box.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Thermometer = require( 'ENERGY_FORMS_AND_CHANGES/common/model/Thermometer' );
  var ThermometerNode = require( 'ENERGY_FORMS_AND_CHANGES/intro/view/ThermometerNode' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   *
   * @param thermometerNode
   * @param mvt
   * @param canvas
   * @constructor
   */
  function ThermometerToolBoxNode( thermometerNode, mvt, canvas ) {
    ThermometerNode.call( this );
    var self = this;
    this.canvas = canvas;
    this.mvt = mvt;
    // getThermometer is defined in  sensing Thermometer Node
    var thermometer = thermometerNode.getThermometer();
    var positioningOffset = mvt.viewToModelDelta( thermometerNode.getOffsetCenterShaftToTriangleTip() );
    this.setSensedTemperature( EFACConstants.ROOM_TEMPERATURE );
    this.setSensedColor( 'white' );
    // This node's visibility is the inverse of the thermometer's.
    thermometer.activeProperty.link( function( active ) {
        self.visible = !active;
      }
    );
    this.addInputListener( new SimpleDragHandler( {


      parentScreen: null, // needed for coordinate transforms
      // Allow moving a finger (touch) across a node to pick it up.
      allowTouchSnag: true,

      // Handler that moves the shape in model space.
      translate: function( translationParams ) {
        thermometer.position = thermometer.position.plus( mvt.viewToModelDelta( translationParams.delta ) );
      },

      start: function( event, trail ) {
        thermometer.userControlled = true;
        thermometer.active = true;
        // thermometer.position=mvt.viewToModelPosition(event.pointer.point);
        // Find the parent screen by moving up the scene graph.
        var testNode = self;
        while ( testNode !== null ) {
          if ( testNode instanceof ScreenView ) {
            this.parentScreen = testNode;
            break;
          }
          testNode = testNode.parents[0]; // Move up the scene graph by one level
        }

        // Determine the initial position of the new element as a function of the event position and this node's bounds.
        //       var upperLeftCornerGlobal = self.parentToGlobalPoint( self.leftTop.plus(thermometerNode.getOffsetCenterShaftToTriangleTip()) );
        var compensatedLocation = self.parentToGlobalPoint( event.pointer.point );
//        var upperLeftCornerGlobal = self.parentToGlobalPoint( self.leftBottom );
//        var initialPositionOffset = upperLeftCornerGlobal.minus( event.pointer.point );
        //      var initialPosition = this.parentScreen.globalToLocalPoint( event.pointer.point.plus( initialPositionOffset ) );
//        var initialPosition = this.parentScreen.globalToLocalPoint( event.pointer.point.plus( initialPositionOffset ) );
//        thermometer.position= mvt.viewToModelPosition(initialPosition);
        thermometer.position = mvt.viewToModelPosition( compensatedLocation );
      },
      end: function( event, trail ) {
        thermometer.userControlled = false;
        if ( this.returnRect != null && thermometerNode.bounds.intersects( this.returnRect ) ) {
          // Released over tool box, so return it.
          thermometer.active = false;
        }
      }
    } ) );

  }

  return inherit( ThermometerNode, ThermometerToolBoxNode, {

    setReturnRect: function( returnRect ) {
      this.returnRect = returnRect;
    }
  } );
} );


//
//// Copyright 2002-2013, University of Colorado
//package edu.colorado.phet.energyformsandchanges.intro.view;
//
//import java.awt.*;
//import java.awt.geom.Point2D;
//import java.awt.geom.Rectangle2D;
//
//import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;
//import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;
//import edu.colorado.phet.common.phetcommon.view.graphics.transforms.ModelViewTransform;
//import edu.colorado.phet.common.piccolophet.PhetPCanvas;
//import edu.colorado.phet.energyformsandchanges.common.EFACConstants;
//import edu.colorado.phet.energyformsandchanges.common.model.Thermometer;
//import edu.umd.cs.piccolo.event.PBasicInputEventHandler;
//import edu.umd.cs.piccolo.event.PInputEvent;
//
///**
// * PNode that is used to represent thermometers in the tool box and that
// * controls the initial movement of thermometers in and out of the tool
// * box.
// *
// * @author John Blanco
// */
//public class ThermometerToolBoxNode extends ThermometerNode {
//
//  private final PhetPCanvas canvas;
//  private final ModelViewTransform mvt;
//  private Rectangle2D returnRect = null;
//
//  public ThermometerToolBoxNode( final MovableThermometerNode thermometerNode, ModelViewTransform mvt, PhetPCanvas canvas ) {
//    this.canvas = canvas;
//    this.mvt = mvt;
//    final Thermometer thermometer = thermometerNode.getThermometer();
//    final Vector2D positioningOffset = mvt.viewToModelDelta( thermometerNode.getOffsetCenterShaftToTriangleTip() );
//
//    setSensedTemperature( EFACConstants.ROOM_TEMPERATURE );
//    setSensedColor( Color.WHITE );
//
//    // This node's visibility is the inverse of the thermometer's.
//    thermometer.active.addObserver( new VoidFunction1<Boolean>() {
//      public void apply( Boolean active ) {
//        setVisible( !active );
//      }
//    } );
//
//    addInputEventListener( new PBasicInputEventHandler() {
//      @Override public void mousePressed( PInputEvent event ) {
//        thermometer.active.set( true );
//        thermometer.userControlled.set( true );
//        thermometer.position.set( new Vector2D( getModelPosition( event.getCanvasPosition() ) ).plus( positioningOffset ) );
//      }
//
//      @Override public void mouseDragged( PInputEvent event ) {
//        thermometer.position.set( new Vector2D( getModelPosition( event.getCanvasPosition() ) ).plus( positioningOffset ) );
//      }
//
//      @Override public void mouseReleased( PInputEvent event ) {
//        thermometer.userControlled.set( false );
//        if ( returnRect != null && thermometerNode.getFullBoundsReference().intersects( returnRect ) ){
//          // Released over tool box, so return it.
//          thermometer.active.set( false );
//        }
//      }
//    } );
//  }
//
//  /**
//   * Convert the canvas position to the corresponding location in the model.
//   */
//  private Point2D getModelPosition( Point2D canvasPos ) {
//    Point2D worldPos = new Point2D.Double( canvasPos.getX(), canvasPos.getY() );
//    canvas.getPhetRootNode().screenToWorld( worldPos );
//    Point2D adjustedWorldPos = new Point2D.Double( worldPos.getX(), worldPos.getY() );
//    return mvt.viewToModel( adjustedWorldPos );
//  }
//
//  public void setReturnRect( Rectangle2D returnRect ) {
//    this.returnRect = returnRect;
//  }
//}


