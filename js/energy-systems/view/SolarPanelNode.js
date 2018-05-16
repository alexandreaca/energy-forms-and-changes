// Copyright 2016, University of Colorado Boulder

/**
 * Node representing a solar panel in the view.
 *
 * @author John Blanco
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // modules
  var MoveFadeModelElementNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/MoveFadeModelElementNode' );
  var EFACModelImageNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/EFACModelImageNode' );
  var EnergyChunkLayer = require( 'ENERGY_FORMS_AND_CHANGES/common/view/EnergyChunkLayer' );
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolarPanel = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/SolarPanel' );

  /**
   * @param {SolarPanel} solarPanel From the model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function SolarPanelNode( solarPanel, modelViewTransform ) {

    // Add args to constructor as needed
    MoveFadeModelElementNode.call( this, solarPanel, modelViewTransform );

    // Add the images and the node that will manage the energy chunks in
    // the order needed for the desired layering.
    this.addChild( new EFACModelImageNode( SolarPanel.CURVED_WIRE_IMAGE, modelViewTransform ) );
    this.addChild( new EFACModelImageNode( SolarPanel.POST_IMAGE, modelViewTransform ) );
    this.addChild( new EFACModelImageNode( SolarPanel.SOLAR_PANEL_IMAGE, modelViewTransform ) );
    this.addChild( new EnergyChunkLayer( solarPanel.energyChunkList, solarPanel.positionProperty, modelViewTransform ) );
    this.addChild( new EFACModelImageNode( SolarPanel.CONVERTER_IMAGE, modelViewTransform ) );
    this.addChild( new EFACModelImageNode( SolarPanel.CONNECTOR_IMAGE, modelViewTransform ) );
  }

  energyFormsAndChanges.register( 'SolarPanelNode', SolarPanelNode );

  return inherit( MoveFadeModelElementNode, SolarPanelNode );
} );

