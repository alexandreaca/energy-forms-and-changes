// Copyright 2016-2018, University of Colorado Boulder

/**
 * a type that represents a model of a solar panel that converts light energy to electrical energy
 *
 * @author John Blanco
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var EFACA11yStrings = require( 'ENERGY_FORMS_AND_CHANGES/EFACA11yStrings' );
  var EFACConstants = require( 'ENERGY_FORMS_AND_CHANGES/common/EFACConstants' );
  var EFACModelImage = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/EFACModelImage' );
  var Energy = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/Energy' );
  var EnergyChunk = require( 'ENERGY_FORMS_AND_CHANGES/common/model/EnergyChunk' );
  var EnergyChunkPathMover = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/EnergyChunkPathMover' );
  var EnergyConverter = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/EnergyConverter' );
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var EnergyType = require( 'ENERGY_FORMS_AND_CHANGES/common/model/EnergyType' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Shape = require( 'KITE/Shape' );
  var SunEnergySource = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/SunEnergySource' );
  var Vector2 = require( 'DOT/Vector2' );

  // images
  var CONNECTOR = require( 'image!ENERGY_FORMS_AND_CHANGES/connector.png' );
  var SOLAR_PANEL = require( 'image!ENERGY_FORMS_AND_CHANGES/solar_panel.png' );
  var SOLAR_PANEL_GEN = require( 'image!ENERGY_FORMS_AND_CHANGES/solar_panel_gen.png' );
  var SOLAR_PANEL_ICON = require( 'image!ENERGY_FORMS_AND_CHANGES/solar_panel_icon.png' );
  var SOLAR_PANEL_POST_2 = require( 'image!ENERGY_FORMS_AND_CHANGES/solar_panel_post_2.png' );
  var WIRE_BLACK_LEFT = require( 'image!ENERGY_FORMS_AND_CHANGES/wire_black_left.png' );

  // constants
  var SOLAR_PANEL_OFFSET = new Vector2( 0, 0.044 );
  var CONVERTER_IMAGE_OFFSET = new Vector2( 0.015, -0.040 );
  var CONNECTOR_IMAGE_OFFSET = new Vector2( 0.057, -0.04 );

  var SOLAR_PANEL_IMAGE = new EFACModelImage( SOLAR_PANEL, SOLAR_PANEL_OFFSET, { width: 0.15 } );
  var CONVERTER_IMAGE = new EFACModelImage( SOLAR_PANEL_GEN, CONVERTER_IMAGE_OFFSET );
  var CURVED_WIRE_IMAGE = new EFACModelImage( WIRE_BLACK_LEFT, CONVERTER_IMAGE_OFFSET.plusXY( 0.009, 0.024 ) );
  var POST_IMAGE = new EFACModelImage( SOLAR_PANEL_POST_2, CONVERTER_IMAGE_OFFSET.plusXY( 0, 0.04 ) );
  var CONNECTOR_IMAGE = new EFACModelImage( CONNECTOR, CONNECTOR_IMAGE_OFFSET );

  var halfWidth = SOLAR_PANEL_IMAGE.width / 2;
  var halfHeight = SOLAR_PANEL_IMAGE.getHeight() / 2;
  var PANEL_IMAGE_BOUNDS = new Bounds2( -halfWidth, -halfHeight, halfWidth, halfHeight );

  // Constants used for creating the path followed by the energy chunks. Many of these numbers were empirically
  // determined based on the images, and will need to be updated if the images change.
  var OFFSET_TO_CONVERGENCE_POINT = new Vector2( CONVERTER_IMAGE_OFFSET.x, 0.01 );
  var OFFSET_TO_FIRST_CURVE_POINT = new Vector2( CONVERTER_IMAGE_OFFSET.x, -0.025 );
  var OFFSET_TO_SECOND_CURVE_POINT = new Vector2( CONVERTER_IMAGE_OFFSET.x + 0.005, -0.033 );
  var OFFSET_TO_THIRD_CURVE_POINT = new Vector2( CONVERTER_IMAGE_OFFSET.x + 0.015, CONNECTOR_IMAGE_OFFSET.y );
  var OFFSET_TO_CONNECTOR_CENTER = CONNECTOR_IMAGE_OFFSET;

  // Inter chunk spacing time for when the chunks reach the 'convergence point' at the bottom of the solar panel.  It is
  // intended to approximately match the rate at which the sun emits energy chunks.  In seconds.
  var MIN_INTER_CHUNK_TIME = 1 / ( SunEnergySource.ENERGY_CHUNK_EMISSION_PERIOD * SunEnergySource.NUM_EMISSION_SECTORS );

  /**
   * @param {BooleanProperty} energyChunksVisibleProperty
   * @constructor
   */
  function SolarPanel( energyChunksVisibleProperty ) {

    EnergyConverter.call( this, new Image( SOLAR_PANEL_ICON ) );

    // @public {string} - a11y name
    this.a11yName = EFACA11yStrings.solarPanel.value;

    // @private
    this.energyChunkMovers = [];
    this.latestChunkArrivalTime = 0;
    this.energyOutputRate = 0;
    this.energyChunksVisibleProperty = energyChunksVisibleProperty;

    // @private - counter to mimic function of IClock in original Java code
    this.simulationTime = 0;

    var zoneWidth = 0.7 * PANEL_IMAGE_BOUNDS.width;
    var minX = PANEL_IMAGE_BOUNDS.minX;
    var minY = PANEL_IMAGE_BOUNDS.minY;
    var maxX = PANEL_IMAGE_BOUNDS.maxX;
    var maxY = PANEL_IMAGE_BOUNDS.maxY;

    // @private - shape used when determining if a given chunk of light energy should be absorbed
    this.absorptionShape = new Shape()
      .moveTo( maxX - zoneWidth, maxY )
      .lineTo( maxX, maxY )
      .lineTo( minX + zoneWidth, minY )
      .lineTo( minX, minY )
      .close();
  }

  energyFormsAndChanges.register( 'SolarPanel', SolarPanel );

  return inherit( EnergyConverter, SolarPanel, {

    /**
     * @param  {number} dt - time step, in seconds
     * @param  {Energy} incomingEnergy - type, amount, direction of energy
     * @returns {Energy}
     * @override
     * @public
     */
    step: function( dt, incomingEnergy ) {

      var self = this;

      if ( this.activeProperty.value ) {

        // handle any incoming energy chunks
        if ( this.incomingEnergyChunks.length > 0 ) {

          this.incomingEnergyChunks.forEach( function( incomingChunk ) {

            if ( incomingChunk.energyTypeProperty.get() === EnergyType.LIGHT ) {

              // convert this chunk to electrical energy and add it to the list of energy chunks being managed
              incomingChunk.energyTypeProperty.set( EnergyType.ELECTRICAL );
              self.energyChunkList.push( incomingChunk );

              // add a "mover" that will move this energy chunk to the bottom of the solar panel
              self.energyChunkMovers.push( new EnergyChunkPathMover(
                incomingChunk,
                self.createPathToPanelBottom( self.positionProperty.get() ),
                self.chooseChunkSpeedOnPanel( incomingChunk ) )
              );
            }

            // by design, this shouldn't happen, so raise an error if it does
            else {
              assert && assert(
                false,
                'Encountered energy chunk with unexpected type: ' + incomingChunk.energyTypeProperty.get()
              );
            }
          } );

          this.incomingEnergyChunks.length = 0;
        }

        // move the energy chunks that are currently under management
        this.moveEnergyChunks( dt );
      }

      // produce the appropriate amount of energy
      var energyProduced = 0;
      if ( this.activeProperty.value && incomingEnergy.type === EnergyType.LIGHT ) {
        energyProduced = incomingEnergy.amount; // Perfectly efficient conversion. We should patent this.
      }
      this.energyOutputRate = energyProduced / dt;

      this.simulationTime += dt;

      return new Energy( EnergyType.ELECTRICAL, energyProduced, 0 );
    },

    /**
     * update energy chunk positions
     * @param  {number} dt - time step, in seconds
     * @private
     */
    moveEnergyChunks: function( dt ) {

      // iterate over a copy to mutate original without problems
      var movers = _.clone( this.energyChunkMovers );

      var self = this;

      movers.forEach( function( mover ) {

        mover.moveAlongPath( dt );

        if ( mover.pathFullyTraversed ) {

          _.pull( self.energyChunkMovers, mover );

          // energy chunk has reached the bottom of the panel and now needs to move through the converter
          if ( mover.energyChunk.positionProperty.value.equals( self.position.plus( OFFSET_TO_CONVERGENCE_POINT ) ) ) {
            self.energyChunkMovers.push( new EnergyChunkPathMover( mover.energyChunk,
              self.createPathThroughConverter( self.position ),
              EFACConstants.ENERGY_CHUNK_VELOCITY ) );
          }

          // the energy chunk has traveled across the panel and through the converter, so pass it off to the next
          // element in the system
          else {
            self.outgoingEnergyChunks.push( mover.energyChunk );
            self.energyChunkList.remove( mover.energyChunk );
          }
        }
      } );
    },

    /**
     * @param {Energy} incomingEnergy
     * @public
     * @override
     */
    preLoadEnergyChunks: function( incomingEnergy ) {

      this.clearEnergyChunks();

      if ( incomingEnergy.amount === 0 || incomingEnergy.type !== EnergyType.LIGHT ) {

        // no energy chunk pre-loading needed
        return;
      }

      var absorptionBounds = this.getAbsorptionShape().bounds;
      var lowerLeftOfPanel = new Vector2( absorptionBounds.minX, absorptionBounds.minY );
      var upperRightOfPanel = new Vector2( absorptionBounds.maxX, absorptionBounds.maxY );
      var crossLineAngle = upperRightOfPanel.minus( lowerLeftOfPanel ).angle();
      var crossLineLength = lowerLeftOfPanel.distance( upperRightOfPanel );
      var dt = 1 / EFACConstants.FRAMES_PER_SECOND;
      var energySinceLastChunk = EFACConstants.ENERGY_PER_CHUNK * 0.99;
      var preLoadComplete = false;

      // simulate energy chunks moving through the system
      while ( !preLoadComplete ) {

        // full energy rate generates too many chunks, so an adjustment factor is used
        energySinceLastChunk += incomingEnergy.amount * dt * 0.4;

        // determine if time to add a new chunk
        if ( energySinceLastChunk >= EFACConstants.ENERGY_PER_CHUNK ) {
          var initialPosition;
          if ( this.energyChunkList.length === 0 ) {

            // for predictability of the algorithm, add the first chunk to the center of the panel
            initialPosition = lowerLeftOfPanel.plus(
              new Vector2( crossLineLength * 0.5, 0 ).rotated( crossLineAngle )
            );
          } else {

            // choose a random location along the center portion of the cross line
            initialPosition = lowerLeftOfPanel.plus(
              new Vector2( crossLineLength * (0.5 * phet.joist.random.nextDouble() + 0.25), 0 ).rotated( crossLineAngle ) );
          }

          var newEnergyChunk = new EnergyChunk(
            EnergyType.ELECTRICAL,
            initialPosition,
            this.energyChunksVisibleProperty
          );

          this.energyChunkList.push( newEnergyChunk );

          // add a "mover" that will move this energy chunk to the bottom of the solar panel
          this.energyChunkMovers.push( new EnergyChunkPathMover( newEnergyChunk,
            this.createPathToPanelBottom( this.positionProperty.get() ),
            this.chooseChunkVelocityOnPanel( newEnergyChunk ) )
          );

          // update energy since last chunk
          energySinceLastChunk -= EFACConstants.ENERGY_PER_CHUNK;
        }

        this.moveEnergyChunks( dt );

        if ( this.outgoingEnergyChunks.length > 0 ) {

          // an energy chunk has made it all the way through the system, which completes the pre-load
          preLoadComplete = true;
        }
      }
    },

    /**
     * @returns {Energy} type, amount, direction of emitted energy
     */
    getEnergyOutputRate: function() {
      return new Energy( EnergyType.ELECTRICAL, this.energyOutputRate, 0 );
    },

    /**
     * choose speed of chunk on panel such that it won't clump up with other chunks
     * @param  {EnergyChunk} incomingEnergyChunk
     * @returns {number} speed
     * @private
     */
    chooseChunkSpeedOnPanel: function( incomingEnergyChunk ) {

      // start with default speed
      var chunkSpeed = EFACConstants.ENERGY_CHUNK_VELOCITY;

      // count the number of chunks currently on the panel
      var numChunksOnPanel = 0;

      var self = this;

      this.energyChunkMovers.forEach( function( mover ) {
        if ( mover.getFinalDestination().equals( self.position.plus( OFFSET_TO_CONVERGENCE_POINT ) ) ) {
          numChunksOnPanel++;
        }
      } );

      // compute the projected time of arrival at the convergence point
      var distanceToConvergencePoint =
        incomingEnergyChunk.positionProperty.get().distance( this.position.plus( OFFSET_TO_CONVERGENCE_POINT ) );
      var travelTime = distanceToConvergencePoint / chunkSpeed;
      var projectedArrivalTime = this.simulationTime + travelTime;

      // calculate the minimum spacing based on the number of chunks on the panel
      var minArrivalTimeSpacing = numChunksOnPanel <= 3 ?
        MIN_INTER_CHUNK_TIME :
        MIN_INTER_CHUNK_TIME / ( numChunksOnPanel - 2 );

      // if the projected arrival time is too close to the current last chunk, slow down so that the minimum spacing is
      // maintained
      if ( this.latestChunkArrivalTime + minArrivalTimeSpacing > projectedArrivalTime ) {
        projectedArrivalTime = this.latestChunkArrivalTime + minArrivalTimeSpacing;
      }

      this.latestChunkArrivalTime = projectedArrivalTime;

      return distanceToConvergencePoint / ( projectedArrivalTime - this.simulationTime );
    },

    /**
     * @public
     * @override
     */
    clearEnergyChunks: function() {
      EnergyConverter.prototype.clearEnergyChunks.call( this );
      this.energyChunkMovers.length = 0;
      this.latestChunkArrivalTime = 0;
    },

    /**
     * @param {Vector2} panelPosition
     * @private
     */
    createPathToPanelBottom: function( panelPosition ) {
      var path = [];
      path.push( panelPosition.plus( OFFSET_TO_CONVERGENCE_POINT ) );
      return path;
    },

    /**
     * @param {Vector2} panelPosition
     * @private
     */
    createPathThroughConverter: function( panelPosition ) {
      var path = [];
      path.push( panelPosition.plus( OFFSET_TO_FIRST_CURVE_POINT ) );
      path.push( panelPosition.plus( OFFSET_TO_SECOND_CURVE_POINT ) );
      path.push( panelPosition.plus( OFFSET_TO_THIRD_CURVE_POINT ) );
      path.push( panelPosition.plus( OFFSET_TO_CONNECTOR_CENTER ) );
      return path;
    },

    /**
     * get the shape of the area where light can be absorbed
     * @return {Shape}
     */
    getAbsorptionShape: function() {
      return this.absorptionShape;
    }

  }, {

    // statics
    CURVED_WIRE_IMAGE: CURVED_WIRE_IMAGE,
    POST_IMAGE: POST_IMAGE,
    SOLAR_PANEL_IMAGE: SOLAR_PANEL_IMAGE,
    CONVERTER_IMAGE: CONVERTER_IMAGE,
    CONNECTOR_IMAGE: CONNECTOR_IMAGE
  } );
} );

