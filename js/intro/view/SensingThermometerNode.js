// Copyright 2014-2015, University of Colorado Boulder

/**
 * Thermometer node that updates its displayed temperature and color based on
 * what is being "sensed" by the supplied thermometer model element.
 *
 * @author John Blanco
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var ThermometerNode = require( 'ENERGY_FORMS_AND_CHANGES/intro/view/ThermometerNode' );

  /**
   *
   * @param {Thermometer} thermometer
   * @constructor
   */
  function SensingThermometerNode( thermometer ) {
    ThermometerNode.call( this );
    this.thermometer = thermometer;
    var self = this;

    thermometer.sensedTemperatureProperty.link( function( sensedTemperature ) {
      self.setSensedTemperature( sensedTemperature );
    } );
    thermometer.sensedElementColorProperty.link( function( sensedColor ) {
      self.setSensedColor( sensedColor );
    } );
    thermometer.activeProperty.link( function( active ) {
      self.setVisible( active );
    } );
  }

  return inherit( ThermometerNode, SensingThermometerNode, {

    /**
     * @public
     * @returns {ThermometerNode}
     */
    getThermometer: function() {
      return this.thermometer;
    }
  } );
} );

//
//// Copyright 2002-2015, University of Colorado Boulder

//package edu.colorado.phet.energyformsandchanges.intro.view;
//
//import java.awt.*;
//
//import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;
//import edu.colorado.phet.energyformsandchanges.common.model.Thermometer;
//
///**
// * Thermometer node that updates its displayed temperature and color based on
// * what is being "sensed" by the supplied thermometer model element.
// *
// * @author John Blanco
// */
//public class SensingThermometerNode extends ThermometerNode {
//
//  private final Thermometer thermometer;
//
//  public SensingThermometerNode( final Thermometer thermometer ) {
//    this.thermometer = thermometer;
//
//    thermometer.sensedTemperature.addObserver( new VoidFunction1<Double>() {
//      public void apply( Double sensedTemperature ) {
//        setSensedTemperature( sensedTemperature );
//      }
//    } );
//
//    thermometer.sensedElementColor.addObserver( new VoidFunction1<Color>() {
//      public void apply( Color sensedColor ) {
//        setSensedColor( sensedColor );
//      }
//    } );
//
//    thermometer.active.addObserver( new VoidFunction1<Boolean>() {
//      public void apply( Boolean active ) {
//        setVisible( active );
//      }
//    } );
//  }
//
//  public Thermometer getThermometer() {
//    return thermometer;
//  }
//}

