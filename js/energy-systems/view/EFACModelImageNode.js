// Copyright 2016, University of Colorado Boulder

/**
 * Class that represents an image-based model element, or a piece thereof, in
 * the view.
 *
 * @author John Blanco
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // Modules
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {EFACModelImage} modelImage
   * @param {ModelViewTransform} modelViewTransform
   * @constructor
   */
  function EFACModelImageNode( modelImage, modelViewTransform ) {

    Node.call( this );

    var img = new Image( modelImage.image );
    var offset = modelViewTransform.modelToViewDelta( modelImage.centerToCenterOffset );

    if ( modelImage.scale !== 1 ) {
      img.setScaleMagnitude( modelImage.scale );
    }

    img.setCenterX( offset.x );
    img.setCenterY( offset.y );
    this.addChild( img );
  }

  energyFormsAndChanges.register( 'EFACModelImageNode', EFACModelImageNode );

  return inherit( Node, EFACModelImageNode );
} );
