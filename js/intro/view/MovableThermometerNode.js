// Copyright 2014-2015, University of Colorado Boulder

/**
 * Thermometer node that the user can drag around and that updates its
 * temperature reading based on the reading from the supplied model element.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  //modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'DOT/Rectangle' );
  var SensingThermometerNode = require( 'ENERGY_FORMS_AND_CHANGES/intro/view/SensingThermometerNode' );
  var ThermalElementDragHandler = require( 'ENERGY_FORMS_AND_CHANGES/intro/view/ThermalElementDragHandler' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Constructor for the Movable Thermometer Node.
   *
   * @param {Thermometer} thermometer
   * @param {Dimension2} stageSize
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function MovableThermometerNode( thermometer, stageSize, modelViewTransform ) {

    var self = this;
    SensingThermometerNode.call( this, thermometer );
    // Update the offset if and when the model position changes.
    thermometer.positionProperty.link( function( position ) {
      self.translation = new Vector2(
        modelViewTransform.modelToViewX( position.x ),
        modelViewTransform.modelToViewY( position.y ) - ( self.height / 2 + self.triangleTipOffset.height ) );
    } );

    // Add the drag handler.
    var offsetPosToCenter = new Vector2(
      this.centerX - modelViewTransform.modelToViewX( thermometer.position.x ),
      this.centerY - modelViewTransform.modelToViewY( thermometer.position.y ) );
    this.addInputListener( new ThermalElementDragHandler( thermometer, this, modelViewTransform,
      new ThermometerLocationConstraint( modelViewTransform, this, stageSize, offsetPosToCenter ) ) );

  }

  // Class that constrains the valid locations for a thermometer.
  function ThermometerLocationConstraint( modelViewTransform, node, stageSize, offsetPosToNodeCenter ) {
    var nodeSize = new Dimension2( node.width, node.height );

    // Calculate the bounds based on the stage size of the canvas and the nature of the provided node.
    var boundsMinX = modelViewTransform.viewToModelX( nodeSize.width / 2 - offsetPosToNodeCenter.x );
    var boundsMaxX = modelViewTransform.viewToModelX( stageSize.width - nodeSize.width / 2 - offsetPosToNodeCenter.x );
    var boundsMinY = modelViewTransform.viewToModelY( stageSize.height - offsetPosToNodeCenter.y - nodeSize.height / 2 );

    var boundsMaxY = modelViewTransform.viewToModelY( -offsetPosToNodeCenter.y + nodeSize.height / 2 );
    this.modelBounds = new Rectangle( boundsMinX, boundsMinY, boundsMaxX - boundsMinX, boundsMaxY - boundsMinY );
  }

  inherit( Object, ThermometerLocationConstraint, {

    // Gets applied as a constraint in ThermalElementDragHandler
    apply: function( proposedModelPosition ) {
      // TODO: These bounds calculations for the constraint should be handled by MovableDragHandler.
      var constrainedXPos = Util.clamp( this.modelBounds.minX, proposedModelPosition.x, this.modelBounds.maxX );
      var constrainedYPos = Util.clamp( this.modelBounds.minY, proposedModelPosition.y, this.modelBounds.maxY );
      return new Vector2( constrainedXPos, constrainedYPos );
    }
  } );

  energyFormsAndChanges.register( 'MovableThermometerNode', MovableThermometerNode );

  return inherit( SensingThermometerNode, MovableThermometerNode );
} );
