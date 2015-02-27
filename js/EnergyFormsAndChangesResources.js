// Copyright 2002-2015, University of Colorado

/**
 * Resources (images and translated strings) for "EnergyFormsAndChanges" are loaded eagerly to make sure everything exists on sim startup.
 */


define( function( require ) {
  'use strict';

  return {

// Resources

    PROJECT_NAME: "energy-forms-and-changes",
    //public static final PhetResources RESOURCES : new PhetResources( PROJECT_NAME );


//TODO: Refactor Strings: Append the word 'String' to every string variable and use CamelCase
//Strings

    BRICK: require( 'string!ENERGY_FORMS_AND_CHANGES/brick' ),
    CHEMICAL: require( 'string!ENERGY_FORMS_AND_CHANGES/chemical' ),
    CLOUDS: require( 'string!ENERGY_FORMS_AND_CHANGES/clouds' ),
    COOL: require( 'string!ENERGY_FORMS_AND_CHANGES/cool' ),
    ELECTRICAL: require( 'string!ENERGY_FORMS_AND_CHANGES/electrical' ),
    ENERGY_CHUNK_LABEL: require( 'string!ENERGY_FORMS_AND_CHANGES/energyChunkLabel' ),
    ENERGY_SYMBOLS: require( 'string!ENERGY_FORMS_AND_CHANGES/energySymbols' ),
    ENERGY_SYSTEMS: require( 'string!ENERGY_FORMS_AND_CHANGES/energySystems' ),
    FAST_FORWARD: require( 'string!ENERGY_FORMS_AND_CHANGES/fastForward' ),
    FEED_ME: require( 'string!ENERGY_FORMS_AND_CHANGES/feedMe' ),
    FORMS_OF_ENERGY: require( 'string!ENERGY_FORMS_AND_CHANGES/formsOfEnergy' ),
    HEAT: require( 'string!ENERGY_FORMS_AND_CHANGES/heat' ),
    INTRO: require( 'string!ENERGY_FORMS_AND_CHANGES/intro' ),
    IRON: require( 'string!ENERGY_FORMS_AND_CHANGES/iron' ),
    LIGHT: require( 'string!ENERGY_FORMS_AND_CHANGES/light' ),
    LOTS: require( 'string!ENERGY_FORMS_AND_CHANGES/lots' ),
    MECHANICAL: require( 'string!ENERGY_FORMS_AND_CHANGES/mechanical' ),
    NONE: require( 'string!ENERGY_FORMS_AND_CHANGES/none' ),
    NORMAL: require( 'string!ENERGY_FORMS_AND_CHANGES/normal' ),
    THERMAL: require( 'string!ENERGY_FORMS_AND_CHANGES/thermal' ),
    WATER: require( 'string!ENERGY_FORMS_AND_CHANGES/water' ),


//Images

    BACK_LEG_01: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_01.png' ),
    BACK_LEG_02: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_02.png' ),
    BACK_LEG_03: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_03.png' ),
    BACK_LEG_04: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_04.png' ),
    BACK_LEG_05: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_05.png' ),
    BACK_LEG_06: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_06.png' ),
    BACK_LEG_07: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_07.png' ),
    BACK_LEG_08: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_08.png' ),
    BACK_LEG_09: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_09.png' ),
    BACK_LEG_10: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_10.png' ),
    BACK_LEG_11: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_11.png' ),
    BACK_LEG_12: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_12.png' ),
    BACK_LEG_13: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_13.png' ),
    BACK_LEG_14: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_14.png' ),
    BACK_LEG_15: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_15.png' ),
    BACK_LEG_16: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_16.png' ),
    BACK_LEG_17: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_17.png' ),
    BACK_LEG_18: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_18.png' ),
    BACK_LEG_19: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_19.png' ),
    BACK_LEG_20: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_20.png' ),
    BACK_LEG_21: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_21.png' ),
    BACK_LEG_22: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_22.png' ),
    BACK_LEG_23: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_23.png' ),
    BACK_LEG_24: require( 'image!ENERGY_FORMS_AND_CHANGES/back_leg_24.png' ),
    BICYCLE_FRAME_3: require( 'image!ENERGY_FORMS_AND_CHANGES/bicycle_frame_3.png' ),
    BICYCLE_ICON: require( 'image!ENERGY_FORMS_AND_CHANGES/bicycle_icon.png' ),
    BICYCLE_RIDER: require( 'image!ENERGY_FORMS_AND_CHANGES/bicycle_rider.png' ),
    BICYCLE_RIDER_TIRED: require( 'image!ENERGY_FORMS_AND_CHANGES/bicycle_rider_tired.png' ),
    BICYCLE_SPOKES: require( 'image!ENERGY_FORMS_AND_CHANGES/bicycle_spokes.png' ),
    BRICK_TEXTURE_FRONT: require( 'image!ENERGY_FORMS_AND_CHANGES/brick_texture_front.png' ),
    BRICK_TEXTURE_RIGHT: require( 'image!ENERGY_FORMS_AND_CHANGES/brick_texture_right.png' ),
    BRICK_TEXTURE_TOP: require( 'image!ENERGY_FORMS_AND_CHANGES/brick_texture_top.png' ),
    CLOUD_1: require( 'image!ENERGY_FORMS_AND_CHANGES/cloud_1.png' ),
    CONNECTOR: require( 'image!ENERGY_FORMS_AND_CHANGES/connector.png' ),
    ELEMENT_BASE_BACK: require( 'image!ENERGY_FORMS_AND_CHANGES/element_base_back.png' ),
    ELEMENT_BASE_FRONT: require( 'image!ENERGY_FORMS_AND_CHANGES/element_base_front.png' ),
    E_CHEM_BLANK_LIGHT: require( 'image!ENERGY_FORMS_AND_CHANGES/E_chem_blank_light.png' ),
    E_DASHED_BLANK: require( 'image!ENERGY_FORMS_AND_CHANGES/E_dashed_blank.png' ),
    E_ELECTRIC_BLANK: require( 'image!ENERGY_FORMS_AND_CHANGES/E_electric_blank.png' ),
    E_LIGHT_BLANK: require( 'image!ENERGY_FORMS_AND_CHANGES/E_light_blank.png' ),
    E_MECH_BLANK: require( 'image!ENERGY_FORMS_AND_CHANGES/E_mech_blank.png' ),
    E_THERM_BLANK_ORANGE: require( 'image!ENERGY_FORMS_AND_CHANGES/E_therm_blank_orange.png' ),
    FAUCET_ICON: require( 'image!ENERGY_FORMS_AND_CHANGES/faucet_icon.png' ),
    FLUORESCENT_BACK_2: require( 'image!ENERGY_FORMS_AND_CHANGES/fluorescent_back_2.png' ),
    FLUORESCENT_FRONT_2: require( 'image!ENERGY_FORMS_AND_CHANGES/fluorescent_front_2.png' ),
    FLUORESCENT_ICON: require( 'image!ENERGY_FORMS_AND_CHANGES/fluorescent_icon.png' ),
    FLUORESCENT_ON_BACK_2: require( 'image!ENERGY_FORMS_AND_CHANGES/fluorescent_on_back_2.png' ),
    FLUORESCENT_ON_FRONT_2: require( 'image!ENERGY_FORMS_AND_CHANGES/fluorescent_on_front_2.png' ),
    FRONT_LEG_01: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_01.png' ),
    FRONT_LEG_02: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_02.png' ),
    FRONT_LEG_03: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_03.png' ),
    FRONT_LEG_04: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_04.png' ),
    FRONT_LEG_05: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_05.png' ),
    FRONT_LEG_06: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_06.png' ),
    FRONT_LEG_07: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_07.png' ),
    FRONT_LEG_08: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_08.png' ),
    FRONT_LEG_09: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_09.png' ),
    FRONT_LEG_10: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_10.png' ),
    FRONT_LEG_11: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_11.png' ),
    FRONT_LEG_12: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_12.png' ),
    FRONT_LEG_13: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_13.png' ),
    FRONT_LEG_14: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_14.png' ),
    FRONT_LEG_15: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_15.png' ),
    FRONT_LEG_16: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_16.png' ),
    FRONT_LEG_17: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_17.png' ),
    FRONT_LEG_18: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_18.png' ),
    FRONT_LEG_19: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_19.png' ),
    FRONT_LEG_20: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_20.png' ),
    FRONT_LEG_21: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_21.png' ),
    FRONT_LEG_22: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_22.png' ),
    FRONT_LEG_23: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_23.png' ),
    FRONT_LEG_24: require( 'image!ENERGY_FORMS_AND_CHANGES/front_leg_24.png' ),
    GENERATOR: require( 'image!ENERGY_FORMS_AND_CHANGES/generator.png' ),
    GENERATOR_ICON: require( 'image!ENERGY_FORMS_AND_CHANGES/generator_icon.png' ),
    GENERATOR_WHEEL_HUB_2: require( 'image!ENERGY_FORMS_AND_CHANGES/generator_wheel_hub_2.png' ),
    GENERATOR_WHEEL_PADDLES_SHORT: require( 'image!ENERGY_FORMS_AND_CHANGES/generator_wheel_paddles_short.png' ),
    GENERATOR_WHEEL_SPOKES: require( 'image!ENERGY_FORMS_AND_CHANGES/generator_wheel_spokes.png' ),
    HEATER_ELEMENT: require( 'image!ENERGY_FORMS_AND_CHANGES/heater_element.png' ),
    HEATER_ELEMENT_DARK: require( 'image!ENERGY_FORMS_AND_CHANGES/heater_element_dark.png' ),
    INCANDESCENT_2: require( 'image!ENERGY_FORMS_AND_CHANGES/incandescent_2.png' ),
    INCANDESCENT_ICON: require( 'image!ENERGY_FORMS_AND_CHANGES/incandescent_icon.png' ),
    INCANDESCENT_ON_3: require( 'image!ENERGY_FORMS_AND_CHANGES/incandescent_on_3.png' ),
    SHELF_LONG: require( 'image!ENERGY_FORMS_AND_CHANGES/shelf_long.png' ),
    SOLAR_PANEL: require( 'image!ENERGY_FORMS_AND_CHANGES/solar_panel.png' ),
    SOLAR_PANEL_GEN: require( 'image!ENERGY_FORMS_AND_CHANGES/solar_panel_gen.png' ),
    SOLAR_PANEL_ICON: require( 'image!ENERGY_FORMS_AND_CHANGES/solar_panel_icon.png' ),
    SOLAR_PANEL_POST_2: require( 'image!ENERGY_FORMS_AND_CHANGES/solar_panel_post_2.png' ),
    SUN_ICON: require( 'image!ENERGY_FORMS_AND_CHANGES/sun_icon.png' ),
    TEAPOT_ICON: require( 'image!ENERGY_FORMS_AND_CHANGES/teapot_icon.png' ),
    TEAPOT_LARGE: require( 'image!ENERGY_FORMS_AND_CHANGES/teapot_large.png' ),
    THERMOMETER_MEDIUM_BACK: require( 'image!ENERGY_FORMS_AND_CHANGES/thermometer_medium_back.png' ),
    THERMOMETER_MEDIUM_FRONT: require( 'image!ENERGY_FORMS_AND_CHANGES/thermometer_medium_front.png' ),
    WATER_ICON: require( 'image!ENERGY_FORMS_AND_CHANGES/water_icon.png' ),
    WIRE_BLACK_62: require( 'image!ENERGY_FORMS_AND_CHANGES/wire_black_62.png' ),
    WIRE_BLACK_LEFT: require( 'image!ENERGY_FORMS_AND_CHANGES/wire_black_left.png' ),
    WIRE_BLACK_RIGHT: require( 'image!ENERGY_FORMS_AND_CHANGES/wire_black_right.png' )
  };


} );
