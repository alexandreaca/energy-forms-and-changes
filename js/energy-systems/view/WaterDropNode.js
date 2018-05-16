// Copyright 2016, University of Colorado Boulder

/**
 * a Scenery Node that represents a drop of water in the view, can be used to create the look of a stream of water
 *
 * @author John Blanco
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // modules
  var EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function WaterDropNode( waterDrop, modelViewTransform ) {

    Node.call( this );
    var self = this;

    // create and maintain the initial shape
    var dropShape = new Shape();
    waterDrop.sizeProperty.link( function( dropSize ) {
      var dropWidth = modelViewTransform.modelToViewDeltaX( dropSize.width );
      var dropHeight = -modelViewTransform.modelToViewDeltaY( dropSize.height );
      dropShape = Shape.ellipse( 0, 0, dropWidth, dropHeight );
    } );

    var waterDropNode = new Path( dropShape, {
      fill: EFACConstants.WATER_COLOR_OPAQUE,
      stroke: EFACConstants.WATER_COLOR_OPAQUE
    } );

    this.addChild( waterDropNode );

    // update offset as it changes
    waterDrop.offsetFromParentProperty.link( function( offset ) {
      var x = modelViewTransform.modelToViewDeltaX( offset.x );
      var y = modelViewTransform.modelToViewDeltaY( offset.y );
      self.translate( x, y );
    } );
  }

  energyFormsAndChanges.register( 'WaterDropNode', WaterDropNode );

  return inherit( Node, WaterDropNode );
} );
