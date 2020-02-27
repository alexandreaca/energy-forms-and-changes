// Copyright 2018-2019, University of Colorado Boulder

/**
 * a scenery node that represents a light bulb in the view
 *
 * @author John Blanco
 * @author Andrew Adare
 * @author Jesse Greenberg
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Color from '../../../../scenery/js/util/Color.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import elementBaseBackImage from '../../../images/element_base_back_png.js';
import elementBaseFrontImage from '../../../images/element_base_front_png.js';
import fluorescentOffBackImage from '../../../images/fluorescent_back_png.js';
import fluorescentOffFrontImage from '../../../images/fluorescent_front_png.js';
import fluorescentOnBackImage from '../../../images/fluorescent_on_back_png.js';
import fluorescentOnFrontImage from '../../../images/fluorescent_on_front_png.js';
import incandescentOnImage from '../../../images/incandescent_on_png.js';
import incandescentOffImage from '../../../images/incandescent_png.js';
import wireBottomRightImage from '../../../images/wire_bottom_right_png.js';
import wireStraightImage from '../../../images/wire_straight_png.js';
import EFACConstants from '../../common/EFACConstants.js';
import EnergyChunkLayer from '../../common/view/EnergyChunkLayer.js';
import energyFormsAndChanges from '../../energyFormsAndChanges.js';
import LightRays from './LightRays.js';
import MoveFadeModelElementNode from './MoveFadeModelElementNode.js';

// constants
const FLUORESCENT_BULB_TOP_OFFSET = 28;
const INCANDESCENT_BULB_TOP_OFFSET = 31;

class LightBulbNode extends MoveFadeModelElementNode {

  /**
   * @param {FluorescentBulb} lightBulb
   * @param {BooleanProperty} energyChunksVisibleProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   */
  constructor( lightBulb, energyChunksVisibleProperty, modelViewTransform, options ) {

    options = merge( {

      // LightBulbNode options
      bulbType: 'fluorescent',

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    assert && assert(
      options.bulbType === 'fluorescent' || options.bulbType === 'incandescent',
      'bulbType should be fluorescent or incandescent'
    );

    super( lightBulb, modelViewTransform, options.tandem );

    const lightRays = new LightRays( Vector2.ZERO, 30, 400, 20, Color.YELLOW );
    this.addChild( lightRays );

    // only show the light rays when the energy chunks are not shown
    energyChunksVisibleProperty.link( visible => {
      lightRays.setVisible( !visible );
    } );

    // add the images and the layer that will contain the energy chunks
    const wireStraightNode = new Image( wireStraightImage, {
      left: -110.5,
      top: 78,
      scale: EFACConstants.WIRE_IMAGE_SCALE
    } );
    const wireBottomRightNode = new Image( wireBottomRightImage, {
      left: wireStraightNode.right - 4,
      bottom: wireStraightNode.bottom + 2.3,
      scale: EFACConstants.WIRE_IMAGE_SCALE
    } );
    const elementBaseBackNode = new Image( elementBaseBackImage, {
      maxWidth: EFACConstants.ELEMENT_BASE_WIDTH,
      right: wireBottomRightNode.right + 22,
      top: wireBottomRightNode.top - 2.5
    } );
    const elementBaseFrontNode = new Image( elementBaseFrontImage, {
      maxWidth: elementBaseBackNode.width,
      centerX: elementBaseBackNode.centerX,
      top: wireBottomRightNode.top - 3
    } );

    this.addChild( wireStraightNode );
    this.addChild( wireBottomRightNode );
    this.addChild( elementBaseBackNode );
    this.addChild( new EnergyChunkLayer( lightBulb.energyChunkList, modelViewTransform, {
      parentPositionProperty: lightBulb.positionProperty
    } ) );
    this.addChild( elementBaseFrontNode );

    if ( options.bulbType === 'fluorescent' ) {
      const fluorescentOffBackNode = new Image( fluorescentOffBackImage, {
        centerX: elementBaseFrontNode.centerX,
        bottom: elementBaseFrontNode.top + FLUORESCENT_BULB_TOP_OFFSET
      } );
      const fluorescentOnBackNode = new Image( fluorescentOnBackImage, {
        centerX: elementBaseFrontNode.centerX,
        bottom: elementBaseFrontNode.top + FLUORESCENT_BULB_TOP_OFFSET
      } );
      const fluorescentOffFrontNode = new Image( fluorescentOffFrontImage, {
        centerX: elementBaseFrontNode.centerX,
        bottom: elementBaseFrontNode.top + FLUORESCENT_BULB_TOP_OFFSET
      } );
      const fluorescentOnFrontNode = new Image( fluorescentOnFrontImage, {
        centerX: elementBaseFrontNode.centerX,
        bottom: elementBaseFrontNode.top + FLUORESCENT_BULB_TOP_OFFSET
      } );

      this.addChild( fluorescentOffBackNode );
      this.addChild( fluorescentOnBackNode );
      this.addChild( fluorescentOffFrontNode );
      this.addChild( fluorescentOnFrontNode );

      // make bulb partially transparent when energy chunks visible
      energyChunksVisibleProperty.link( visible => {
        const opacity = visible ? 0.7 : 1.0;
        fluorescentOffFrontNode.setOpacity( opacity );
        fluorescentOffBackNode.setOpacity( opacity );
      } );

      // center the light rays on the bulb image
      lightRays.y = fluorescentOnFrontNode.bounds.center.y - fluorescentOnFrontNode.bounds.height * 0.1;

      // update the transparency of the lit bulb based on model element
      lightBulb.litProportionProperty.link( litProportion => {
        const opacity = energyChunksVisibleProperty.get() ? 0.7 * litProportion : litProportion;
        fluorescentOnFrontNode.setOpacity( opacity );
        fluorescentOnBackNode.setOpacity( opacity );
        lightRays.setOpacity( opacity );
      } );
    }
    else {
      const incandescentOffNode = new Image( incandescentOffImage, {
        centerX: elementBaseFrontNode.centerX,
        bottom: elementBaseFrontNode.top + INCANDESCENT_BULB_TOP_OFFSET
      } );
      const incandescentOnNode = new Image( incandescentOnImage, {
        centerX: elementBaseFrontNode.centerX,
        bottom: elementBaseFrontNode.top + INCANDESCENT_BULB_TOP_OFFSET
      } );
      this.addChild( incandescentOffNode );
      this.addChild( incandescentOnNode );

      // center the light rays on the bulb image
      lightRays.y = incandescentOnNode.bounds.center.y - incandescentOnNode.bounds.height * 0.1;

      // update the transparency of the lit bulb based on model element
      lightBulb.litProportionProperty.link( litProportion => {
        incandescentOnNode.setOpacity( litProportion );
        lightRays.setOpacity( litProportion );
      } );
    }
  }
}

energyFormsAndChanges.register( 'LightBulbNode', LightBulbNode );
export default LightBulbNode;