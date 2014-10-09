// Copyright 2002-2014, University of Colorado

/**
 * Basic thermometer that senses temperature, has a position. The thermometer
 * has only a point and a temperature in the model.  Its visual representation
 * is left entirely to the view.
 *
 * @author John Blanco
 */

define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Color = require( 'SCENERY/util/Color' );
  var EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  var PropertySet = require( 'AXON/PropertySet' );
  //var TemperatureAndColor = require( 'ENERGY_FORMS_AND_CHANGES/common/TemperatureAndColor' );
  var UserMovableModelElement = require( 'ENERGY_FORMS_AND_CHANGES/intro/model/UserMovableElement' );
  var Vector2 = require( 'DOT/Vector2' );

//constants
  var RED_COLORBLIND = new Color( 255, 85, 0 );

  /**
   *
   * @param {model} model
   * @param {Vector2} initialPosition
   * @param {Boolean} initiallyActive
   * @constructor
   */
  function Thermometer( model, initialPosition, initiallyActive ) {

    UserMovableModelElement.call( this, initialPosition );

    //TODO: Ask JB for alternative solution
    this.model = model;

    this.addProperty( 'sensedTemperature', EFACConstants.ROOM_TEMPERATURE );
    this.addProperty( 'sensedElementColor', RED_COLORBLIND );

    // Property that is used primarily to control visibility in the view.
    this.addProperty( 'active', initiallyActive );


    // Update the sensed temperature at each clock tick.
    // TODO ask JB about if this is correct
//    var temperatureAndColor = model.getTemperatureAndColorAtLocation( position.get() );
//    sensedTemperatureProperty.set( temperatureAndColor.temperature );
    //   sensedElementColorProperty.set( temperatureAndColor.color );


  }

  inherit( UserMovableModelElement, Thermometer, {

    step: function( dt ) {
      //TODO: make sure to implement getTemperatureAndColorAtLocation in model (both intro and energyssytems
      var temperatureAndColor = this.model.getTemperatureAndColorAtLocation( this.position );
      this.sensedTemperatureProperty.set( temperatureAndColor.temperature );
      this.sensedElementColorProperty.set( temperatureAndColor.color );
    },

    reset: function() {
      this.activeProperty.reset();
    },

    getBottomSurfaceProperty: function() {
      return null;
    }
  } );

} );

//
//// Copyright 2002-2012, University of Colorado
//package edu.colorado.phet.energyformsandchanges.common.model;
//
//import java.awt.Color;
//
//import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;
//import edu.colorado.phet.common.phetcommon.model.clock.ClockAdapter;
//import edu.colorado.phet.common.phetcommon.model.clock.ClockEvent;
//import edu.colorado.phet.common.phetcommon.model.clock.ConstantDtClock;
//import edu.colorado.phet.common.phetcommon.model.property.BooleanProperty;
//import edu.colorado.phet.common.phetcommon.model.property.Property;
//import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
//import edu.colorado.phet.common.phetcommon.view.PhetColorScheme;
//import edu.colorado.phet.energyformsandchanges.EnergyFormsAndChangesSimSharing;
//import edu.colorado.phet.energyformsandchanges.common.EFACConstants;
//import edu.colorado.phet.energyformsandchanges.intro.model.HorizontalSurface;
//import edu.colorado.phet.energyformsandchanges.intro.model.TemperatureAndColor;
//import edu.colorado.phet.energyformsandchanges.intro.model.UserMovableModelElement;
//
///**
// * Basic thermometer that senses temperature, has a position. The thermometer
// * has only a point and a temperature in the model.  Its visual representation
// * is left entirely to the view.
// *
// * @author John Blanco
// */
//public class Thermometer extends UserMovableModelElement {
//
//  public final Property<Double> sensedTemperature = new Property<Double>( EFACConstants.ROOM_TEMPERATURE );
//  public final Property<Color> sensedElementColor = new Property<Color>( PhetColorScheme.RED_COLORBLIND );
//
//  // Property that is used primarily to control visibility in the view.
//  public final BooleanProperty active;
//
//  /**
//   * Constructor.
//   */
//  public Thermometer( ConstantDtClock clock, final ITemperatureModel model, Vector2D initialPosition, boolean initiallyActive ) {
//    super( initialPosition );
//    active = new BooleanProperty( initiallyActive );
//
//    // Update the sensed temperature at each clock tick.
//    clock.addClockListener( new ClockAdapter() {
//      @Override public void clockTicked( ClockEvent clockEvent ) {
//        TemperatureAndColor temperatureAndColor = model.getTemperatureAndColorAtLocation( position.get() );
//        sensedTemperature.set( temperatureAndColor.temperature );
//        sensedElementColor.set( temperatureAndColor.color );
//      }
//    } );
//  }
//
//  @Override public void reset() {
//    active.reset();
//  }
//
//  @Override public IUserComponent getUserComponent() {
//    return EnergyFormsAndChangesSimSharing.UserComponents.thermometer;
//  }
//
//  @Override public Property<HorizontalSurface> getBottomSurfaceProperty() {
//    // Doesn't have a bottom surface, and can't be set on anything.
//    return null;
//  }
//}

