// Copyright 2002-2015, University of Colorado

/**
 * Class that represents a thermometer that can stick to other elements as they move.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  var Thermometer = require( 'ENERGY_FORMS_AND_CHANGES/common/model/Thermometer' );
  var Vector2 = require( 'DOT/Vector2' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * Convenience class for sticking to model elements.
   *
   * @param {Vector2 || null} follower
   * @constructor
   */
  function ElementFollower( follower ) {

    PropertySet.call( this, {
      follower: follower === null ? new Vector2( 0, 0 ) : follower,
      locationBeingFollowed: null
    } );

    var thisElementFollower = this;
    this.offset = new Vector2( 0, 0 );

    function followerFunction( location ) {
      thisElementFollower.followerProperty = location.plus( thisElementFollower.offset );
    }
  }

  inherit( PropertySet, ElementFollower, {

    followerFunction: function( location ) {
      this.follower = location.plus( this.offset );
    },

    follow: function( locationToFollowProperty ) {
      if ( this.locationBeingFollowed != null ) {
        this.locationBeingFollowed.unlink( this.followerFunction );
      }
      this.offset = this.follower.minus( locationToFollowProperty.get() );
      locationToFollowProperty.link( this.followerFunction );
      this.locationBeingFollowed = locationToFollowProperty.get();
    },

    stopFollowing: function() {
      if ( this.locationBeingFollowed != null ) {
        this.locationBeingFollowedProperty.unlink( this.followerFunction );
        this.locationBeingFollowed = null;
      }
    },

    isFollowing: function() {
      return this.locationBeingFollowed != null;
    }
  } );

  /**
   * Constructor for the ElementFollowingThermometer.
   *
   * @param {EnergyFormsAndChangesIntroModel} model
   * @param {Vector2} initialPosition
   * @param {boolean} initiallyActive
   * @constructor
   */
  function ElementFollowingThermometer( model, initialPosition, initiallyActive ) {

    // call the supertype
    Thermometer.call( this, model, initialPosition, initiallyActive );

    // extend the scope of this
    var thisElementFollowingThermometer = this;

    this.elementFollower = new ElementFollower( this.position );

    // Monitor 'userControlled' in order to see when the user drops this thermometer and determine whether or not it was dropped over anything that
    // it should stick to.
    this.userControlledProperty.link( function( userControlled ) {
      if ( userControlled ) {
        // stop following anything.
        thisElementFollowingThermometer.elementFollower.stopFollowing();
      }
      else {
        // The user has dropped this thermometer. See if it was dropped over something that it should follow.
        for ( var block in model.getBlockList() ) {
          if ( model.getBlockList.hasOwnProperty( block ) ) {
            if ( block.getProjectedShape().containsPoint( thisElementFollowingThermometer.position ) ) {
              // stick to this block.
              thisElementFollowingThermometer.elementFollower.follow( block.position );
            }
          }
        }
        if ( !thisElementFollowingThermometer.elementFollower.isFollowing() && model.beaker.getThermalContactArea().bounds.containsPoint( thisElementFollowingThermometer.position ) ) {
          // Stick to the beaker.
          thisElementFollowingThermometer.elementFollower.follow( model.beaker.position );
        }
      }
    } );
  }

  return inherit( Thermometer, ElementFollowingThermometer, {

    reset: function() {

      this.elementFollower.stopFollowing();
      Thermometer.prototype.reset.call( this );

    }
  } );
} );
