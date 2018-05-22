// Copyright 2016, University of Colorado Boulder

/**
 * a Scenery Node representing the beaker heater in the view
 *
 * @author John Blanco
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // modules
  var BeakerHeater = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/model/BeakerHeater' );
  var BeakerView = require( 'ENERGY_FORMS_AND_CHANGES/common/view/BeakerView' );
  var MoveFadeModelElementNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/MoveFadeModelElementNode' );
  var EFACModelImageNode = require( 'ENERGY_FORMS_AND_CHANGES/energy-systems/view/EFACModelImageNode' );
  var EnergyChunkLayer = require( 'ENERGY_FORMS_AND_CHANGES/common/view/EnergyChunkLayer' );
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var TemperatureAndColorSensorNode = require( 'ENERGY_FORMS_AND_CHANGES/common/view/TemperatureAndColorSensorNode' );
  var Vector2 = require( 'DOT/Vector2' );

  // TODO: Make this a query parameter
  var DEBUG = false;

  /**
   * @param {BeakerHeater} beakerHeater
   * @param {Property.<boolean>} energyChunksVisibleProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function BeakerHeaterNode( beakerHeater, energyChunksVisibleProperty, modelViewTransform ) {

    MoveFadeModelElementNode.call( this, beakerHeater, modelViewTransform );

    var energizedCoil = new EFACModelImageNode( BeakerHeater.HEATER_ELEMENT_ON_IMAGE, modelViewTransform );

    // add the images that are used to depict this element along with the layer that will contain the energy chunks
    this.addChild( new EFACModelImageNode( BeakerHeater.WIRE_STRAIGHT_IMAGE, modelViewTransform ) );
    this.addChild( new EFACModelImageNode( BeakerHeater.WIRE_CURVE_IMAGE, modelViewTransform ) );
    this.addChild( new EFACModelImageNode( BeakerHeater.ELEMENT_BASE_BACK_IMAGE, modelViewTransform ) );
    this.addChild( new EFACModelImageNode( BeakerHeater.HEATER_ELEMENT_OFF_IMAGE, modelViewTransform ) );
    this.addChild( energizedCoil );
    this.addChild( new EnergyChunkLayer( beakerHeater.energyChunkList, beakerHeater.positionProperty, modelViewTransform ) );
    this.addChild( new EFACModelImageNode( BeakerHeater.ELEMENT_BASE_FRONT_IMAGE, modelViewTransform ) );

    // Add the beaker.  A compensating MVT is needed because the beaker node is being added as a child of this node,
    // but wants to set its own offset in model space.
    var scale = modelViewTransform.matrix.scaleVector;
    var offset = modelViewTransform.modelToViewDelta( beakerHeater.positionProperty.value ).negated();
    var beakerMvt = ModelViewTransform2.createOffsetXYScaleMapping( offset, scale.x, -scale.y );

    // @public (read-only) {BeakerView}
    this.beakerView = new BeakerView( beakerHeater.beaker, energyChunksVisibleProperty, beakerMvt );

    this.addChild( this.beakerView.backNode );
    this.addChild( new EnergyChunkLayer(
      beakerHeater.radiatedEnergyChunkList,
      beakerHeater.beaker.positionProperty,
      modelViewTransform
    ) );
    this.addChild( this.beakerView.frontNode );

    // Add the thermometer that will indicate the beaker water temperature.  Since the position of the thermometer is
    // relative to the beaker heater, the model view transform must be compensated
    var temperatureAndColorSensorNode = new TemperatureAndColorSensorNode( beakerHeater.temperatureAndColorSensor, {
      modelViewTransform: ModelViewTransform2.createSinglePointScaleInvertedYMapping(
        Vector2.ZERO,
        Vector2.ZERO,
        modelViewTransform.getMatrix().getScaleVector().x
      )
    } );
    this.addChild( temperatureAndColorSensorNode );

    if ( DEBUG ) {
      var Rectangle = require( 'SCENERY/nodes/Rectangle' );
      var sb = beakerMvt.modelToViewBounds( beakerHeater.beaker.getSliceBounds() );
      var bb = beakerMvt.modelToViewBounds( beakerHeater.beaker.getBounds() );
      var rect = beakerMvt.modelToViewShape( beakerHeater.beaker.getRect() );
      this.addChild( new Rectangle( sb.x, sb.y, sb.width, sb.height, { stroke: 'blue' } ) ); // slice bounds
      this.addChild( new Rectangle( bb.x, bb.y, bb.width, bb.height, { stroke: 'red', lineWidth: 4 } ) ); // beaker bounds
      this.addChild( new Rectangle( rect.x, rect.y, rect.width, rect.height, { stroke: 'lime' } ) ); // from getRect()

      // var beakerXY = modelViewTransform.modelToViewPosition(beakerHeater.beaker.position);
      var beakerXY = beakerMvt.modelToViewPosition( beakerHeater.beaker.position );
      var Circle = require( 'SCENERY/nodes/Circle' );
      this.addChild( new Circle( 10, {
        centerX: beakerXY.x,
        centerY: beakerXY.y,
        fill: 'lime'
      } ) );
    }

    // update the transparency of the hot element to make the dark element appear to heat up
    beakerHeater.heatProportionProperty.link( function( litProportion ) {
      energizedCoil.opacity = litProportion;
    } );
  }

  energyFormsAndChanges.register( 'BeakerHeaterNode', BeakerHeaterNode );

  return inherit( MoveFadeModelElementNode, BeakerHeaterNode );
} );
