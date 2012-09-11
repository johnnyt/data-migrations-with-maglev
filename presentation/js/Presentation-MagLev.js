smalltalk.addPackage('Presentation-MagLev', {});
smalltalk.addClass('MagLevPresentation', smalltalk.Card, ['slides'], 'Presentation-MagLev');
smalltalk.addMethod(
"_initSlides",
smalltalk.method({
selector: "initSlides",
category: 'accessing',
fn: function (){
var self=this;
(self['@slides']=smalltalk.send(smalltalk.send(self, "_slideClasses", []), "_collect_", [(function(each){return smalltalk.send(each, "_on_", [self]);})]));
return self;},
args: [],
source: "initSlides\x0a\x09slides := self slideClasses collect: [:each | each on: self]",
messageSends: ["collect:", "slideClasses", "on:"],
referencedClasses: []
}),
smalltalk.MagLevPresentation);

smalltalk.addMethod(
"_render",
smalltalk.method({
selector: "render",
category: 'rendering',
fn: function (){
var self=this;
smalltalk.send(self, "_render", [], smalltalk.Card);
smalltalk.send(smalltalk.send(self, "_slides", []), "_do_", [(function(slide){return smalltalk.send(slide, "_render", []);})]);
return self;},
args: [],
source: "render\x0a\x09super render.\x0a\x09self slides do: [ :slide | slide render ]",
messageSends: ["render", "do:", "slides"],
referencedClasses: []
}),
smalltalk.MagLevPresentation);

smalltalk.addMethod(
"_slideClasses",
smalltalk.method({
selector: "slideClasses",
category: 'accessing',
fn: function (){
var self=this;
return (function($rec){smalltalk.send($rec, "_add_", [(smalltalk.MagLevIntroSlide || MagLevIntroSlide)]);return smalltalk.send($rec, "_yourself", []);})(smalltalk.send((smalltalk.Array || Array), "_new", []));
return self;},
args: [],
source: "slideClasses\x0a\x09^ Array new\x0a\x09\x09add: MagLevIntroSlide;\x0a\x09\x09yourself",
messageSends: ["add:", "yourself", "new"],
referencedClasses: ["MagLevIntroSlide", "Array"]
}),
smalltalk.MagLevPresentation);

smalltalk.addMethod(
"_slides",
smalltalk.method({
selector: "slides",
category: 'accessing',
fn: function (){
var self=this;
(($receiver = self['@slides']) == nil || $receiver == undefined) ? (function(){return smalltalk.send(self, "_initSlides", []);})() : $receiver;
return self['@slides'];
return self;},
args: [],
source: "slides\x0a\x09slides ifNil: [self initSlides].\x0a\x09^ slides.",
messageSends: ["ifNil:", "initSlides"],
referencedClasses: []
}),
smalltalk.MagLevPresentation);

smalltalk.addMethod(
"_templateString",
smalltalk.method({
selector: "templateString",
category: 'templates',
fn: function (){
var self=this;
return unescape("%0A%3Cdiv%20class%3D%22reveal%22%3E%0A%0A%09%3C%21--%20Used%20to%20fade%20in%20a%20background%20when%20a%20specific%20slide%20state%20is%20reached%20--%3E%0A%09%3Cdiv%20class%3D%22state-background%22%3E%3C/div%3E%0A%0A%09%3C%21--%20Any%20section%20element%20inside%20of%20this%20container%20is%20displayed%20as%20a%20slide%20--%3E%0A%09%3Cdiv%20class%3D%22slides%22%3E%3C/div%3E%0A%0A%09%3C%21--%20The%20navigational%20controls%20UI%20--%3E%0A%09%3Caside%20class%3D%22controls%22%3E%0A%09%09%3Ca%20class%3D%22left%22%20href%3D%22%23%22%3E%26%23x25C4%3B%3C/a%3E%0A%09%09%3Ca%20class%3D%22right%22%20href%3D%22%23%22%3E%26%23x25BA%3B%3C/a%3E%0A%09%09%3Ca%20class%3D%22up%22%20href%3D%22%23%22%3E%26%23x25B2%3B%3C/a%3E%0A%09%09%3Ca%20class%3D%22down%22%20href%3D%22%23%22%3E%26%23x25BC%3B%3C/a%3E%0A%09%3C/aside%3E%0A%0A%09%3C%21--%20Presentation%20progress%20bar%20--%3E%0A%09%3Cdiv%20class%3D%22progress%22%3E%3Cspan%3E%3C/span%3E%3C/div%3E%0A%0A%3C/div%3E%0A");
return self;},
args: [],
source: "templateString\x0a\x09^'\x0a<div class=\x22reveal\x22>\x0a\x0a\x09<!-- Used to fade in a background when a specific slide state is reached -->\x0a\x09<div class=\x22state-background\x22></div>\x0a\x0a\x09<!-- Any section element inside of this container is displayed as a slide -->\x0a\x09<div class=\x22slides\x22></div>\x0a\x0a\x09<!-- The navigational controls UI -->\x0a\x09<aside class=\x22controls\x22>\x0a\x09\x09<a class=\x22left\x22 href=\x22#\x22>&#x25C4;</a>\x0a\x09\x09<a class=\x22right\x22 href=\x22#\x22>&#x25BA;</a>\x0a\x09\x09<a class=\x22up\x22 href=\x22#\x22>&#x25B2;</a>\x0a\x09\x09<a class=\x22down\x22 href=\x22#\x22>&#x25BC;</a>\x0a\x09</aside>\x0a\x0a\x09<!-- Presentation progress bar -->\x0a\x09<div class=\x22progress\x22><span></span></div>\x0a\x0a</div>\x0a'",
messageSends: [],
referencedClasses: []
}),
smalltalk.MagLevPresentation);


