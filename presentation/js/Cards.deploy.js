smalltalk.addPackage('Cards', {});
smalltalk.addClass('Card', smalltalk.Object, ['element', 'template', 'values'], 'Cards');
smalltalk.addMethod(
unescape('_appendToJQ_'),
smalltalk.method({
selector: unescape('appendToJQ%3A'),
fn: function (aJQSelectorString){
var self=this;
(self['@element']=smalltalk.send((typeof jQuery == 'undefined' ? nil : jQuery), "_value_", [aJQSelectorString]));
return self;}
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_render'),
smalltalk.method({
selector: unescape('render'),
fn: function (){
var self=this;
smalltalk.send(self, "_renderTemplate", []);
return self;}
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_templateString'),
smalltalk.method({
selector: unescape('templateString'),
fn: function (){
var self=this;
return unescape("%3Ch1%3E%7B%7Btitle%7D%7D%3C/h1%3E");
return self;}
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_template'),
smalltalk.method({
selector: unescape('template'),
fn: function (){
var self=this;
return (($receiver = self['@template']) == nil || $receiver == undefined) ? (function(){return (self['@template']=smalltalk.send((smalltalk.Handlebars || Handlebars), "_compile_", [smalltalk.send(self, "_templateString", [])]));})() : $receiver;
return self;}
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_element'),
smalltalk.method({
selector: unescape('element'),
fn: function (){
var self=this;
return (($receiver = self['@element']) == nil || $receiver == undefined) ? (function(){return (self['@element']=smalltalk.send((typeof jQuery == 'undefined' ? nil : jQuery), "_value_", ["body"]));})() : $receiver;
return self;}
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_values'),
smalltalk.method({
selector: unescape('values'),
fn: function (){
var self=this;
return (($receiver = self['@values']) == nil || $receiver == undefined) ? (function(){return (self['@values']=smalltalk.HashedCollection._fromPairs_([]));})() : $receiver;
return self;}
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_renderTemplate'),
smalltalk.method({
selector: unescape('renderTemplate'),
fn: function (){
var self=this;
smalltalk.send(smalltalk.send(self, "_element", []), "_append_", [smalltalk.send(smalltalk.send(self, "_template", []), "_value_", [smalltalk.send(self, "_values", [])])]);
return self;}
}),
smalltalk.Card);


smalltalk.addMethod(
unescape('_newOnJQ_'),
smalltalk.method({
selector: unescape('newOnJQ%3A'),
fn: function (aJQuerySelector){
var self=this;
return (function($rec){smalltalk.send($rec, "_appendToJQ_", [aJQuerySelector]);return smalltalk.send($rec, "_yourself", []);})(smalltalk.send(self, "_new", []));
return self;}
}),
smalltalk.Card.klass);

smalltalk.addMethod(
unescape('_renderOnJQ_'),
smalltalk.method({
selector: unescape('renderOnJQ%3A'),
fn: function (aJQuerySelector){
var self=this;
return (function($rec){smalltalk.send($rec, "_render", []);return smalltalk.send($rec, "_yourself", []);})(smalltalk.send(self, "_newOnJQ_", [aJQuerySelector]));
return self;}
}),
smalltalk.Card.klass);


smalltalk.addClass('Template', smalltalk.Object, ['source'], 'Cards');
smalltalk.addMethod(
unescape('_initializeFromString_'),
smalltalk.method({
selector: unescape('initializeFromString%3A'),
fn: function (aString){
var self=this;
(self['@source']=aString);
return self;}
}),
smalltalk.Template);

smalltalk.addMethod(
unescape('_render'),
smalltalk.method({
selector: unescape('render'),
fn: function (){
var self=this;
return smalltalk.send(smalltalk.send(self, "_handlebars", []), "_value_", [smalltalk.HashedCollection._fromPairs_([smalltalk.send("title", "__minus_gt", ["Foobar"])])]);
return self;}
}),
smalltalk.Template);


smalltalk.addMethod(
unescape('_newFromString_'),
smalltalk.method({
selector: unescape('newFromString%3A'),
fn: function (aString){
var self=this;
return (function($rec){smalltalk.send($rec, "_initializeFromString_", [aString]);return smalltalk.send($rec, "_yourself", []);})(smalltalk.send(self, "_basicNew", []));
return self;}
}),
smalltalk.Template.klass);


