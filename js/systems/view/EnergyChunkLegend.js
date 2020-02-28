// Copyright 2016-2020, University of Colorado Boulder

/**
 * a Scenery Node that represent a legend that describes the different types of energy chunks
 *
 * @author John Blanco
 * @author Jesse Greenberg
 * @author Andrew Adare
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Panel from '../../../../sun/js/Panel.js';
import EFACConstants from '../../common/EFACConstants.js';
import EnergyChunk from '../../common/model/EnergyChunk.js';
import EnergyType from '../../common/model/EnergyType.js';
import EnergyChunkNode from '../../common/view/EnergyChunkNode.js';
import energyFormsAndChangesStrings from '../../energy-forms-and-changes-strings.js';
import energyFormsAndChanges from '../../energyFormsAndChanges.js';

const chemicalString = energyFormsAndChangesStrings.chemical;
const electricalString = energyFormsAndChangesStrings.electrical;
const formsOfEnergyString = energyFormsAndChangesStrings.formsOfEnergy;
const lightString = energyFormsAndChangesStrings.light;
const mechanicalString = energyFormsAndChangesStrings.mechanical;
const thermalString = energyFormsAndChangesStrings.thermal;

// constants
const LEGEND_ENTRY_FONT = new PhetFont( 14 );

class EnergyChunkLegend extends Panel {

  /**
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   */
  constructor( modelViewTransform, options ) {

    options = merge( {
      fill: EFACConstants.CONTROL_PANEL_BACKGROUND_COLOR,
      stroke: EFACConstants.CONTROL_PANEL_OUTLINE_STROKE,
      lineWidth: EFACConstants.CONTROL_PANEL_OUTLINE_LINE_WIDTH,
      cornerRadius: EFACConstants.ENERGY_SYMBOLS_PANEL_CORNER_RADIUS
    }, options );

    // title that appears at the top of the legend
    const titleText = new Text( formsOfEnergyString, {
      font: new PhetFont( {
        size: 14,
        weight: 'bold'
      } ),
      maxWidth: 130
    } );

    // add an entry for each type of energy that can appear in the sim
    const content = new VBox( {
      children: [
        titleText,
        EnergyChunkLegend.createEnergyChunkSymbol( mechanicalString, EnergyType.MECHANICAL, modelViewTransform ),
        EnergyChunkLegend.createEnergyChunkSymbol( electricalString, EnergyType.ELECTRICAL, modelViewTransform ),
        EnergyChunkLegend.createEnergyChunkSymbol( thermalString, EnergyType.THERMAL, modelViewTransform ),
        EnergyChunkLegend.createEnergyChunkSymbol( lightString, EnergyType.LIGHT, modelViewTransform ),
        EnergyChunkLegend.createEnergyChunkSymbol( chemicalString, EnergyType.CHEMICAL, modelViewTransform )
      ],
      align: 'left',
      spacing: 6
    } );

    super( content, options );
  }

  /**
   * helper function to create energy chunk legend entries
   * @param labelString - the label for this legend entry
   * @param energyType - the type of energy for this legend entry
   * @param modelViewTransform - needs to be passed in to create an EnergyChunk
   * @public
   */
  static createEnergyChunkSymbol( labelString, energyType, modelViewTransform ) {
    const labelText = new Text( labelString, {
      font: LEGEND_ENTRY_FONT,
      maxWidth: 100
    } );

    // The EnergyChunks that are created here are not going to be used in the simulation, they are only needed for the
    // EnergyChunkNodes that are displayed in the legend.
    const iconNode = new EnergyChunkNode(
      new EnergyChunk( energyType, Vector2.ZERO, Vector2.ZERO, new BooleanProperty( true ) ),
      modelViewTransform
    );

    return new HBox( {
      children: [ iconNode, labelText ],
      spacing: 10
    } );
  }
}

energyFormsAndChanges.register( 'EnergyChunkLegend', EnergyChunkLegend );
export default EnergyChunkLegend;