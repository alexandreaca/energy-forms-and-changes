// Copyright 2014-2018, University of Colorado Boulder

/**
 * Node that represents a block in the view.  The blocks in the model are 2D, and this node gives them some perspective
 * in order to make them appear to be 3D.
 *
 * @author John Blanco
 * @author Martin Veillette
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  var EnergyChunkContainerSliceNode = require( 'ENERGY_FORMS_AND_CHANGES/intro/view/EnergyChunkContainerSliceNode' );
  var EnergyChunkNode = require( 'ENERGY_FORMS_AND_CHANGES/common/view/EnergyChunkNode' );
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ThermalElementDragHandler = require( 'ENERGY_FORMS_AND_CHANGES/intro/view/ThermalElementDragHandler' );
  var Transform3 = require( 'DOT/Transform3' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var LABEL_FONT = new PhetFont( 32 );
  var OUTLINE_LINE_WIDTH = 3;
  var OUTLINE_STROKE = Color.DARK_GRAY;
  var SHOW_2D_REPRESENTATION = true; // TODO: Turn this into a query parameter.

  /**
   * @param {Block} block
   * @param {ModelViewTransform2} modelViewTransform
   * @param {function} constrainPosition
   * @param {Object} [options]
   * @constructor
   */
  function BlockNode( block, modelViewTransform, constrainPosition, options ) {

    var self = this;
    Node.call( this, { cursor: 'pointer' } );

    options = _.extend( {

      // Allow a node to be specified that will act as the parent for approaching energy chunks - this makes it so that
      // the energy chunks that are outside the block don't affect the bounds of the block.
      approachingEnergyChunksLayer: null
    }, options );

    // extract the scale transform from the MVT so that we can separate the shape from the position of the block
    var scaleVector = modelViewTransform.matrix.getScaleVector();
    var scaleTransform = new Transform3( Matrix3.scaling( scaleVector.x, scaleVector.y ) );

    // TODO: I (jbphet) noticed the code below during an initial pass through this file.  This looks like there is
    // something wrong with the transforms, and I should straighten it out.

    // Note that blockRect is in view coordinates.
    // The shift by the block height is not in the original Java, but without it, the blocks sit too low.
    var blockShape = block.getRawShape();
    var blockRect = scaleTransform.transformShape( blockShape.shiftedY( -blockShape.height ) );

    // create the shape for the front of the block
    var perspectiveEdgeSize = modelViewTransform.modelToViewDeltaX(
      block.getBounds().width * EFACConstants.BLOCK_PERSPECTIVE_EDGE_PROPORTION
    );
    var blockFaceOffset = new Vector2( -perspectiveEdgeSize / 2, 0 ).rotated( -EFACConstants.BLOCK_PERSPECTIVE_ANGLE );
    var backCornersOffset = new Vector2( perspectiveEdgeSize, 0 ).rotated( -EFACConstants.BLOCK_PERSPECTIVE_ANGLE );
    var lowerLeftFrontCorner = new Vector2( blockRect.minX, blockRect.getMaxY() ).plus( blockFaceOffset );
    var lowerRightFrontCorner = new Vector2( blockRect.maxX, blockRect.getMaxY() ).plus( blockFaceOffset );
    var upperRightFrontCorner = new Vector2( blockRect.maxX, blockRect.getMinY() ).plus( blockFaceOffset );
    var upperLeftFrontCorner = new Vector2( blockRect.minX, blockRect.getMinY() ).plus( blockFaceOffset );
    var blockFaceShape = Shape.rectangle(
      lowerLeftFrontCorner.x,
      upperLeftFrontCorner.y,
      blockRect.width,
      blockRect.height
    );

    // create the shape of the top of the block
    var upperLeftBackCorner = upperLeftFrontCorner.plus( backCornersOffset );
    var upperRightBackCorner = upperRightFrontCorner.plus( backCornersOffset );
    var blockTopShape = new Shape();
    blockTopShape.moveToPoint( upperLeftFrontCorner )
      .lineToPoint( upperRightFrontCorner )
      .lineToPoint( upperRightBackCorner )
      .lineToPoint( upperLeftBackCorner )
      .lineToPoint( upperLeftFrontCorner );

    // create the shape of the side of the block
    var lowerRightBackCorner = lowerRightFrontCorner.plus( backCornersOffset );
    var blockSideShape = new Shape();
    blockSideShape.moveToPoint( upperRightFrontCorner )
      .lineToPoint( lowerRightFrontCorner )
      .lineToPoint( lowerRightBackCorner )
      .lineToPoint( upperRightBackCorner )
      .lineToPoint( upperRightFrontCorner );

    // create the shape for the back of the block
    var lowerLeftBackCorner = lowerLeftFrontCorner.plus( backCornersOffset );
    var blockBackShape = new Shape();
    blockBackShape.moveToPoint( lowerLeftBackCorner )
      .lineToPoint( lowerRightBackCorner )
      .moveToPoint( lowerLeftBackCorner )
      .lineToPoint( lowerLeftFrontCorner )
      .moveToPoint( lowerLeftBackCorner )
      .lineToPoint( upperLeftBackCorner );

    // add the back of the block
    var blockBack = new Path( blockBackShape, {
      lineWidth: OUTLINE_LINE_WIDTH,
      stroke: OUTLINE_STROKE
    } );
    this.addChild( blockBack );

    // create the layers where the energy chunks will be placed
    this.energyChunkRootNode = new Node();
    this.addChild( this.energyChunkRootNode );
    for ( var i = block.slices.length - 1; i >= 0; i-- ) {
      this.energyChunkRootNode.addChild( new EnergyChunkContainerSliceNode( block.slices[ i ], modelViewTransform ) );
    }

    // add the face, top, and sides of the block
    var blockFace = createSurface( blockFaceShape, block.getColor(), block.getFrontTextureImage() );
    var blockTop = createSurface( blockTopShape, block.getColor(), block.getTopTextureImage() );
    var blockSide = createSurface( blockSideShape, block.getColor(), block.getSideTextureImage() );
    this.addChild( blockFace );
    this.addChild( blockTop );
    this.addChild( blockSide );

    if ( SHOW_2D_REPRESENTATION ) {
      this.addChild( new Rectangle( modelViewTransform.modelToViewBounds( block.getRawShape(), {
        fill: 'red',
        lineWidth: 1
      } ) ) );
    }

    // position and add the label
    var label = new Text( block.getLabel(), {
      font: LABEL_FONT,
      maxWidth: modelViewTransform.modelToViewDeltaX( EFACConstants.BLOCK_SURFACE_WIDTH * 0.9 ),
      centerX: ( upperLeftFrontCorner.x + upperRightFrontCorner.x ) / 2,
      centerY: ( upperLeftFrontCorner.y + lowerLeftFrontCorner.y ) / 2
    } );
    this.addChild( label );

    // watch for coming and going of energy chunks that are approaching this model element and add/remove them as needed
    block.approachingEnergyChunks.addItemAddedListener( function( addedEnergyChunk ) {
      var energyChunkNode = new EnergyChunkNode( addedEnergyChunk, modelViewTransform );

      // if a node was specified for the approaching energy chunks, use it, otherwise make them a child of this node
      var parentNode = options.approachingEnergyChunkParentNode || self.energyChunkRootNode;

      parentNode.addChild( energyChunkNode );

      block.approachingEnergyChunks.addItemRemovedListener( function removalListener( removedEnergyChunk ) {
        if ( removedEnergyChunk === addedEnergyChunk ) {
          parentNode.removeChild( energyChunkNode );
          block.approachingEnergyChunks.removeItemRemovedListener( removalListener );
        }
      } );
    } );

    // make the block be transparent when the energy chunks are visible so that it looks like they are inside the block
    block.energyChunksVisibleProperty.link( function( energyChunksVisible ) {
      var opaqueness = energyChunksVisible ? 0.5 : 1.0;
      blockFace.opacity = opaqueness;
      blockTop.opacity = opaqueness;
      blockSide.opacity = opaqueness;
      label.opacity = opaqueness;
    } );

    // update the offset when the model position changes
    block.positionProperty.link( function( newPosition ) {

      self.translation = modelViewTransform.modelToViewPosition( newPosition );

      // compensate the energy chunk layer so that the energy chunk nodes can handle their own positioning
      self.energyChunkRootNode.translation =
        modelViewTransform.modelToViewPosition( newPosition ).rotated( Math.PI );
    } );

    // add the drag handler
    this.addInputListener( new ThermalElementDragHandler(
      block,
      this,
      modelViewTransform,
      constrainPosition
    ) );
  }

  /**
   * convenience method to avoid code duplication - adds a node of the given shape, color, and texture (if specified)
   * @param {Shape} shape
   * @param {Color} fillColor
   * @param {Image} textureImage
   * @returns {Node}
   * @private
   */
  function createSurface( shape, fillColor, textureImage ) {

    var root = new Node( {
      clipArea: shape
    } );

    // Add the filled shape.  Note that in cases where a texture is provided, this may end up getting partially or
    // entirely covered up.
    root.addChild( new Path( shape, {
      fill: fillColor
    } ) );

    if ( textureImage !== null ) {

      // add the texture image
      var texture = new Image( textureImage );

      // scale up the texture image if needed
      var textureScale = 1;
      if ( texture.bounds.width < shape.bounds.width ) {
        textureScale = shape.bounds.width / texture.bounds.width;
      }
      if ( texture.bounds.height < shape.bounds.height ) {
        textureScale = Math.max( shape.bounds.height / texture.bounds.height, textureScale );
      }
      texture.scale( textureScale );

      // add the texture to the clip node in order to clip it
      texture.leftTop = new Vector2( shape.bounds.minX, shape.bounds.minY );
      root.addChild( texture );
    }

    // add the outlined shape so that edges are visible
    root.addChild( new Path( shape, {
      lineWidth: OUTLINE_LINE_WIDTH,
      stroke: OUTLINE_STROKE
    } ) );

    return root;
  }

  energyFormsAndChanges.register( 'BlockNode', BlockNode );

  return inherit( Node, BlockNode );
} );

