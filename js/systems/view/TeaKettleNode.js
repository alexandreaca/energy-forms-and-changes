// Copyright 2016-2020, University of Colorado Boulder

/**
 * a Scenery Node that depicts a tea kettle on a burner
 *
 * @author John Blanco
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import HeaterCoolerBack from '../../../../scenery-phet/js/HeaterCoolerBack.js';
import HeaterCoolerFront from '../../../../scenery-phet/js/HeaterCoolerFront.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import teaKettleImage from '../../../images/tea_kettle_png.js';
import EFACConstants from '../../common/EFACConstants.js';
import BurnerStandNode from '../../common/view/BurnerStandNode.js';
import EnergyChunkLayer from '../../common/view/EnergyChunkLayer.js';
import energyFormsAndChanges from '../../energyFormsAndChanges.js';
import MoveFadeModelElementNode from './MoveFadeModelElementNode.js';
import TeaKettleSteamCanvasNode from './TeaKettleSteamCanvasNode.js';

// constants
const BURNER_MODEL_BOUNDS = new Bounds2( -0.037, -0.0075, 0.037, 0.0525 ); // in meters
const BURNER_EDGE_TO_HEIGHT_RATIO = 0.2; // multiplier empirically determined for best look
const HEATER_COOLER_NODE_SCALE = 0.85; // empirically determined for best look

class TeaKettleNode extends MoveFadeModelElementNode {

  /**
   * @param {TeaKettle} teaKettle
   * @param {Property.<boolean>} energyChunksVisibleProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   */
  constructor( teaKettle, energyChunksVisibleProperty, modelViewTransform, tandem ) {
    super( teaKettle, modelViewTransform, tandem );

    const teaKettleNode = new Image( teaKettleImage, { right: 114, bottom: 53 } );

    // create a mapping between the slider position and the steam proportion, which prevents very small values
    this.heaterSettingProperty = new NumberProperty( 0, {
      range: new Range( 0, 1 ),
      tandem: tandem.createTandem( 'heaterSettingProperty' )
    } );
    this.heaterSettingProperty.link( setting => {
      const mappedSetting = setting === 0 ? 0 : 0.25 + ( setting * 0.75 );
      teaKettle.heatProportionProperty.set( mappedSetting );
    } );

    // node for heater-cooler bucket - front and back are added separately to support layering of energy chunks
    const heaterCoolerBack = new HeaterCoolerBack( this.heaterSettingProperty, { scale: HEATER_COOLER_NODE_SCALE } );
    const heaterCoolerFront = new HeaterCoolerFront( this.heaterSettingProperty, {
      snapToZero: false,
      coolEnabled: false,
      scale: HEATER_COOLER_NODE_SCALE,
      linkHeaterCoolerBack: heaterCoolerBack,
      tandem: tandem.createTandem( 'heaterCoolerNode' ),
      heaterCoolerBack: heaterCoolerBack
    } );

    // burner stand node
    const burnerSize = modelViewTransform.modelToViewShape( BURNER_MODEL_BOUNDS );
    const burnerProjection = burnerSize.width * BURNER_EDGE_TO_HEIGHT_RATIO;
    const burnerStandNode = new BurnerStandNode( burnerSize, burnerProjection );

    burnerStandNode.centerTop = teaKettleNode.centerBottom.plus( new Vector2( 0, -teaKettleNode.height / 4 ) );
    heaterCoolerBack.centerX = burnerStandNode.centerX;
    heaterCoolerBack.bottom = burnerStandNode.bottom - burnerProjection / 2;
    heaterCoolerFront.leftTop = heaterCoolerBack.getHeaterFrontPosition();

    const energyChunkLayer = new EnergyChunkLayer(
      teaKettle.energyChunkList,
      modelViewTransform,
      { parentPositionProperty: teaKettle.positionProperty }
    );

    // create steam node
    const spoutExitPosition = new Vector2( teaKettleNode.bounds.maxX - 4.5, teaKettleNode.bounds.minY + 16 );
    this.steamCanvasNode = new TeaKettleSteamCanvasNode(
      spoutExitPosition,
      teaKettle.energyProductionRateProperty,
      EFACConstants.MAX_ENERGY_PRODUCTION_RATE, {
        canvasBounds: new Bounds2(
          -EFACConstants.SCREEN_LAYOUT_BOUNDS.maxX / 2,
          -EFACConstants.SCREEN_LAYOUT_BOUNDS.maxY,
          EFACConstants.SCREEN_LAYOUT_BOUNDS.maxX / 2,
          EFACConstants.SCREEN_LAYOUT_BOUNDS.maxY
        )
      } );

    this.addChild( heaterCoolerBack );
    this.addChild( energyChunkLayer );
    this.addChild( heaterCoolerFront );

    // create a separate layer for the tea kettle, stand, and steam, which all become transparent when energy chunks
    // are turned on. the steam canvas node does not like its opacity to be set when it's not rendering anything, but
    // setting the opacity of its parent node is allowed.
    const kettleAndStand = new Node();
    kettleAndStand.addChild( burnerStandNode );
    kettleAndStand.addChild( this.steamCanvasNode );
    kettleAndStand.addChild( teaKettleNode );
    this.addChild( kettleAndStand );

    // make the tea kettle, stand, and steam transparent when energy chunks are visible
    energyChunksVisibleProperty.link( chunksVisible => {
      kettleAndStand.setOpacity( chunksVisible ? 0.7 : 1 );
    } );

    // reset the heater slider when the tea kettle is deactivated
    teaKettle.activeProperty.link( active => {
      if ( !active ) {
        this.heaterSettingProperty.reset();
      }
    } );
  }

  /**
   * step function for the steam
   * @param {number} dt
   * @public
   */
  step( dt ) {
    this.steamCanvasNode.step( dt );
  }

  /**
   * @public
   */
  reset() {
    this.steamCanvasNode.reset();
  }
}

energyFormsAndChanges.register( 'TeaKettleNode', TeaKettleNode );
export default TeaKettleNode;