// Copyright 2014-2015, University of Colorado Boulder

/**
 * View for the 'Energy Systems' screen of the Energy Forms And Changes simulation.
 *
 * @author  John Blanco
 * @author  Martin Veillette (Berea College)
 * @author  Jesse Greenberg
 * @author  Andrew Adare
 */
define( function( require ) {
  'use strict';

  // Modules
  var BeakerHeaterNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/BeakerHeaterNode' );
  var BeltNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/BeltNode' );
  var BikerNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/BikerNode' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var CheckBox = require( 'SUN/CheckBox' );
  var EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  var EnergyChunkLegend = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/EnergyChunkLegend' );
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var EnergySystemElementSelector = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/EnergySystemElementSelector' );
  var EnergyChunkNode = require( 'ENERGY_FORMS_AND_CHANGES/common/view/EnergyChunkNode' );
  var EnergyType = require( 'ENERGY_FORMS_AND_CHANGES/common/model/EnergyType' );
  var FaucetAndWaterNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/FaucetAndWaterNode' );
  var FluorescentBulbNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/FluorescentBulbNode' );
  var GeneratorNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/GeneratorNode' );
  var HSlider = require( 'SUN/HSlider' );
  var Image = require( 'SCENERY/nodes/Image' );
  var IncandescentBulbNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/IncandescentBulbNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SunNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/SunNode' );
  var SolarPanelNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/SolarPanelNode' );
  var TeaPotNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/TeaPotNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // Images
  var mockupImage = require( 'image!ENERGY_FORMS_AND_CHANGES/mockup_energy_systems.png' );

  // Strings
  var energySymbolsString = require( 'string!ENERGY_FORMS_AND_CHANGES/energySymbols' );

  // Constants
  var EDGE_INSET = 10;

  /**
   * @param {EnergySystemsModel} model
   * @constructor
   */
  function EnergySystemsScreenView( model ) {

    ScreenView.call( this, {
      // Boundaries taken from original Java sim
      layoutBounds: new Bounds2( 0, 0, 1008, 679 )
    } );

    // Bounds2 object for use as primary geometric reference
    var stage = this.layoutBounds;

    // Upper y-border of play/pause control panel.
    // The subtracted offset is from eyeballing a match to the mockup image.
    var playControlYborder = stage.maxY - 75;

    // Node for back-most layer
    var backLayer = new Node();
    this.addChild( backLayer );

    // ScreenView handle for use inside functions
    var thisScreenView = this;

    // Create the model-view transform.  The primary units used in the model are
    // meters, so significant zoom is used. The multipliers for the 2nd parameter
    // can be used to adjust where the point (0, 0) in the model, which is on the
    // middle of the screen above the counter as located in the view. Final arg
    // is zoom factor from original Java sim - smaller zooms out, larger zooms in.
    var mvtOriginX = Math.round( stage.width * 0.5 );
    var mvtOriginY = Math.round( stage.height * 0.475 );
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO, new Vector2( mvtOriginX, mvtOriginY ), 2200 );

    // Add beige background rectangle
    function addBackground() {
      backLayer.addChild( new Rectangle( stage, {
        fill: EFACConstants.SECOND_TAB_BACKGROUND_COLOR
      } ) );
    }

    // Create a background rectangle for the play/pause controls.
    function addPlayControls() {
      var bottomPanel = new Rectangle( 0, playControlYborder, stage.width, stage.height, 0, 0, {
        fill: EFACConstants.CLOCK_CONTROL_BACKGROUND_COLOR,
        stroke: 'black'
      } );
      backLayer.addChild( bottomPanel );
    }

    //Show the mock-up and a slider to change its transparency
    function addMockupImage() {
      var opacity = new Property( 0.0 );
      var image = new Image( mockupImage, {
        pickable: false
      } );
      image.scale( stage.width / image.width );
      opacity.linkAttribute( image, 'opacity' );
      thisScreenView.addChild( image );
      thisScreenView.addChild( new HSlider( opacity, {
        min: 0,
        max: 1
      }, {
        top: 100,
        left: stage.width - 150
      } ) );
    }

    // Create the legend for energy chunk types
    function addEnergyChunkLegend() {
      var legend = new EnergyChunkLegend();
      legend.center = new Vector2( 0.9 * stage.width, 0.5 * stage.height );
      thisScreenView.addChild( legend );
    }

    // Check box panel to display energy chunks
    function addCheckBoxPanel() {
      var label = new Text( energySymbolsString, {
        font: new PhetFont( 20 )
      } );

      var energyChunkNode = EnergyChunkNode.createEnergyChunkNode( EnergyType.THERMAL );
      energyChunkNode.scale( 1.0 );
      energyChunkNode.pickable = false;

      var checkBox = new CheckBox( new LayoutBox( {
        children: [ label, energyChunkNode ],
        orientation: 'horizontal',
        spacing: 5
      } ), model.energyChunksVisibleProperty );

      var panel = new Panel( checkBox, {
        fill: EFACConstants.CONTROL_PANEL_BACKGROUND_COLOR,
        stroke: EFACConstants.CONTROL_PANEL_OUTLINE_STROKE,
        lineWidth: EFACConstants.CONTROL_PANEL_OUTLINE_LINE_WIDTH
      } );
      panel.rightTop = new Vector2( stage.width - EDGE_INSET, EDGE_INSET );
      thisScreenView.addChild( panel );
    }

    // Create and add the Reset All Button in the bottom right, which resets the model
    function addResetButton() {
      var resetAllButton = new ResetAllButton( {
        listener: function() {
          model.reset();
        },
        right: stage.maxX - 10,
        bottom: stage.maxY - 10
      } );
      thisScreenView.addChild( resetAllButton );
    }

    function addSun() {
      var sun = new SunNode( model.sun, model.energyChunksVisibleProperty, modelViewTransform );
      thisScreenView.addChild( sun );
    }

    // Create the carousel control nodes.
    function createCarousels() {

      // Instantiate nodes for the three carousels
      var sourcesCarousel = new EnergySystemElementSelector( model.energySourcesCarousel );
      var convertersCarousel = new EnergySystemElementSelector( model.energyConvertersCarousel );
      var usersCarousel = new EnergySystemElementSelector( model.energyUsersCarousel );

      // Position carousels
      // Assume all carousels have the height of the sources Carousel
      var centerY = playControlYborder - sourcesCarousel.height / 2 - 5;
      var spacing = 50;
      sourcesCarousel.leftCenter = new Vector2( EDGE_INSET, centerY );
      convertersCarousel.leftCenter = new Vector2( sourcesCarousel.rightCenter.x + spacing, centerY );
      usersCarousel.leftCenter = new Vector2( convertersCarousel.rightCenter.x + spacing, centerY );

      return [ sourcesCarousel, convertersCarousel, usersCarousel ];

      // thisScreenView.addChild( sourcesCarousel );
      // thisScreenView.addChild( convertersCarousel );
      // thisScreenView.addChild( usersCarousel );
    }

    function addTeaPot() {
      var teaPotNode = new TeaPotNode( model.teaPot, model.energyChunksVisibleProperty, modelViewTransform );
      thisScreenView.addChild( teaPotNode );
    }

    function addFaucet() {
      var faucetNode = new FaucetAndWaterNode( model.faucet, model.energyChunksVisibleProperty, modelViewTransform );
      thisScreenView.addChild( faucetNode );
    }

    function addGenerator() {
      var generatorNode = new GeneratorNode( model.generator, modelViewTransform );
      thisScreenView.addChild( generatorNode );
    }

    function addSolarPanel() {
      var solarPanelNode = new SolarPanelNode( model.solarPanel, modelViewTransform );
      thisScreenView.addChild( solarPanelNode );
    }

    function addIncandescentBulb() {
      var incandescentBulbNode = new IncandescentBulbNode( model.incandescentBulb, model.energyChunksVisibleProperty, modelViewTransform );
      thisScreenView.addChild( incandescentBulbNode );
    }

    function addFluorescentBulb() {
      var fluorescentBulbNode = new FluorescentBulbNode( model.fluorescentBulb, model.energyChunksVisibleProperty, modelViewTransform );
      thisScreenView.addChild( fluorescentBulbNode );
    }

    function addbeakerHeater() {
      var beakerHeaterNode = new BeakerHeaterNode( model.beakerHeater, model.energyChunksVisibleProperty, modelViewTransform );
      thisScreenView.addChild( beakerHeaterNode );
    }

    var beltNode = new BeltNode( model.belt, modelViewTransform );
    thisScreenView.addChild( beltNode );

    function addBiker() {
      var bikerNode = new BikerNode( model.biker, model.energyChunksVisibleProperty, modelViewTransform );
      thisScreenView.addChild( bikerNode );
    }

    addBackground();
    addPlayControls();
    addMockupImage();
    addEnergyChunkLegend();
    addCheckBoxPanel();
    addResetButton();
    addSun();
    addTeaPot();
    addFaucet();
    addBiker();
    addbeakerHeater();
    addIncandescentBulb();
    addFluorescentBulb();
    addGenerator();
    addSolarPanel();

    var carousels = createCarousels();
    carousels.forEach( function( carousel ) {
      thisScreenView.addChild( carousel );
    } );
    // addCarousels();
  }

  energyFormsAndChanges.register( 'EnergySystemsScreenView', EnergySystemsScreenView );

  return inherit( ScreenView, EnergySystemsScreenView );
} );
