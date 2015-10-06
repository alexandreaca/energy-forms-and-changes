// Copyright 2002-2015, University of Colorado Boulder

/**
 * Created for the Heat Capacity Lab (HCL) prototype, clean up and document if kept.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  //modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var EDGE_LENGTH = 15; // In screen coordinates, which are roughly pixels.
  var FORESHORTENING_PROPORTION = 0.35;

  /**
   *
   * @param {Property.<Color>} colorProperty
   * @constructor
   */
  function BlockIconNode( colorProperty ) {

    Node.call( this );

    var over = new Vector2( EDGE_LENGTH, 0 );
    var down = new Vector2( 0, EDGE_LENGTH );
    var back = new Vector2( EDGE_LENGTH * FORESHORTENING_PROPORTION, -EDGE_LENGTH * FORESHORTENING_PROPORTION );
    var upperLeftCorner = new Vector2( 0, 0 );

    var shape = new Shape();
    shape.moveToPoint( upperLeftCorner )
      .lineToPoint( upperLeftCorner.plus( over ) )
      .lineToPoint( upperLeftCorner.plus( over ).plus( down ) )
      .lineToPoint( upperLeftCorner.plus( down ) )
      .lineToPoint( upperLeftCorner )
      .lineToPoint( upperLeftCorner.plus( back ) )
      .lineToPoint( upperLeftCorner.plus( back ).plus( over ) )
      .lineToPoint( upperLeftCorner.plus( over ) )
      .moveToPoint( upperLeftCorner.plus( over ).plus( back ) )
      .lineToPoint( upperLeftCorner.plus( over ).plus( down ).plus( back ) )
      .lineToPoint( upperLeftCorner.plus( over ).plus( down ) )
      .lineToPoint( upperLeftCorner.plus( over ) );

    var block = new Path( shape, {
      stroke: 'black',
      lineWidth: 1,
      lineJoin: 'round'
    } );

    this.addChild( block );

    colorProperty.link( function( color ) {
      block.fill( color );
    } );
  }

  return inherit( Node, BlockIconNode );
} );

//
//// Copyright 2002-2015, University of Colorado Boulder

//package edu.colorado.phet.energyformsandchanges.intro.view;
//
//import java.awt.BasicStroke;
//import java.awt.Color;
//
//import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;
//import edu.colorado.phet.common.phetcommon.model.property.Property;
//import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;
//import edu.colorado.phet.common.phetcommon.view.util.DoubleGeneralPath;
//import edu.colorado.phet.common.piccolophet.nodes.PhetPPath;
//import edu.colorado.phet.common.piccolophet.nodes.kit.ZeroOffsetNode;
//import edu.umd.cs.piccolo.PNode;
//
///**
// * Created for the Heat Capacity Lab (HCL) prototype, clean up and document if kept.
// *
// * @author John Blanco
// */
//public class BlockIconNode extends PNode {
//  private static final double EDGE_LENGTH = 15; // In screen coordinates, which are roughly pixels.
//  private static final double FORESHORTENING_PROPORTION = 0.35;
//
//  public BlockIconNode( Property<Color> colorProperty ) {
//    Vector2D over = new Vector2D( EDGE_LENGTH, 0 );
//    Vector2D down = new Vector2D( 0, EDGE_LENGTH );
//    Vector2D back = new Vector2D( EDGE_LENGTH * FORESHORTENING_PROPORTION, -EDGE_LENGTH * FORESHORTENING_PROPORTION );
//    Vector2D upperLeftCorner = new Vector2D( 0, 0 );
//    DoubleGeneralPath path = new DoubleGeneralPath();
//    path.moveTo( upperLeftCorner );
//    path.lineTo( upperLeftCorner.plus( over ) );
//    path.lineTo( upperLeftCorner.plus( over ).plus( down ) );
//    path.lineTo( upperLeftCorner.plus( down ) );
//    path.lineTo( upperLeftCorner );
//    path.lineTo( upperLeftCorner.plus( back ) );
//    path.lineTo( upperLeftCorner.plus( back ).plus( over ) );
//    path.lineTo( upperLeftCorner.plus( over ) );
//    path.moveTo( upperLeftCorner.plus( over ).plus( back ) );
//    path.lineTo( upperLeftCorner.plus( over ).plus( down ).plus( back ) );
//    path.lineTo( upperLeftCorner.plus( over ).plus( down ) );
//    path.lineTo( upperLeftCorner.plus( over ) );
//    final PhetPPath block = new PhetPPath( path.getGeneralPath(), new BasicStroke( 1, BasicStroke.CAP_BUTT, BasicStroke.JOIN_ROUND ), Color.BLACK );
//    addChild( new ZeroOffsetNode( block ) );
//    colorProperty.addObserver( new VoidFunction1<Color>() {
//      public void apply( Color color ) {
//        block.setPaint( color );
//      }
//    } );
//  }
//}

