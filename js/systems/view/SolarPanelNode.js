// Copyright 2016-2020, University of Colorado Boulder

/**
 * a Scenery Node that depicts a solar panel in the view
 *
 * @author John Blanco
 * @author Andrew Adare
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import connectorImage from '../../../images/connector_png.js';
import solarPanelGenImage from '../../../images/solar_panel_gen_png.js';
import solarPanelImage from '../../../images/solar_panel_png.js';
import solarPanelPostImage from '../../../images/solar_panel_post_png.js';
import wireBottomLeftImage from '../../../images/wire_bottom_left_png.js';
import EFACConstants from '../../common/EFACConstants.js';
import EFACQueryParameters from '../../common/EFACQueryParameters.js';
import EnergyChunkLayer from '../../common/view/EnergyChunkLayer.js';
import energyFormsAndChanges from '../../energyFormsAndChanges.js';
import SolarPanel from '../model/SolarPanel.js';
import MoveFadeModelElementNode from './MoveFadeModelElementNode.js';

class SolarPanelNode extends MoveFadeModelElementNode {

  /**
   * @param {SolarPanel} solarPanel - model of a solar panel
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   */
  constructor( solarPanel, modelViewTransform, tandem ) {
    super( solarPanel, modelViewTransform, tandem );

    // create a scale-only MVT since the absorption shape is relatively positioned
    const scaleOnlyMVT = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      Vector2.ZERO,
      modelViewTransform.getMatrix().getScaleVector().x
    );

    // Add an image for the actual panel portion, i.e. the part that collects the solar energy.  The aspect ratio of
    // the image should be reasonably close to the shape described by the model to avoid visual distortion.
    const panelNode = new Image( solarPanelImage );
    panelNode.scale(
      modelViewTransform.modelToViewDeltaX( solarPanel.untranslatedPanelBounds.width ) / panelNode.width,
      -modelViewTransform.modelToViewDeltaY( solarPanel.untranslatedPanelBounds.height ) / panelNode.height
    );
    panelNode.center = scaleOnlyMVT.modelToViewPosition( solarPanel.untranslatedPanelBounds.center );

    // add the other portions of the solar panel assembly
    const postNode = new Image( solarPanelPostImage, {
      centerX: modelViewTransform.modelToViewDeltaX( SolarPanel.PANEL_CONNECTOR_OFFSET.x ),
      top: panelNode.bottom - 5
    } );
    const windowNode = new Image( solarPanelGenImage, {
      centerX: postNode.centerX,
      top: postNode.centerY
    } );
    const wireBottomLeftNode = new Image( wireBottomLeftImage, {
      right: windowNode.right - 20,
      bottom: windowNode.centerY + 13,
      scale: EFACConstants.WIRE_IMAGE_SCALE
    } );
    const connectorNode = new Image( connectorImage, { left: windowNode.right - 2, centerY: windowNode.centerY } );

    // add in correct order for layering effect
    this.addChild( wireBottomLeftNode );
    this.addChild( postNode );
    this.addChild( panelNode );
    this.addChild( new EnergyChunkLayer( solarPanel.energyChunkList, modelViewTransform, {
      parentPositionProperty: solarPanel.positionProperty
    } ) );
    this.addChild( windowNode );
    this.addChild( connectorNode );

    // for debug
    if ( EFACQueryParameters.showHelperShapes ) {

      // add a shape that shows the bounds of the collection area
      const panelBoundsShape = Shape.rect(
        solarPanel.untranslatedPanelBounds.minX,
        solarPanel.untranslatedPanelBounds.minY,
        solarPanel.untranslatedPanelBounds.width,
        solarPanel.untranslatedPanelBounds.height
      );
      this.addChild( new Path( scaleOnlyMVT.modelToViewShape( panelBoundsShape ), {
        stroke: 'green'
      } ) );

      // add a shape that shows where light energy chunks should be absorbed
      this.addChild( new Path( scaleOnlyMVT.modelToViewShape( solarPanel.untranslatedAbsorptionShape ), {
        stroke: 'red',
        lineJoin: 'round'
      } ) );

      // create a marker the shows where the center of the node is
      const crossLength = 15;
      const crossShape = new Shape()
        .moveTo( -crossLength / 2, 0 )
        .lineTo( crossLength / 2, 0 )
        .moveTo( 0, -crossLength / 2 )
        .lineTo( 0, crossLength / 2 );
      this.addChild( new Path( crossShape, {
        stroke: 'red',
        lineWidth: 3
      } ) );
    }
  }
}

energyFormsAndChanges.register( 'SolarPanelNode', SolarPanelNode );
export default SolarPanelNode;