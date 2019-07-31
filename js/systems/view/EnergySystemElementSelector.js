// Copyright 2016-2019, University of Colorado Boulder

/**
 * a Scenery Node that allows the user to select the various elements contained within a carousel by presenting a set of
 * radio-style push buttons, each with an icon image of the selection that it represents
 *
 * @author John Blanco
 * @author Andrew Adare
 * @author Jesse Greenberg
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  const energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  const Panel = require( 'SUN/Panel' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  // constants
  const BUTTON_IMAGE_HEIGHT_AND_WIDTH = 44; // In screen coordinates, which is close to pixels.

  class EnergySystemElementSelector extends Panel {

    //REVIEW #247 missing @param options
    /**
     * @param {EnergySystemElementCarousel} carousel
     */
    constructor( carousel, options ) {

      options = _.extend( {
        fill: EFACConstants.CONTROL_PANEL_BACKGROUND_COLOR,
        stroke: EFACConstants.CONTROL_PANEL_OUTLINE_STROKE,
        lineWidth: EFACConstants.CONTROL_PANEL_OUTLINE_LINE_WIDTH,
        cornerRadius: EFACConstants.CONTROL_PANEL_CORNER_RADIUS,
        xMargin: 10,
        yMargin: 10
      }, options );

      const buttonElementList = [];

      for ( let i = 0; i < carousel.managedElements.length; i++ ) {
        const element = carousel.managedElements[ i ];
        const iconImage = element.iconImage;
        const width = iconImage.getBounds().getWidth();
        const height = iconImage.getBounds().getHeight();
        const denominator = ( width > height ) ? width : height;

        assert && assert( denominator > 0, 'Largest image dimension = 0 --> division by 0' );

        iconImage.setScaleMagnitude( BUTTON_IMAGE_HEIGHT_AND_WIDTH / denominator );
        buttonElementList.push( {
          value: i,
          node: iconImage
        } );
      }

      const buttonGroup = new RadioButtonGroup( carousel.targetIndexProperty, buttonElementList, {
        baseColor: Color.WHITE,
        orientation: 'horizontal',
        spacing: 15
      } );

      super( buttonGroup, options );
    }
  }

  return energyFormsAndChanges.register( 'EnergySystemElementSelector', EnergySystemElementSelector );
} );

