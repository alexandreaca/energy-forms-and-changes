// Copyright 2016-2020, University of Colorado Boulder

/**
 * main view for the 'Systems' screen of the Energy Forms and Changes simulation
 *
 * @author John Blanco
 * @author Martin Veillette (Berea College)
 * @author Jesse Greenberg
 * @author Andrew Adare
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BeakerHeaterNode = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/BeakerHeaterNode' );
  const BeltNode = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/BeltNode' );
  const BikerNode = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/BikerNode' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const Checkbox = require( 'SUN/Checkbox' );
  const EFACA11yStrings = require( 'ENERGY_FORMS_AND_CHANGES/EFACA11yStrings' );
  const EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  const EnergyChunk = require( 'ENERGY_FORMS_AND_CHANGES/common/model/EnergyChunk' );
  const EnergyChunkLegend = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/EnergyChunkLegend' );
  const EnergyChunkNode = require( 'ENERGY_FORMS_AND_CHANGES/common/view/EnergyChunkNode' );
  const energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  const EnergySystemElementSelector = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/EnergySystemElementSelector' );
  const EnergyType = require( 'ENERGY_FORMS_AND_CHANGES/common/model/EnergyType' );
  const FanNode = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/FanNode' );
  const FaucetAndWaterNode = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/FaucetAndWaterNode' );
  const GeneratorNode = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/GeneratorNode' );
  const LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  const LightBulbNode = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/LightBulbNode' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const SolarPanelNode = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/SolarPanelNode' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const SunNode = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/SunNode' );
  const SkyNode = require( 'ENERGY_FORMS_AND_CHANGES/common/view/SkyNode' );
  const TeaKettleNode = require( 'ENERGY_FORMS_AND_CHANGES/systems/view/TeaKettleNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const TimeControlNode = require( 'SCENERY_PHET/TimeControlNode' );
  const Utils = require( 'DOT/Utils' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const energySymbolsString = require( 'string!ENERGY_FORMS_AND_CHANGES/energySymbols' );

  // constants
  const EDGE_INSET = 10; // screen edge padding, in screen coordinates
  const SELECTOR_SPACING = 82; // space between energy system selector panel, in screen coordinates
  const BOTTOM_CONTROL_PANEL_HEIGHT = 49; // manually coordinated to match similar panel on 1st screen

  class SystemsScreenView extends ScreenView {

    /**
     * @param {SystemsModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {
      super();

      // tandems to nest energy systems in Studio
      const energySourcesTandem = tandem.createTandem( 'energySources' );
      const energyConvertersTandem = tandem.createTandem( 'energyConverters' );
      const energyUsersTandem = tandem.createTandem( 'energyUsers' );

      // @private {SystemsModel}
      this.model = model;

      // a11y - the screen summary to be read by assistive technology
      this.addChild( new Node( {
        tagName: 'div',
        innerContent: EFACA11yStrings.systemsScreenInteractionHint.value,
        descriptionContent: EFACA11yStrings.systemsScreenSummaryDescription.value
      } ) );

      // a11y - a description of the current configuration of the energy system to be read by assistive technology
      const energySystemConfigDescription = new Node( {
        tagName: 'h3',
        innerContent: EFACA11yStrings.energySystem.value,
        descriptionContent: EFACA11yStrings.energySystemHelpText.value
      } );
      this.addChild( energySystemConfigDescription );

      // update the a11y description as the selected element changes
      Property.multilink(
        [
          model.energySourcesCarousel.targetElementNameProperty,
          model.energyConvertersCarousel.targetElementNameProperty,
          model.energyUsersCarousel.targetElementNameProperty
        ],
        () => {
          const energySource = model.energySourcesCarousel.getSelectedElement();
          const energyConverter = model.energyConvertersCarousel.getSelectedElement();
          const energyUser = model.energyUsersCarousel.getSelectedElement();
          assert && assert( energySource.a11yName, 'the selected element has no accessibility name specified' );
          energySystemConfigDescription.descriptionContent = StringUtils.fillIn(
            EFACA11yStrings.energySystemHelpText.value,
            {
              producer: energySource.a11yName,
              converter: energyConverter.a11yName,
              user: energyUser.a11yName
            }
          );
        }
      );

      // convenience variable
      const layoutBounds = this.layoutBounds;

      // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
      // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is on the
      // middle of the screen above the counter as located in the view. Final arg is zoom factor from original Java sim -
      // smaller zooms out, larger zooms in.
      const mvtOriginX = Utils.roundSymmetric( layoutBounds.width * 0.5 );
      const mvtOriginY = Utils.roundSymmetric( layoutBounds.height * 0.475 );
      const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
        Vector2.ZERO,
        new Vector2( mvtOriginX, mvtOriginY ),
        EFACConstants.SYSTEMS_MVT_SCALE_FACTOR
      );

      // create the energy user nodes

      // @private
      this.beakerHeaterNode = new BeakerHeaterNode(
        model.beakerHeater,
        model.energyChunksVisibleProperty,
        modelViewTransform,
        energyUsersTandem.createTandem( 'beakerHeaterNode' )
      );
      const incandescentBulbNode = new LightBulbNode(
        model.incandescentBulb,
        model.energyChunksVisibleProperty,
        modelViewTransform, {
          bulbType: 'incandescent',
          tandem: energyUsersTandem.createTandem( 'incandescentBulbNode' )
        }
      );
      const fluorescentBulbNode = new LightBulbNode(
        model.fluorescentBulb,
        model.energyChunksVisibleProperty,
        modelViewTransform, {
          bulbType: 'fluorescent',
          tandem: energyUsersTandem.createTandem( 'fluorescentBulbNode' )
        }
      );
      const fanNode = new FanNode(
        model.fan,
        model.energyChunksVisibleProperty,
        modelViewTransform,
        energyUsersTandem.createTandem( 'fanNode' )
      );
      this.addChild( this.beakerHeaterNode );
      this.addChild( incandescentBulbNode );
      this.addChild( fluorescentBulbNode );
      this.addChild( fanNode );

      // create the energy converter nodes
      const generatorNode = new GeneratorNode(
        model.generator,
        modelViewTransform, {
          addMechanicalEnergyChunkLayer: false,
          tandem: energyConvertersTandem.createTandem( 'generatorNode' )
        } );
      const beltNode = new BeltNode(
        model.belt,
        modelViewTransform, {
          tandem: energyConvertersTandem.createTandem( 'beltNode' ),
          phetioReadOnly: true
        }
      );
      const solarPanelNode = new SolarPanelNode(
        model.solarPanel,
        modelViewTransform,
        energyConvertersTandem.createTandem( 'solarPanelNode' )
      );
      this.addChild( generatorNode );
      this.addChild( beltNode );
      this.addChild( solarPanelNode );

      // @private
      this.faucetNode = new FaucetAndWaterNode(
        model.faucet,
        model.energyChunksVisibleProperty,
        modelViewTransform,
        energySourcesTandem.createTandem( 'faucetAndWaterNode' )
      );
      this.addChild( this.faucetNode );

      // get the mechanical energy chunk layer from the generator and add it after the faucet has been created. this is
      // desirable because the water from the faucet appears on top of the generator wheel, but the energy chunks that
      // are traveling on top of the falling water now remain in front of the water once the generator owns them.
      this.addChild( generatorNode.getMechanicalEnergyChunkLayer() );

      // create the rest of the energy source nodes
      const sunNode = new SunNode(
        model.sun,
        model.energyChunksVisibleProperty,
        modelViewTransform,
        energySourcesTandem.createTandem( 'sunNode' )
      );

      // @private
      this.teaKettleNode = new TeaKettleNode(
        model.teaKettle,
        model.energyChunksVisibleProperty,
        modelViewTransform,
        energySourcesTandem.createTandem( 'teaKettleNode' )
      );
      const bikerNode = new BikerNode(
        model.biker,
        model.energyChunksVisibleProperty,
        modelViewTransform,
        energySourcesTandem.createTandem( 'bikerNode' )
      );
      this.addChild( sunNode );
      this.addChild( bikerNode );
      this.addChild( this.teaKettleNode );

      // use this Tandem for the checkbox, too, so it appears as a child of the panel
      const controlPanelTandem = tandem.createTandem( 'controlPanel' );

      // create the checkbox that controls the visibility of the energy chunks
      // The EnergyChunk that is created in here is not going to be used in the simulation, it is only needed in the
      // EnergyChunkNode that is displayed in the show/hide energy chunks toggle.
      const showEnergyChunksCheckbox = new Checkbox(
        new LayoutBox( {
          children: [
            new Text( energySymbolsString, {
              font: new PhetFont( 20 ),
              maxWidth: EFACConstants.ENERGY_SYMBOLS_PANEL_TEXT_MAX_WIDTH
            } ),
            new EnergyChunkNode(
              new EnergyChunk( EnergyType.THERMAL, Vector2.ZERO, Vector2.ZERO, new BooleanProperty( true ) ),
              modelViewTransform
            )
          ],
          orientation: 'horizontal',
          spacing: 5
        } ),
        model.energyChunksVisibleProperty, {
          tandem: controlPanelTandem.createTandem( 'showEnergySymbolsCheckbox' ),
          phetioDocumentation: 'checkbox that shows the energy symbols'
        }
      );
      showEnergyChunksCheckbox.touchArea =
        showEnergyChunksCheckbox.localBounds.dilatedY( EFACConstants.ENERGY_SYMBOLS_PANEL_CHECKBOX_Y_DILATION );

      // add the checkbox that controls the visibility of the energy chunks to a panel
      const controlPanel = new Panel( showEnergyChunksCheckbox, {
        fill: EFACConstants.CONTROL_PANEL_BACKGROUND_COLOR,
        stroke: EFACConstants.CONTROL_PANEL_OUTLINE_STROKE,
        lineWidth: EFACConstants.CONTROL_PANEL_OUTLINE_LINE_WIDTH,
        cornerRadius: EFACConstants.ENERGY_SYMBOLS_PANEL_CORNER_RADIUS,
        right: layoutBounds.maxX - EDGE_INSET,
        top: EDGE_INSET,
        minWidth: EFACConstants.ENERGY_SYMBOLS_PANEL_MIN_WIDTH,
        tandem: controlPanelTandem,
        phetioDocumentation: 'panel in the upper right corner of the screen'
      } );
      this.addChild( controlPanel );

      // add the energy chunk legend
      const energyChunkLegend = new EnergyChunkLegend( modelViewTransform,
        {
          right: layoutBounds.maxX - EDGE_INSET,
          top: controlPanel.bottom + 10
        } );
      this.addChild( energyChunkLegend );

      // only show the energy chunk legend when energy chunks are visible
      model.energyChunksVisibleProperty.linkAttribute( energyChunkLegend, 'visible' );

      // create a background rectangle at the bottom of the screen where the play/pause controls will reside
      const bottomPanel = new Rectangle(
        0,
        0,
        layoutBounds.width * 2, // wide enough that users are unlikely to see the edge
        layoutBounds.height, // tall enough that users are unlikely to see the bottom
        {
          centerX: layoutBounds.centerX,
          top: layoutBounds.maxY - BOTTOM_CONTROL_PANEL_HEIGHT,
          fill: EFACConstants.CLOCK_CONTROL_BACKGROUND_COLOR
        }
      );
      this.addChild( bottomPanel );

      // add the reset all button
      const resetAllButton = new ResetAllButton( {
        listener: () => {
          model.reset();
        },
        radius: EFACConstants.RESET_ALL_BUTTON_RADIUS,
        right: layoutBounds.maxX - EDGE_INSET,
        centerY: ( bottomPanel.top + layoutBounds.maxY ) / 2,
        tandem: tandem.createTandem( 'resetAllButton' )
      } );
      this.addChild( resetAllButton );

      // add the play/pause and step buttons
      const timeControlNode = new TimeControlNode( model.isPlayingProperty, {
        stepForwardOptions: {
          listener: () => model.manualStep()
        },
        tandem: tandem.createTandem( 'timeControlNode' )
      } );
      this.addChild( timeControlNode );
      timeControlNode.center = new Vector2( layoutBounds.centerX, resetAllButton.centerY );

      // add the energy system element selectors, which are sets of radio buttons
      const energySourceSelector = new EnergySystemElementSelector( model.energySourcesCarousel, {
        left: EDGE_INSET,
        bottom: bottomPanel.top - EDGE_INSET,
        tandem: tandem.createTandem( 'energySourceSelectorPanel' )
      } );
      const energyConverterSelector = new EnergySystemElementSelector( model.energyConvertersCarousel, {
        left: energySourceSelector.right + SELECTOR_SPACING,
        bottom: bottomPanel.top - EDGE_INSET,
        tandem: tandem.createTandem( 'energyConverterSelectorPanel' )
      } );
      const energyUserSelector = new EnergySystemElementSelector( model.energyUsersCarousel, {
        left: energyConverterSelector.right + SELECTOR_SPACING,
        bottom: bottomPanel.top - EDGE_INSET,
        tandem: tandem.createTandem( 'energyUserSelectorPanel' )
      } );
      this.addChild( energySourceSelector );
      this.addChild( energyConverterSelector );
      this.addChild( energyUserSelector );

      // add a floating sky high above the sim
      const skyNode = new SkyNode(
        this.layoutBounds,
        modelViewTransform.modelToViewY( EFACConstants.SYSTEMS_SCREEN_ENERGY_CHUNK_MAX_TRAVEL_HEIGHT ) + EFACConstants.ENERGY_CHUNK_WIDTH
      );
      this.addChild( skyNode );

      // listen to the manualStepEmitter in the model
      model.manualStepEmitter.addListener( dt => {
        this.manualStep( dt );
      } );
    }

    /**
     * step this view element, called by the framework
     * @param dt - time step, in seconds
     * @public
     */
    step( dt ) {
      if ( this.model.isPlayingProperty.get() ) {
        this.stepView( dt );
      }
    }

    /**
     * step forward by one fixed nominal frame time
     * @param dt - time step, in seconds
     * @public
     */
    manualStep( dt ) {
      this.stepView( dt );
    }

    /**
     * update the state of the non-model associated view elements for a given time amount
     * @param dt - time step, in seconds
     * @public
     */
    stepView( dt ) {
      this.teaKettleNode.step( dt );
      this.beakerHeaterNode.step( dt );
      this.faucetNode.step( dt );
    }

    /**
     * Custom layout function for this view so that it floats to the bottom of the window.
     *
     * @param {number} width
     * @param {number} height
     * @override
     * @public
     */
    layout( width, height ) {
      this.resetTransform();

      const scale = this.getLayoutScale( width, height );
      this.setScaleMagnitude( scale );

      let dx = 0;
      let offsetY = 0;

      // Move to bottom vertically (custom for this sim)
      if ( scale === width / this.layoutBounds.width ) {
        offsetY = ( height / scale - this.layoutBounds.height );
      }

      // center horizontally (default behavior for ScreenView)
      else if ( scale === height / this.layoutBounds.height ) {
        dx = ( width - this.layoutBounds.width * scale ) / 2 / scale;
      }
      this.translate( dx, offsetY );

      // update the visible bounds of the screen view
      this.visibleBoundsProperty.set( new Bounds2( -dx, -offsetY, width / scale - dx, height / scale - offsetY ) );
    }
  }

  return energyFormsAndChanges.register( 'SystemsScreenView', SystemsScreenView );
} );

