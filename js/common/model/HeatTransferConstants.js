// Copyright 2015-2019, University of Colorado Boulder

/**
 * Static object containing the constants that control the rate of heat transfer between the various model elements that
 * can contain heat, as well as methods for obtaining the heat transfer value for any two model elements that are
 * capable of exchanging heat with one another.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  const EnergyContainerCategory = require( 'ENERGY_FORMS_AND_CHANGES/common/model/EnergyContainerCategory' );

  // constants
  const BRICK_IRON_HEAT_TRANSFER_FACTOR = 1000.0;
  const BRICK_WATER_HEAT_TRANSFER_FACTOR = 1000.0;
  const BRICK_OLIVE_OIL_HEAT_TRANSFER_FACTOR = 1000.0;
  const BRICK_AIR_HEAT_TRANSFER_FACTOR = 30.0;
  const IRON_WATER_HEAT_TRANSFER_FACTOR = 1000.0;
  const IRON_OLIVE_OIL_HEAT_TRANSFER_FACTOR = 1000.0;
  const IRON_AIR_HEAT_TRANSFER_FACTOR = 30.0;
  const WATER_OLIVE_OIL_HEAT_TRANSFER_FACTOR = 1000.0;
  const WATER_AIR_HEAT_TRANSFER_FACTOR = 30.0;
  const OLIVE_OIL_AIR_HEAT_TRANSFER_FACTOR = 30.0;
  const AIR_TO_SURROUNDING_AIR_HEAT_TRANSFER_FACTOR = 10000.0;

  // map of inter-object heat transfer constants
  const heatTransferConstantsMap = {
    'IRON': {
      'BRICK': BRICK_IRON_HEAT_TRANSFER_FACTOR,
      'WATER': IRON_WATER_HEAT_TRANSFER_FACTOR,
      'OLIVE_OIL': IRON_OLIVE_OIL_HEAT_TRANSFER_FACTOR,
      'AIR': IRON_AIR_HEAT_TRANSFER_FACTOR
    },
    'BRICK': {
      'IRON': BRICK_IRON_HEAT_TRANSFER_FACTOR,
      'AIR': BRICK_AIR_HEAT_TRANSFER_FACTOR,
      'WATER': BRICK_WATER_HEAT_TRANSFER_FACTOR,
      'OLIVE_OIL': BRICK_OLIVE_OIL_HEAT_TRANSFER_FACTOR
    },
    'WATER': {
      'OLIVE_OIL': WATER_OLIVE_OIL_HEAT_TRANSFER_FACTOR,
      'BRICK': BRICK_WATER_HEAT_TRANSFER_FACTOR,
      'AIR': WATER_AIR_HEAT_TRANSFER_FACTOR,
      'IRON': IRON_WATER_HEAT_TRANSFER_FACTOR
    },
    'OLIVE_OIL': {
      'BRICK': BRICK_OLIVE_OIL_HEAT_TRANSFER_FACTOR,
      'AIR': OLIVE_OIL_AIR_HEAT_TRANSFER_FACTOR,
      'IRON': IRON_OLIVE_OIL_HEAT_TRANSFER_FACTOR,
      'WATER': WATER_OLIVE_OIL_HEAT_TRANSFER_FACTOR
    },
    'AIR': {
      'BRICK': BRICK_AIR_HEAT_TRANSFER_FACTOR,
      'WATER': WATER_AIR_HEAT_TRANSFER_FACTOR,
      'OLIVE_OIL': OLIVE_OIL_AIR_HEAT_TRANSFER_FACTOR,
      'IRON': IRON_AIR_HEAT_TRANSFER_FACTOR
    }
  };

  const HeatTransferConstants = {

    /**
     * get the heat transfer constants for two model elements that can contain heat
     * @param {Object} element1 - a value from EnergyContainerCategory
     * @param {Object} element2 - a value from EnergyContainerCategory
     * @returns {number}
     * @public
     */
    getHeatTransferFactor( category1, category2 ) {
      assert && assert( EnergyContainerCategory.includes( category1 ), `invalid category1: ${category1}` );
      assert && assert( EnergyContainerCategory.includes( category2 ), `invalid category2: ${category2}` );

      return heatTransferConstantsMap[ category1.name ][ category2.name ];
    },

    //REVIEW #247 missing visibility annotation
    //REVIEW #247 document
    /**
     * @returns {number}
     */
    getAirToSurroundingAirHeatTransferFactor() {
      return AIR_TO_SURROUNDING_AIR_HEAT_TRANSFER_FACTOR;
    }
  };

  return energyFormsAndChanges.register( 'HeatTransferConstants', HeatTransferConstants );
} );

