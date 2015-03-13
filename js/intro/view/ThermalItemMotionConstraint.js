// Copyright 2002-2015, University of Colorado

/**
 * This class defines the motion constraints for the model elements that can
 * be moved on and off the burners.  These elements are prevented from
 * overlapping one another.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   *
   * @param {EnergyFormsAndChangesIntroModel} model
   * @param {RectangularThermalMovableModelElement} modelElement
   * @param {Node} node
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Vector2} offsetPosToNodeCenter
   * @constructor
   */
  function ThermalItemMotionConstraint( model, modelElement, node, modelViewTransform, offsetPosToNodeCenter ) {
    this.model = model;
    this.modelElement = modelElement;
    var nodeSize = new Dimension2( node.width, node.height );
    // the nature of the provided node.
    var boundsMinX = modelViewTransform.viewToModelX( nodeSize.width / 2 - offsetPosToNodeCenter.x );
    //TODO fix with appropriate bounds
//    var boundsMaxX = modelViewTransform.viewToModelX( EFACIntroCanvas.STAGE_SIZE.getWidth() - nodeSize.getWidth() / 2 - offsetPosToNodeCenter.x );
//    var boundsMinY = modelViewTransform.viewToModelY( EFACIntroCanvas.STAGE_SIZE.getHeight() - offsetPosToNodeCenter.y - nodeSize.getHeight() / 2 );
    var boundsMaxX = modelViewTransform.viewToModelX( 1000 - nodeSize.width / 2 - offsetPosToNodeCenter.x );
    var boundsMinY = modelViewTransform.viewToModelY( 800 - offsetPosToNodeCenter.y - nodeSize.height / 2 );
    var boundsMaxY = modelViewTransform.viewToModelY( -offsetPosToNodeCenter.y + nodeSize.height / 2 );
    this.modelBounds = new Rectangle( boundsMinX, boundsMinY, boundsMaxX - boundsMinX, boundsMaxY - boundsMinY );
  }

  return inherit( Object, ThermalItemMotionConstraint, {
    apply: function( proposedModelPosition ) {
      // Make sure the proposed position is on the stage.
      var constrainedXPos = Util.clamp( proposedModelPosition.x, this.modelBounds.minX, this.modelBounds.maxX );
      var constrainedYPos = Util.clamp( proposedModelPosition.y, this.modelBounds.minY, this.modelBounds.maxY );
      var boundedToStagePos = new Vector2( constrainedXPos, constrainedYPos );
      // Return a position that is also validated by the model.
      return this.model.validatePosition( this.modelElement, boundedToStagePos );
    }
  } );
} );


//
//// Copyright 2002-2015, University of Colorado

//package edu.colorado.phet.energyformsandchanges.intro.view;
//
//import java.awt.geom.Dimension2D;
//import java.awt.geom.Point2D;
//import java.awt.geom.Rectangle2D;
//
//import edu.colorado.phet.common.phetcommon.math.MathUtil;
//import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;
//import edu.colorado.phet.common.phetcommon.util.function.Function1;
//import edu.colorado.phet.common.phetcommon.view.graphics.transforms.ModelViewTransform;
//import edu.colorado.phet.energyformsandchanges.intro.model.EFACIntroModel;
//import edu.colorado.phet.energyformsandchanges.intro.model.RectangularThermalMovableModelElement;
//import edu.umd.cs.piccolo.PNode;
//import edu.umd.cs.piccolo.util.PDimension;
//
///**
// * This class defines the motion constraints for the model elements that can
// * be moved on and off the burners.  These elements are prevented from
// * overlapping one another.
// *
// * @author John Blanco
// */
//public class ThermalItemMotionConstraint implements Function1<Point2D, Point2D> {
//
//  private final Rectangle2D modelBounds;
//private final EFACIntroModel model;
//private final RectangularThermalMovableModelElement modelElement;
//
//public ThermalItemMotionConstraint( EFACIntroModel model, RectangularThermalMovableModelElement modelElement, PNode node,
//  ModelViewTransform modelViewTransform, Vector2D offsetPosToNodeCenter ) {
//
//  this.model = model;
//  this.modelElement = modelElement;
//
//  Dimension2D nodeSize = new PDimension( node.getFullBoundsReference().width, node.getFullBoundsReference().height );
//
//  // Calculate the bounds based on the stage size of the canvas and
//  // the nature of the provided node.
//  double boundsMinX = modelViewTransform.viewToModelX( nodeSize.getWidth() / 2 - offsetPosToNodeCenter.getX() );
//  double boundsMaxX = modelViewTransform.viewToModelX( EFACIntroCanvas.STAGE_SIZE.getWidth() - nodeSize.getWidth() / 2 - offsetPosToNodeCenter.getX() );
//  double boundsMinY = modelViewTransform.viewToModelY( EFACIntroCanvas.STAGE_SIZE.getHeight() - offsetPosToNodeCenter.getY() - nodeSize.getHeight() / 2 );
//  double boundsMaxY = modelViewTransform.viewToModelY( -offsetPosToNodeCenter.getY() + nodeSize.getHeight() / 2 );
//  modelBounds = new Rectangle2D.Double( boundsMinX, boundsMinY, boundsMaxX - boundsMinX, boundsMaxY - boundsMinY );
//}
//
//public Point2D apply( Point2D proposedModelPos ) {
//  // Make sure the proposed position is on the stage.
//  double constrainedXPos = MathUtil.clamp( modelBounds.getMinX(), proposedModelPos.getX(), modelBounds.getMaxX() );
//  double constrainedYPos = MathUtil.clamp( modelBounds.getMinY(), proposedModelPos.getY(), modelBounds.getMaxY() );
//  Point2D boundedToStagePos = new Point2D.Double( constrainedXPos, constrainedYPos );
//
//  // Return a position that is also validated by the model.
//  return model.validatePosition( modelElement, boundedToStagePos );
//}
//}

