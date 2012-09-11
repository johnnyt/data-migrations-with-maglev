smalltalk.addPackage('Cards', {});
smalltalk.addClass('Card', smalltalk.Object, ['element', 'template', 'values'], 'Cards');
smalltalk.Card.comment=unescape('A%20%60Card%60%20is%20like%20a%20widget.%20is%20a%20random%20number%20generator%20and%20is%20implemented%20as%20a%20trivial%20wrapper%20around%20javascript%20%60Math.random%28%29%60%20and%20is%20used%20like%20this%3A%0A%0A%09Card%20new%20appendToJQ%3A%20%27body%27')
smalltalk.addMethod(
unescape('_appendToJQ_'),
smalltalk.method({
selector: unescape('appendToJQ%3A'),
category: 'adding',
fn: function (aJQSelectorString){
var self=this;
(self['@element']=smalltalk.send((typeof jQuery == 'undefined' ? nil : jQuery), "_value_", [aJQSelectorString]));
return self;},
args: ["aJQSelectorString"],
source: unescape('appendToJQ%3A%20aJQSelectorString%0A%09element%20%3A%3D%20jQuery%20value%3A%20aJQSelectorString'),
messageSends: ["value:"],
referencedClasses: []
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_render'),
smalltalk.method({
selector: unescape('render'),
category: 'rendering',
fn: function (){
var self=this;
smalltalk.send(self, "_renderTemplate", []);
return self;},
args: [],
source: unescape('render%0A%09self%20renderTemplate'),
messageSends: ["renderTemplate"],
referencedClasses: []
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_templateString'),
smalltalk.method({
selector: unescape('templateString'),
category: 'templates',
fn: function (){
var self=this;
return unescape("%3Ch1%3E%7B%7Btitle%7D%7D%3C/h1%3E");
return self;},
args: [],
source: unescape('templateString%0A%09%5E%20%27%3Ch1%3E%7B%7Btitle%7D%7D%3C/h1%3E%27'),
messageSends: [],
referencedClasses: []
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_template'),
smalltalk.method({
selector: unescape('template'),
category: 'accessing',
fn: function (){
var self=this;
return (($receiver = self['@template']) == nil || $receiver == undefined) ? (function(){return (self['@template']=smalltalk.send((smalltalk.Handlebars || Handlebars), "_compile_", [smalltalk.send(self, "_templateString", [])]));})() : $receiver;
return self;},
args: [],
source: unescape('template%0A%09%5E%20template%20ifNil%3A%20%5B%20template%20%3A%3D%20Handlebars%20compile%3A%20self%20templateString%20%5D'),
messageSends: ["ifNil:", "compile:", "templateString"],
referencedClasses: ["Handlebars"]
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_element'),
smalltalk.method({
selector: unescape('element'),
category: 'accessing',
fn: function (){
var self=this;
return (($receiver = self['@element']) == nil || $receiver == undefined) ? (function(){return (self['@element']=smalltalk.send((typeof jQuery == 'undefined' ? nil : jQuery), "_value_", ["body"]));})() : $receiver;
return self;},
args: [],
source: unescape('element%0A%09%5E%20element%20ifNil%3A%20%5B%20element%20%3A%3D%20jQuery%20value%3A%20%27body%27%20%5D'),
messageSends: ["ifNil:", "value:"],
referencedClasses: []
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_values'),
smalltalk.method({
selector: unescape('values'),
category: 'accessing',
fn: function (){
var self=this;
return (($receiver = self['@values']) == nil || $receiver == undefined) ? (function(){return (self['@values']=smalltalk.HashedCollection._fromPairs_([]));})() : $receiver;
return self;},
args: [],
source: unescape('values%0A%09%5E%20values%20ifNil%3A%20%5B%20values%20%3A%3D%20%23%7B%7D%20%5D'),
messageSends: ["ifNil:"],
referencedClasses: []
}),
smalltalk.Card);

smalltalk.addMethod(
unescape('_renderTemplate'),
smalltalk.method({
selector: unescape('renderTemplate'),
category: 'rendering',
fn: function (){
var self=this;
smalltalk.send(smalltalk.send(self, "_element", []), "_append_", [smalltalk.send(smalltalk.send(self, "_template", []), "_value_", [smalltalk.send(self, "_values", [])])]);
return self;},
args: [],
source: unescape('renderTemplate%0A%09self%20element%20append%3A%20%28self%20template%20value%3A%20self%20values%29.'),
messageSends: ["append:", "element", "value:", "template", "values"],
referencedClasses: []
}),
smalltalk.Card);


smalltalk.addMethod(
unescape('_newOnJQ_'),
smalltalk.method({
selector: unescape('newOnJQ%3A'),
category: 'instance creation',
fn: function (aJQuerySelector){
var self=this;
return (function($rec){smalltalk.send($rec, "_appendToJQ_", [aJQuerySelector]);return smalltalk.send($rec, "_yourself", []);})(smalltalk.send(self, "_new", []));
return self;},
args: ["aJQuerySelector"],
source: unescape('newOnJQ%3A%20aJQuerySelector%0A%09%5E%20self%20new%0A%09%09appendToJQ%3A%20aJQuerySelector%3B%0A%09%09yourself'),
messageSends: ["appendToJQ:", "yourself", "new"],
referencedClasses: []
}),
smalltalk.Card.klass);

smalltalk.addMethod(
unescape('_renderOnJQ_'),
smalltalk.method({
selector: unescape('renderOnJQ%3A'),
category: 'instance creation',
fn: function (aJQuerySelector){
var self=this;
return (function($rec){smalltalk.send($rec, "_render", []);return smalltalk.send($rec, "_yourself", []);})(smalltalk.send(self, "_newOnJQ_", [aJQuerySelector]));
return self;},
args: ["aJQuerySelector"],
source: unescape('renderOnJQ%3A%20aJQuerySelector%0A%09%5E%20%28self%20newOnJQ%3A%20aJQuerySelector%29%0A%09%09render%3B%0A%09%09yourself'),
messageSends: ["render", "yourself", "newOnJQ:"],
referencedClasses: []
}),
smalltalk.Card.klass);


smalltalk.addClass('Template', smalltalk.Object, ['source'], 'Cards');
smalltalk.addMethod(
unescape('_initializeFromString_'),
smalltalk.method({
selector: unescape('initializeFromString%3A'),
category: 'initialization',
fn: function (aString){
var self=this;
(self['@source']=aString);
return self;},
args: ["aString"],
source: unescape('initializeFromString%3A%20aString%0A%09source%20%3A%3D%20aString'),
messageSends: [],
referencedClasses: []
}),
smalltalk.Template);

smalltalk.addMethod(
unescape('_render'),
smalltalk.method({
selector: unescape('render'),
category: 'rendering',
fn: function (){
var self=this;
return smalltalk.send(smalltalk.send(self, "_handlebars", []), "_value_", [smalltalk.HashedCollection._fromPairs_([smalltalk.send("title", "__minus_gt", ["Foobar"])])]);
return self;},
args: [],
source: unescape('render%0A%09%5E%20self%20handlebars%20value%3A%20%23%7B%20%27title%27%20-%3E%20%27Foobar%27%20%7D'),
messageSends: ["value:", "handlebars", unescape("-%3E")],
referencedClasses: []
}),
smalltalk.Template);


smalltalk.addMethod(
unescape('_newFromString_'),
smalltalk.method({
selector: unescape('newFromString%3A'),
category: 'instance creation',
fn: function (aString){
var self=this;
return (function($rec){smalltalk.send($rec, "_initializeFromString_", [aString]);return smalltalk.send($rec, "_yourself", []);})(smalltalk.send(self, "_basicNew", []));
return self;},
args: ["aString"],
source: unescape('newFromString%3A%20aString%0A%09%5E%20self%20basicNew%0A%09%09initializeFromString%3A%20aString%3B%0A%09%09yourself'),
messageSends: ["initializeFromString:", "yourself", "basicNew"],
referencedClasses: []
}),
smalltalk.Template.klass);


