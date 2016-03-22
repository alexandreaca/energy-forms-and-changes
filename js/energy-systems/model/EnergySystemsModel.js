// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model for the 'Energy Systems' screen of the Energy Forms And Changes simulation.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // Modules
  var EnergySystemElementCarousel = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/EnergySystemElementCarousel' );
  var FaucetAndWater = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/FaucetAndWater' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var SolarPanel = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/SolarPanel' );
  var SunEnergySource = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/SunEnergySource' );
  var TeaPot = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/TeaPot' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants

  // For the images (sun, teapot, biker, ...) scrolling like a one-armed bandit,
  // this is the offset between them (purely vertical).
  var OFFSET_BETWEEN_ELEMENTS_ON_CAROUSEL = new Vector2( 0, -0.4 );

  /**
   * Main constructor for EnergySystemsModel, which contains all of the model
   * logic for the entire sim screen.
   * @constructor
   */
  function EnergySystemsModel() {

    PropertySet.call( this, {

      // Boolean property that controls whether the energy chunks are visible to the user.
      energyChunksVisible: false,

      steamPowerableElementInPlace: false,

      waterPowerableElementInPlace: false,

      // Play/pause state
      isPlaying: true
    } );

    // Carousels that control the positions of the energy sources, converters,
    // and users.
    this.energySourcesCarousel = new EnergySystemElementCarousel( new Vector2( -0.15, 0 ), OFFSET_BETWEEN_ELEMENTS_ON_CAROUSEL );
    this.energyConvertersCarousel = new EnergySystemElementCarousel( new Vector2( -0.025, 0 ), OFFSET_BETWEEN_ELEMENTS_ON_CAROUSEL );
    this.energyUsersCarousel = new EnergySystemElementCarousel( new Vector2( 0.09, 0 ), OFFSET_BETWEEN_ELEMENTS_ON_CAROUSEL );

    // TODO change from the single-element version to all, once the others are non-empty
    this.carousels = [
      this.energySourcesCarousel
    ];
    // this.carousels = [
    //   this.energySourcesCarousel,
    //   this.energyConvertersCarousel,
    //   this.energyUsersCarousel
    // ];

    this.solarPanel = new SolarPanel( this.energyChunksVisible );
    this.sun = new SunEnergySource( this.solarPanel, this.energyChunksVisible );
    this.teaPot = new TeaPot( this.energyChunksVisible, this.steamPowerableElementInPlace );
    this.faucet = new FaucetAndWater( this.energyChunksVisible, this.waterPowerableElementInPlace );

    this.energySourcesCarousel.add( this.sun );
    this.energySourcesCarousel.add( this.teaPot );
    this.energySourcesCarousel.add( this.faucet );
  }

  return inherit( PropertySet, EnergySystemsModel, {
    step: function( dt ) {

      // Elements managed by carousels need to be scrollable/selectable regardless
      // of play/pause state.
      this.carousels.forEach( function( carousel ) {
        carousel.stepInTime( dt );
      } );

      if ( this.isPlaying ) {
        // var energyFromSource = this.energySourcesCarousel.getSelectedElement().stepInTime( dt );
      }

    }
  } );
} );