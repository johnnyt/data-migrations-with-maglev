smalltalk.addPackage('Presentation-MagLev', {});
smalltalk.addClass('MagLevPresentation', smalltalk.Card, ['slides'], 'Presentation-MagLev');
smalltalk.addMethod(
"_initSlides",
smalltalk.method({
selector: "initSlides",
fn: function (){
var self=this;
(self['@slides']=smalltalk.send(smalltalk.send(self, "_slideClasses", []), "_collect_", [(function(each){return smalltalk.send(each, "_on_", [self]);})]));
return self;}
}),
smalltalk.MagLevPresentation);

smalltalk.addMethod(
"_render",
smalltalk.method({
selector: "render",
fn: function (){
var self=this;
smalltalk.send(self, "_render", [], smalltalk.Card);
smalltalk.send(smalltalk.send(self, "_slides", []), "_do_", [(function(slide){return smalltalk.send(slide, "_render", []);})]);
return self;}
}),
smalltalk.MagLevPresentation);

smalltalk.addMethod(
"_slideClasses",
smalltalk.method({
selector: "slideClasses",
fn: function (){
var self=this;
return (function($rec){smalltalk.send($rec, "_add_", [(smalltalk.MagLevIntroSlide || MagLevIntroSlide)]);return smalltalk.send($rec, "_yourself", []);})(smalltalk.send((smalltalk.Array || Array), "_new", []));
return self;}
}),
smalltalk.MagLevPresentation);

smalltalk.addMethod(
"_slides",
smalltalk.method({
selector: "slides",
fn: function (){
var self=this;
(($receiver = self['@slides']) == nil || $receiver == undefined) ? (function(){return smalltalk.send(self, "_initSlides", []);})() : $receiver;
return self['@slides'];
return self;}
}),
smalltalk.MagLevPresentation);

smalltalk.addMethod(
"_templateString",
smalltalk.method({
selector: "templateString",
fn: function (){
var self=this;
return unescape("%0A%3Cdiv%20class%3D%22reveal%22%3E%0A%0A%09%3C%21--%20Used%20to%20fade%20in%20a%20background%20when%20a%20specific%20slide%20state%20is%20reached%20--%3E%0A%09%3Cdiv%20class%3D%22state-background%22%3E%3C/div%3E%0A%0A%09%3C%21--%20Any%20section%20element%20inside%20of%20this%20container%20is%20displayed%20as%20a%20slide%20--%3E%0A%09%3Cdiv%20class%3D%22slides%22%3E%3C/div%3E%0A%0A%09%3C%21--%20The%20navigational%20controls%20UI%20--%3E%0A%09%3Caside%20class%3D%22controls%22%3E%0A%09%09%3Ca%20class%3D%22left%22%20href%3D%22%23%22%3E%26%23x25C4%3B%3C/a%3E%0A%09%09%3Ca%20class%3D%22right%22%20href%3D%22%23%22%3E%26%23x25BA%3B%3C/a%3E%0A%09%09%3Ca%20class%3D%22up%22%20href%3D%22%23%22%3E%26%23x25B2%3B%3C/a%3E%0A%09%09%3Ca%20class%3D%22down%22%20href%3D%22%23%22%3E%26%23x25BC%3B%3C/a%3E%0A%09%3C/aside%3E%0A%0A%09%3C%21--%20Presentation%20progress%20bar%20--%3E%0A%09%3Cdiv%20class%3D%22progress%22%3E%3Cspan%3E%3C/span%3E%3C/div%3E%0A%0A%3C/div%3E%0A");
return self;}
}),
smalltalk.MagLevPresentation);


smalltalk.addMethod(
"_initialize",
smalltalk.method({
selector: "initialize",
fn: function (){
var self=this;
smalltalk.send((smalltalk.Browser || Browser), "_openOn_", [self]);
(function($rec){smalltalk.send($rec, "_renderOnJQ_", ["body"]);return smalltalk.send($rec, "_initializeRevealJS", []);})(self);
return self;}
}),
smalltalk.MagLevPresentation.klass);

smalltalk.addMethod(
"_initializeRevealJS",
smalltalk.method({
selector: "initializeRevealJS",
fn: function (){
var self=this;
smalltalk.send((smalltalk.Reveal || Reveal), "_initialize_", [smalltalk.HashedCollection._fromPairs_([smalltalk.send("controls", "__minus_gt", [true]),smalltalk.send("keyboard", "__minus_gt", [false]),smalltalk.send("progress", "__minus_gt", [true]),smalltalk.send("history", "__minus_gt", [true])])]);
return self;}
}),
smalltalk.MagLevPresentation.klass);


smalltalk.addClass('SlideCard', smalltalk.Card, ['presentation'], 'Presentation-MagLev');
smalltalk.addMethod(
"_presentation",
smalltalk.method({
selector: "presentation",
fn: function (){
var self=this;
return self['@presentation'];
return self;}
}),
smalltalk.SlideCard);

smalltalk.addMethod(
"_presentation_",
smalltalk.method({
selector: "presentation:",
fn: function (aPresentation){
var self=this;
(self['@presentation']=aPresentation);
return self;}
}),
smalltalk.SlideCard);

smalltalk.addMethod(
"_templateString",
smalltalk.method({
selector: "templateString",
fn: function (){
var self=this;
return unescape("%0A%3Csection%3E%0A%09%3Ch1%3E%7B%7Btitle%7D%7D%3C/h1%3E%0A%3C/section%3E%0A");
return self;}
}),
smalltalk.SlideCard);


smalltalk.addMethod(
"_on_",
smalltalk.method({
selector: "on:",
fn: function (aPresentation){
var self=this;
return (function($rec){smalltalk.send($rec, "_presentation_", [aPresentation]);smalltalk.send($rec, "_appendToJQ_", [".slides"]);return smalltalk.send($rec, "_yourself", []);})(smalltalk.send(self, "_new", []));
return self;}
}),
smalltalk.SlideCard.klass);


smalltalk.addClass('MagLevIntroSlide', smalltalk.SlideCard, [], 'Presentation-MagLev');
smalltalk.addMethod(
"_values",
smalltalk.method({
selector: "values",
fn: function (){
var self=this;
return smalltalk.HashedCollection._fromPairs_([smalltalk.send("title", "__minus_gt", ["Data Migrations with MagLev"])]);
return self;}
}),
smalltalk.MagLevIntroSlide);



smalltalk.addClass('WhatIsMagLevSlide', smalltalk.SlideCard, [], 'Presentation-MagLev');


