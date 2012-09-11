Smalltalk current createPackage: 'Presentation-MagLev' properties: #{}!
Card subclass: #MagLevPresentation
	instanceVariableNames: 'slides'
	package: 'Presentation-MagLev'!

!MagLevPresentation methodsFor: 'accessing'!

initSlides
	slides := self slideClasses collect: [:each | each on: self]
!

slideClasses
	^ Array new
		add: MagLevIntroSlide;
		yourself
!

slides
	slides ifNil: [self initSlides].
	^ slides.
! !

!MagLevPresentation methodsFor: 'rendering'!

render
	super render.
	self slides do: [ :slide | slide render ]
! !

!MagLevPresentation methodsFor: 'templates'!

templateString
	^'
<div class="reveal">

	<!!-- Used to fade in a background when a specific slide state is reached -->
	<div class="state-background"></div>

	<!!-- Any section element inside of this container is displayed as a slide -->
	<div class="slides"></div>

	<!!-- The navigational controls UI -->
	<aside class="controls">
		<a class="left" href="#">&#x25C4;</a>
		<a class="right" href="#">&#x25BA;</a>
		<a class="up" href="#">&#x25B2;</a>
		<a class="down" href="#">&#x25BC;</a>
	</aside>

	<!!-- Presentation progress bar -->
	<div class="progress"><span></span></div>

</div>
'
! !

!MagLevPresentation class methodsFor: 'class initialization'!

initialize
	Browser openOn: self.
	self
		renderOnJQ: 'body';
		initializeRevealJS
!

initializeRevealJS
	"See https://github.com/hakimel/reveal.js#configuration for a full list of configuration options"
	Reveal initialize: #{
		'controls' -> true.
		'keyboard' -> false.
		'progress' -> true.
		'history' -> true }
! !

Card subclass: #SlideCard
	instanceVariableNames: 'presentation'
	package: 'Presentation-MagLev'!

!SlideCard methodsFor: 'accessing'!

presentation
	^presentation
!

presentation: aPresentation
	presentation := aPresentation
! !

!SlideCard methodsFor: 'rendering'!

templateString
	^ '
<section>
	<h1>{{title}}</h1>
</section>
'
! !

!SlideCard class methodsFor: 'instance creation'!

on: aPresentation
	^self new
		presentation: aPresentation;
		appendToJQ: '.slides';
		yourself
! !

SlideCard subclass: #MagLevIntroSlide
	instanceVariableNames: ''
	package: 'Presentation-MagLev'!

!MagLevIntroSlide methodsFor: 'accessing'!

values
	^ #{ 'title' -> 'Data Migrations with MagLev' }
! !

SlideCard subclass: #WhatIsMagLevSlide
	instanceVariableNames: ''
	package: 'Presentation-MagLev'!

