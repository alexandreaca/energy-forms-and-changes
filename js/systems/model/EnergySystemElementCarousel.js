// Copyright 2016-2020, University of Colorado Boulder

// Note: This file is a mashup of two ported Java files: Carousel and
// EnergySystemElementCarousel. Carousel.java was not ported to avoid confusion
// with the PhET Sun Carousel.js UI component.

/**
 * This type implements a model-based carousel for positionable model elements. Model elements are positioned based
 * on the current selection, and an API is provided that allows clients to change those selection. Changes to the
 * selected element are animated.
 *
 * @author John Blanco
 * @author Andrew Adare
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Easing = require( 'TWIXT/Easing' );
  const energyFormsAndChanges = require( 'ENERGY_FORMS_AND_CHANGES/energyFormsAndChanges' );
  const EnumerationProperty = require( 'AXON/EnumerationProperty' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Utils = require( 'DOT/Utils' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const TRANSITION_DURATION = 0.75; // in seconds

  class EnergySystemElementCarousel {

    /**
     * @param {EnergySystemElement[]} elements - array of elements to add to this carousel
     * @param {Enumeration} elementNames - the names of the elements being added
     * @param {Vector2} selectedElementPosition - location where the selected model element should be
     * @param {Vector2} offsetBetweenElements - offset between elements in the carousel
     * @param {Tandem} tandem
     */
    constructor( elements, elementNames, selectedElementPosition, offsetBetweenElements, tandem ) {

      // @public (read-only) {Vector2} - the position in model space where the currently selected element should be
      this.selectedElementPosition = selectedElementPosition;

      // @private {Vector2} - the offset between elements whose position is managed by this carousel
      this.offsetBetweenElements = offsetBetweenElements;

      // @public (read-only) {EnergySystemElement[]} - list of the elements whose position is managed by this carousel
      this.managedElements = [];

      // @public (read-only) {Enumeration} - names that correspond to each element
      this.elementNames = elementNames;

      // add each element to the array of managed elements
      elements.forEach( element => this.add( element ) );

      /**
       * calculates the valid target indices for this carousel
       *
       * @param {number} numberOfElements
       * @returns {number[]}
       */
      const getValidTargetIndices = numberOfElements => {
        const validTargetIndices = [];
        _.times( numberOfElements, index => {
          validTargetIndices.push( index );
        } );
        return validTargetIndices;
      };

      assert && assert( this.managedElements.length === this.elementNames.VALUES.length,
        'The number of managed elements must equal the number of element name enumeration values' );

      // @public (read-only) {NumberProperty} - indicates which element on the carousel is currently selected by index.
      // this index is the ground truth for managing the currently selected element, but is controlled by
      // targetElementNameProperty below.
      this.targetIndexProperty = new NumberProperty( 0, {
        validValues: getValidTargetIndices( this.managedElements.length )
      } );

      // @public (read-only) {EnumerationProperty} - this is for phet-io Studio so that Clients can select an element
      // by name instead of index
      this.targetElementNameProperty = new EnumerationProperty( elementNames, elementNames.VALUES[ 0 ], {
        tandem: tandem.createTandem( 'targetElementNameProperty' ),
        phetioDocumentation: 'indicates which element on the carousel is currently selected by name'
      } );

      // @public (read-only) {BooleanProperty}
      this.animationInProgressProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'animationInProgressProperty' ),
        phetioReadyOnly: true,
        phetioDocumentation: 'indicates whether an animation from one carousel position to another is in progress'
      } );

      // @private - variables needed to manage carousel transitions
      this.elapsedTransitionTime = 0; // in seconds
      this.currentCarouselOffset = new Vector2( 0, 0 ); // in meters
      this.initialCarouselOffset = new Vector2( 0, 0 ); // in meters

      // set the variables needed for animation each time the target changes
      this.targetElementNameProperty.lazyLink( targetElement => {

        // update the target index
        this.targetIndexProperty.set( _.findIndex( this.elementNames.VALUES, targetElement ) );

        // set vars for the transition
        this.elapsedTransitionTime = 0;
        this.initialCarouselOffset = this.currentCarouselOffset;
        this.animationInProgressProperty.set( true );
      } );

      // activate and deactivate energy system elements as they come into the center location
      this.animationInProgressProperty.lazyLink( animationInProgress => {
        if ( animationInProgress ) {
          this.managedElements.forEach( element => {
            element.deactivate();
          } );
        }
        else {
          this.getElement( this.targetIndexProperty.value ).activate();
        }
      } );

      // Don't animate the system elements when setting state for better user experience when launching the sim.
      _.hasIn( window, 'phet.phetIo.phetioEngine' ) && phet.phetIo.phetioEngine.phetioStateEngine.stateSetEmitter.addListener( () => {
        this.elapsedTransitionTime = 1;
      } );
    }

    /**
     * add element to list of managed elements
     * @param {EnergySystemElement} element - energy system element to be added to carousel
     * @private
     */
    add( element ) {

      // set the element's position to be at the end of the carousel
      if ( this.managedElements.length === 0 ) {
        element.positionProperty.set( this.selectedElementPosition );
      }
      else {
        const lastElement = this.managedElements[ this.managedElements.length - 1 ];
        element.positionProperty.set( lastElement.positionProperty.value.plus( this.offsetBetweenElements ) );
      }

      // add element to the list of managed elements
      this.managedElements.push( element );

      // update opacities
      this.updateManagedElementOpacities();
    }

    /**
     * get an element from carousel by index
     * @param  {number} index Requested position in array of EnergySystemElements
     * @returns {EnergySystemElement}
     * @public
     */
    getElement( index ) {
      assert && assert( index < this.managedElements.length, `carousel index out of range: ${index}` );
      return this.managedElements[ index ];
    }

    /**
     * get the currently selected element from carousel
     * @returns {EnergySystemElement|null}
     * @public
     */
    getSelectedElement() {
      const i = this.targetIndexProperty.get();
      if ( i < this.managedElements.length ) {
        return this.managedElements[ i ];
      }
      return null;
    }

    /**
     * step this model element
     * @param {number} dt - time step, in seconds
     * @public
     */
    step( dt ) {
      if ( !this.atTargetPosition() ) {
        this.elapsedTransitionTime += dt;
        const targetCarouselOffset = this.offsetBetweenElements.times( -this.targetIndexProperty.get() );
        const totalTravelVector = targetCarouselOffset.minus( this.initialCarouselOffset );
        const transitionProportion = Utils.clamp( this.elapsedTransitionTime / TRANSITION_DURATION, 0, 1 );
        this.currentCarouselOffset =
          this.initialCarouselOffset.plus( totalTravelVector.times( Easing.CUBIC_IN_OUT.value( transitionProportion ) ) );
        this.updateManagedElementPositions();

        if ( transitionProportion === 1 ) {
          this.currentCarouselOffset = targetCarouselOffset;
        }

        if ( this.currentCarouselOffset === targetCarouselOffset ) {
          this.animationInProgressProperty.set( false );
        }
        this.updateManagedElementOpacities();
      }
    }

    /**
     * sets the position in model space of each element based on the state of the carousel
     * @private
     */
    updateManagedElementPositions() {
      for ( let i = 0; i < this.managedElements.length; i++ ) {
        let position = this.selectedElementPosition.plus( this.offsetBetweenElements.times( i ) );
        position = position.plus( this.currentCarouselOffset );
        this.managedElements[ i ].positionProperty.set( position );
      }
    }

    /**
     * sets the opacity of each element based on the state of the carousel. elements fade out as they get farther from
     * the active, selected position
     * @private
     */
    updateManagedElementOpacities() {
      this.managedElements.forEach( managedElement => {
        const distanceToSelection = managedElement.positionProperty.value.distance( this.selectedElementPosition );
        const opacity = Utils.clamp( 1 - ( distanceToSelection / this.offsetBetweenElements.magnitude ), 0, 1 );
        managedElement.opacityProperty.set( opacity );
      } );
    }

    /**
     * whether the current selected element is in its destination spot
     * @private
     * @returns {boolean}
     */
    atTargetPosition() {
      const targetCarouselOffset = this.offsetBetweenElements.times( -this.targetIndexProperty.value );
      return this.currentCarouselOffset.equals( targetCarouselOffset );
    }
  }

  return energyFormsAndChanges.register( 'EnergySystemElementCarousel', EnergySystemElementCarousel );
} );
