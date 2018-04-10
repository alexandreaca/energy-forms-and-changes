// Copyright 2014-2017, University of Colorado Boulder

/**
 * Scenery node that represents a chunk of energy in the view.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var EnergyType = require( 'ENERGY_FORMS_AND_CHANGES/common/model/EnergyType' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // images
  var chemicalEnergyImage = require( 'image!ENERGY_FORMS_AND_CHANGES/E_chem_blank_light.png' );
  var electricalEnergyImage = require( 'image!ENERGY_FORMS_AND_CHANGES/E_electric_blank.png' );
  var hiddenEnergyImage = require( 'image!ENERGY_FORMS_AND_CHANGES/E_dashed_blank.png' );
  var lightEnergyImage = require( 'image!ENERGY_FORMS_AND_CHANGES/E_light_blank.png' );
  var mechanicalEnergyImage = require( 'image!ENERGY_FORMS_AND_CHANGES/E_mech_blank.png' );
  var thermalEnergyImage = require( 'image!ENERGY_FORMS_AND_CHANGES/E_therm_blank_orange.png' );

  // strings
  var energyChunkLabelString = require( 'string!ENERGY_FORMS_AND_CHANGES/energyChunkLabel' );

  // constants
  var Z_DISTANCE_WHERE_FULLY_FADED = 0.1; // In meters
  var WIDTH = 24; // in screen coords, which are close to pixels

  // convenience map that links energy types to their representing images
  var mapEnergyTypeToImage = {};
  // TODO: As an optimization, try making these nodes, and the factory function below just wraps each in a new Node(),
  // taking advantage of Scenery's DAG support.
  mapEnergyTypeToImage[ EnergyType.THERMAL ] = thermalEnergyImage;
  mapEnergyTypeToImage[ EnergyType.ELECTRICAL ] = electricalEnergyImage;
  mapEnergyTypeToImage[ EnergyType.MECHANICAL ] = mechanicalEnergyImage;
  mapEnergyTypeToImage[ EnergyType.LIGHT ] = lightEnergyImage;
  mapEnergyTypeToImage[ EnergyType.CHEMICAL ] = chemicalEnergyImage;
  mapEnergyTypeToImage[ EnergyType.HIDDEN ] = hiddenEnergyImage;

  /**
   * Helper function that returns the correct image for an EnergyChunkNode.  This function is needed in both static and
   * local scopes and is declared here so that it can be used in both as necessary.
   * @param {EnergyType} energyType
   * @returns {Image}
   */
  function createEnergyChunkNode( energyType ) {
    var background = new Image( mapEnergyTypeToImage[ energyType ] );
    var energyText = new Text( energyChunkLabelString, { font: new PhetFont( 16 ) } );
    energyText.scale( Math.min( background.width / energyText.width, background.height / energyText.height ) * 0.95 );
    energyText.center = background.center;
    background.addChild( energyText );
    background.scale( WIDTH / background.width );
    background.center = ( new Vector2( -background.width / 2, -background.height / 2 ) );
    return background;
  }

  /**
   * @param {EnergyChunk} energyChunk - model of an energy chunk
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function EnergyChunkNode( energyChunk, modelViewTransform ) {

    Node.call( this );
    var self = this;

    // control the overall visibility of this node
    energyChunk.visibleProperty.link( function( visible ) {
      self.setVisible( visible );
    } );

    // set up updating of transparency based on Z position
    energyChunk.zPositionProperty.link( function( zPosition ) {
      self.updateTransparency( zPosition );
    } );

    // monitor the energy type and update the image if a change occurs
    energyChunk.energyTypeProperty.link( function( energyType ) {
      self.removeAllChildren();
      self.addChild( createEnergyChunkNode( energyType ) );
    } );

    // set this node's position when the corresponding model element moves
    energyChunk.positionProperty.link( function( position ) {
      assert && assert( !_.isNaN( position.x ), 'position.x = ' + position.x );
      assert && assert( !_.isNaN( position.y ), 'position.y = ' + position.y );
      self.translation = modelViewTransform.modelToViewPosition( position );
    } );
  }

  energyFormsAndChanges.register( 'EnergyChunkNode', EnergyChunkNode );

  return inherit( Node, EnergyChunkNode, {

    /**
     * update the transparency, which is a function of several factors
     * @private
     * @param {number} zPosition
     */
    updateTransparency: function( zPosition ) {
      var zFadeValue = 1;
      if ( zPosition < 0 ) {
        zFadeValue = Math.max( ( Z_DISTANCE_WHERE_FULLY_FADED + zPosition ) / Z_DISTANCE_WHERE_FULLY_FADED, 0 );
      }
      this.setOpacity( zFadeValue );
    }
  }, {

    // statics
    WIDTH: WIDTH,

    /**
     * A function that returns the correct image for the provided energy type. This is a static function so that an
     * image node can be generated without an EnergyChunkNode instance.  This is mostly useful for button icons that
     * should not have visibility properties linked to the model.
     * @static
     * @param {EnergyType} energyType
     * @returns {Image}
     * @public
     */
    createEnergyChunkNode: function( energyType ) {
      return createEnergyChunkNode( energyType );
    }
  } );
} );