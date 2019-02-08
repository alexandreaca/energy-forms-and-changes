// Copyright 2014-2019, University of Colorado Boulder

/**
 * drag handler for objects that can be moved by the user, used to constrain objects to the play area and to prevent
 * them from being dragged through one another
 */
define( require => {
  'use strict';

  const energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const Vector2 = require( 'DOT/Vector2' );

  class ThermalElementDragHandler extends DragListener {

    /**
     * @param {UserMovableModelElement} modelElement
     * @param {Node} screenViewChildNode - the node that will be used to convert pointer positions to global coordinates
     * @param {ModelViewTransform2} modelViewTransform
     * @param {function} constrainPosition
     * @param {BooleanProperty} simIsPlayingProperty
     */
    constructor(
      modelElement,
      screenViewChildNode,
      modelViewTransform,
      constrainPosition,
      simIsPlayingProperty
    ) {

      const dragStartOffset = new Vector2();
      let currentTarget = null;

      super( {

        // allow moving a finger (touch) across a screenViewChildNode to pick it up
        allowTouchSnag: true,

        start: event => {

          // make sure the sim is playing when an element is grabbed - this will resume the sim if it is paused
          simIsPlayingProperty.value = true;
          modelElement.userControlledProperty.set( true );
          const modelElementViewPosition = modelViewTransform.modelToViewPosition( modelElement.positionProperty.get() );
          currentTarget = event.currentTarget;
          const dragStartPosition = currentTarget.globalToParentPoint( event.pointer.point );
          dragStartOffset.setXY(
            dragStartPosition.x - modelElementViewPosition.x,
            dragStartPosition.y - modelElementViewPosition.y
          );
        },

        drag: event => {
          const dragPosition = currentTarget.globalToParentPoint( event.pointer.point );
          const modelElementViewPosition = dragPosition.minus( dragStartOffset );
          const modelElementPosition = modelViewTransform.viewToModelPosition( modelElementViewPosition );
          modelElement.positionProperty.set( constrainPosition( modelElement, modelElementPosition ) );
        },

        end: () => {
          modelElement.userControlledProperty.set( false );
          currentTarget = null;
        }
      } );
    }
  }

  return energyFormsAndChanges.register( 'ThermalElementDragHandler', ThermalElementDragHandler );
} );
