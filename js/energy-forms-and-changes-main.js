// Copyright 2014-2015, University of Colorado Boulder

/**
 * Main entry point for the 'Energy Forms And Changes' sim.
 *
 * @author John Blanco
 * @author Martin Veillette (Berea College)
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyFormsAndChangesIntroScreen = require( 'ENERGY_FORMS_AND_CHANGES/intro/EnergyFormsAndChangesIntroScreen' );
  var EnergySystemsScreen = require( 'ENERGY_FORMS_AND_CHANGES/energysystems/EnergySystemsScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var energyFormsAndChangesTitleString = require( 'string!ENERGY_FORMS_AND_CHANGES/energy-forms-and-changes.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Noah Podolefsky',
      softwareDevelopment: 'John Blanco',
      team: 'Ariel Paul, Emily Moore, Katherine Perkins, Trish Loeblein',
      qualityAssurance: '',
      interviews: 'Noah Podolefsky',
      graphicArts: 'Noah Podolefsky',
      thanks: ''
    }
  };

  SimLauncher.launch( function() {

    var sim = new Sim( energyFormsAndChangesTitleString, [
      new EnergyFormsAndChangesIntroScreen(), new EnergySystemsScreen()
    ], simOptions );

    sim.start();
  } );
} );