smalltalk.addMethod(
"_initialize",
smalltalk.method({
selector: "initialize",
category: 'class initialization',
fn: function (){
var self=this;
smalltalk.send((smalltalk.Browser || Browser), "_openOn_", [self]);
(function($rec){smalltalk.send($rec, "_renderOnJQ_", ["body"]);return smalltalk.send($rec, "_initializeRevealJS", []);})(self);
return self;},
args: [],
source: "initialize\x0a\x09Browser openOn: self.\x0a\x09self\x0a\x09\x09renderOnJQ: 'body';\x0a\x09\x09initializeRevealJS",
messageSends: ["openOn:", "renderOnJQ:", "initializeRevealJS"],
referencedClasses: ["Browser"]
}),
smalltalk.MagLevPresentation.klass);

smalltalk.addMethod(
"_initializeRevealJS",
smalltalk.method({
selector: "initializeRevealJS",
category: 'class initialization',
fn: function (){
var self=this;
smalltalk.send((smalltalk.Reveal || Reveal), "_initialize_", [smalltalk.HashedCollection._fromPairs_([smalltalk.send("controls", "__minus_gt", [true]),smalltalk.send("keyboard", "__minus_gt", [false]),smalltalk.send("progress", "__minus_gt", [true]),smalltalk.send("history", "__minus_gt", [true])])]);
return self;},
args: [],
source: "initializeRevealJS\x0a\x09\x22See https://github.com/hakimel/reveal.js#configuration for a full list of configuration options\x22\x0a\x09Reveal initialize: #{\x0a\x09\x09'controls' -> true.\x0a\x09\x09'keyboard' -> false.\x0a\x09\x09'progress' -> true.\x0a\x09\x09'history' -> true }",
messageSends: ["initialize:", "->"],
referencedClasses: ["Reveal"]
}),
smalltalk.MagLevPresentation.klass);


smalltalk.addClass('SlideCard', smalltalk.Card, ['presentation'], 'Presentation-MagLev');
smalltalk.addMethod(
"_presentation",
smalltalk.method({
selector: "presentation",
category: 'accessing',
fn: function (){
var self=this;
return self['@presentation'];
return self;},
args: [],
source: "presentation\x0a\x09^presentation",
messageSends: [],
referencedClasses: []
}),
smalltalk.SlideCard);

smalltalk.addMethod(
"_presentation_",
smalltalk.method({
selector: "presentation:",
category: 'accessing',
fn: function (aPresentation){
var self=this;
(self['@presentation']=aPresentation);
return self;},
args: ["aPresentation"],
source: "presentation: aPresentation\x0a\x09presentation := aPresentation",
messageSends: [],
referencedClasses: []
}),
smalltalk.SlideCard);

smalltalk.addMethod(
"_templateString",
smalltalk.method({
selector: "templateString",
category: 'rendering',
fn: function (){
var self=this;
return unescape("%0A%3Csection%3E%0A%09%3Ch1%3E%7B%7Btitle%7D%7D%3C/h1%3E%0A%3C/section%3E%0A");
return self;},
args: [],
source: "templateString\x0a\x09^ '\x0a<section>\x0a\x09<h1>{{title}}</h1>\x0a</section>\x0a'",
messageSends: [],
referencedClasses: []
}),
smalltalk.SlideCard);


smalltalk.addMethod(
"_on_",
smalltalk.method({
selector: "on:",
category: 'instance creation',
fn: function (aPresentation){
var self=this;
return (function($rec){smalltalk.send($rec, "_presentation_", [aPresentation]);smalltalk.send($rec, "_appendToJQ_", [".slides"]);return smalltalk.send($rec, "_yourself", []);})(smalltalk.send(self, "_new", []));
return self;},
args: ["aPresentation"],
source: "on: aPresentation\x0a\x09^self new\x0a\x09\x09presentation: aPresentation;\x0a\x09\x09appendToJQ: '.slides';\x0a\x09\x09yourself",
messageSends: ["presentation:", "appendToJQ:", "yourself", "new"],
referencedClasses: []
}),
smalltalk.SlideCard.klass);


smalltalk.addClass('MagLevIntroSlide', smalltalk.SlideCard, [], 'Presentation-MagLev');
smalltalk.addMethod(
"_values",
smalltalk.method({
selector: "values",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.HashedCollection._fromPairs_([smalltalk.send("title", "__minus_gt", ["Data Migrations with MagLev"])]);
return self;},
args: [],
source: "values\x0a\x09^ #{ 'title' -> 'Data Migrations with MagLev' }",
messageSends: ["->"],
referencedClasses: []
}),
smalltalk.MagLevIntroSlide);



smalltalk.addClass('WhatIsMagLevSlide', smalltalk.SlideCard, [], 'Presentation-MagLev');


