Smalltalk current createPackage: 'Cards' properties: #{}!
Object subclass: #Card
	instanceVariableNames: 'element template values'
	category: 'Cards'!
!Card commentStamp!
A `Card` is like a widget. is a random number generator and is implemented as a trivial wrapper around javascript `Math.random()` and is used like this:

	Card new appendToJQ: 'body'!

!Card methodsFor: 'accessing'!

template
	^ template ifNil: [ template := Handlebars compile: self templateString ]
!

element
	^ element ifNil: [ element := jQuery value: 'body' ]
!

values
	^ values ifNil: [ values := #{} ]
! !

!Card methodsFor: 'adding'!

appendToJQ: aJQSelectorString
	element := jQuery value: aJQSelectorString
! !

!Card methodsFor: 'rendering'!

render
	self renderTemplate
!

renderTemplate
	self element append: (self template value: self values).
! !

!Card methodsFor: 'templates'!

templateString
	^ '<h1>{{title}}</h1>'
! !

!Card class methodsFor: 'instance creation'!

newOnJQ: aJQuerySelector
	^ self new
		appendToJQ: aJQuerySelector;
		yourself
!

renderOnJQ: aJQuerySelector
	^ (self newOnJQ: aJQuerySelector)
		render;
		yourself
! !

Object subclass: #Template
	instanceVariableNames: 'source'
	category: 'Cards'!

!Template methodsFor: 'initialization'!

initializeFromString: aString
	source := aString
! !

!Template methodsFor: 'rendering'!

render
	^ self handlebars value: #{ 'title' -> 'Foobar' }
! !

!Template class methodsFor: 'instance creation'!

newFromString: aString
	^ self basicNew
		initializeFromString: aString;
		yourself
! !

