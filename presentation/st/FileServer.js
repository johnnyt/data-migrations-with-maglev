smalltalk.addPackage('FileServer', {});
smalltalk.addClass('FileServer', smalltalk.Object, ['path', 'http', 'fs', 'url', 'port', 'basePath', 'util', 'exec'], 'FileServer');
smalltalk.addMethod(
"_basePath",
smalltalk.method({
selector: "basePath",
category: 'accessing',
fn: function (){
var self=this;
return (($receiver = self['@basePath']) == nil || $receiver == undefined) ? (function(){return "./";})() : $receiver;
return self;},
args: [],
source: "basePath\x0a\x09^basePath ifNil: ['./']",
messageSends: ["ifNil:"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_basePath_",
smalltalk.method({
selector: "basePath:",
category: 'accessing',
fn: function (aString){
var self=this;
(self['@basePath']=aString);
return self;},
args: ["aString"],
source: "basePath: aString\x0a\x09basePath := aString",
messageSends: [],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_handleGETRequest_respondTo_",
smalltalk.method({
selector: "handleGETRequest:respondTo:",
category: 'request handling',
fn: function (aRequest, aResponse){
var self=this;
var uri=nil;
var filename=nil;
(uri=smalltalk.send(smalltalk.send(self['@url'], "_parse_", [smalltalk.send(aRequest, "_url", [])]), "_pathname", []));
(filename=smalltalk.send(self['@path'], "_join_with_", [smalltalk.send(self, "_basePath", []), uri]));
smalltalk.send(self['@path'], "_exists_do_", [filename, (function(boolean){return ((($receiver = boolean).klass === smalltalk.Boolean) ? (! $receiver ? (function(){return smalltalk.send(self, "_respondNotFoundTo_", [aResponse]);})() : (function(){return smalltalk.send(self, "_respondFileNamed_to_", [filename, aResponse]);})()) : smalltalk.send($receiver, "_ifFalse_ifTrue_", [(function(){return smalltalk.send(self, "_respondNotFoundTo_", [aResponse]);}), (function(){return smalltalk.send(self, "_respondFileNamed_to_", [filename, aResponse]);})]));})]);
return self;},
args: ["aRequest", "aResponse"],
source: "handleGETRequest: aRequest respondTo: aResponse\x0a\x09| uri filename |\x0a\x09uri := (url parse: aRequest url) pathname.\x0a\x09filename := path join: self basePath with: uri.\x0a\x09path exists: filename do: [:boolean | \x0a\x09\x09boolean \x0a\x09\x09\x09ifFalse: [self respondNotFoundTo: aResponse]\x0a\x09\x09\x09ifTrue: [self respondFileNamed: filename to: aResponse]]",
messageSends: ["pathname", "parse:", "url", "join:with:", "basePath", "exists:do:", "ifFalse:ifTrue:", "respondNotFoundTo:", "respondFileNamed:to:"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_handleOPTIONSRequest_respondTo_",
smalltalk.method({
selector: "handleOPTIONSRequest:respondTo:",
category: 'request handling',
fn: function (aRequest, aResponse){
var self=this;
smalltalk.send(aResponse, "_writeHead_options_", [(200), smalltalk.HashedCollection._fromPairs_([smalltalk.send("Access-Control-Allow-Origin", "__minus_gt", ["*"]),smalltalk.send("Access-Control-Allow-Methods", "__minus_gt", ["GET, PUT, POST, DELETE, OPTIONS"]),smalltalk.send("Access-Control-Allow-Headers", "__minus_gt", ["Content-Type, Accept"]),smalltalk.send("Content-Length", "__minus_gt", [(0)]),smalltalk.send("Access-Control-Max-Age", "__minus_gt", [(10)])])]);
smalltalk.send(aResponse, "_end", []);
return self;},
args: ["aRequest", "aResponse"],
source: "handleOPTIONSRequest: aRequest respondTo: aResponse\x0a\x09aResponse writeHead: 200 options: #{'Access-Control-Allow-Origin' -> '*'.\x0a\x09\x09\x09\x09\x09'Access-Control-Allow-Methods' -> 'GET, PUT, POST, DELETE, OPTIONS'.\x0a\x09\x09\x09\x09\x09'Access-Control-Allow-Headers' -> 'Content-Type, Accept'.\x0a\x09\x09\x09\x09\x09'Content-Length' -> 0.\x0a\x09\x09\x09\x09\x09'Access-Control-Max-Age' -> 10}.\x0a\x09aResponse end",
messageSends: ["writeHead:options:", "->", "end"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_handlePUTRequest_respondTo_",
smalltalk.method({
selector: "handlePUTRequest:respondTo:",
category: 'request handling',
fn: function (aRequest, aResponse){
var self=this;
var stream=nil;
smalltalk.send((typeof console == 'undefined' ? nil : console), "_log_", [smalltalk.send("Received ", "__comma", [smalltalk.send(aRequest, "_url", [])])]);
(stream=smalltalk.send(self['@fs'], "_createWriteStream_", [smalltalk.send(".", "__comma", [smalltalk.send(aRequest, "_url", [])])]));
smalltalk.send(aRequest, "_setEncoding_", ["utf8"]);
smalltalk.send(aRequest, "_on_do_", ["data", (function(data){return smalltalk.send(stream, "_write_", [data]);})]);
smalltalk.send(aRequest, "_on_do_", ["end", (function(){smalltalk.send(stream, "_end", []);return smalltalk.send(self, "_respondOKTo_", [aResponse]);})]);
return self;},
args: ["aRequest", "aResponse"],
source: "handlePUTRequest: aRequest respondTo: aResponse\x0a\x09|stream |\x0a  console log: 'Received ', aRequest url.\x0a\x09stream := fs createWriteStream: '.' , aRequest url.\x0a        aRequest setEncoding: 'utf8'.\x0a        aRequest on: 'data' do: [:data | stream write: data].\x0a\x0a        aRequest on: 'end' do: [\x0a                stream end.\x0a                \x22(aRequest url match: '\x5c.st$') ifTrue: [\x0a                  console log: 'Recompiling JS via grunt'.\x0a                  exec value: 'sleep 2 && grunt' ].\x22\x0a                self respondOKTo: aResponse]",
messageSends: ["log:", ",", "url", "createWriteStream:", "setEncoding:", "on:do:", "write:", "end", "respondOKTo:"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_handleRequest_respondTo_",
smalltalk.method({
selector: "handleRequest:respondTo:",
category: 'request handling',
fn: function (aRequest, aResponse){
var self=this;
((($receiver = smalltalk.send(smalltalk.send(aRequest, "_method", []), "__eq", ["PUT"])).klass === smalltalk.Boolean) ? ($receiver ? (function(){return smalltalk.send(self, "_handlePUTRequest_respondTo_", [aRequest, aResponse]);})() : nil) : smalltalk.send($receiver, "_ifTrue_", [(function(){return smalltalk.send(self, "_handlePUTRequest_respondTo_", [aRequest, aResponse]);})]));
((($receiver = smalltalk.send(smalltalk.send(aRequest, "_method", []), "__eq", ["GET"])).klass === smalltalk.Boolean) ? ($receiver ? (function(){return smalltalk.send(self, "_handleGETRequest_respondTo_", [aRequest, aResponse]);})() : nil) : smalltalk.send($receiver, "_ifTrue_", [(function(){return smalltalk.send(self, "_handleGETRequest_respondTo_", [aRequest, aResponse]);})]));
((($receiver = smalltalk.send(smalltalk.send(aRequest, "_method", []), "__eq", ["OPTIONS"])).klass === smalltalk.Boolean) ? ($receiver ? (function(){return smalltalk.send(self, "_handleOPTIONSRequest_respondTo_", [aRequest, aResponse]);})() : nil) : smalltalk.send($receiver, "_ifTrue_", [(function(){return smalltalk.send(self, "_handleOPTIONSRequest_respondTo_", [aRequest, aResponse]);})]));
return self;},
args: ["aRequest", "aResponse"],
source: "handleRequest: aRequest respondTo: aResponse\x0a\x0a\x09aRequest method = 'PUT'\x0a\x09\x09ifTrue: [self handlePUTRequest: aRequest respondTo: aResponse].\x0a\x09aRequest method = 'GET'\x0a\x09\x09ifTrue:[self handleGETRequest: aRequest respondTo: aResponse].\x0a\x09aRequest method = 'OPTIONS'\x0a\x09\x09ifTrue:[self handleOPTIONSRequest: aRequest respondTo: aResponse]",
messageSends: ["ifTrue:", "=", "method", "handlePUTRequest:respondTo:", "handleGETRequest:respondTo:", "handleOPTIONSRequest:respondTo:"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_initialize",
smalltalk.method({
selector: "initialize",
category: 'initialization',
fn: function (){
var self=this;
smalltalk.send(self, "_initialize", [], smalltalk.FileServer.superclass || nil);
(self['@path']=smalltalk.send(self, "_require_", ["path"]));
(self['@http']=smalltalk.send(self, "_require_", ["http"]));
(self['@fs']=smalltalk.send(self, "_require_", ["fs"]));
(self['@util']=smalltalk.send(self, "_require_", ["util"]));
(self['@url']=smalltalk.send(self, "_require_", ["url"]));
(self['@exec']=require('child_process').exec);
return self;},
args: [],
source: "initialize\x0a\x09super initialize.\x0a\x09path := self require: 'path'.\x0a\x09http := self require: 'http'.\x0a\x09fs := self require: 'fs'.\x0a\x09util := self require: 'util'.\x0a\x09url := self require: 'url'.\x0a  exec := <require('child_process').exec>.",
messageSends: ["initialize", "require:"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_port",
smalltalk.method({
selector: "port",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.send(smalltalk.send(self, "_class", []), "_port", []);
return self;},
args: [],
source: "port\x0a\x09^self class port",
messageSends: ["port", "class"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_require_",
smalltalk.method({
selector: "require:",
category: 'private',
fn: function (aModuleString){
var self=this;
return smalltalk.send((typeof require == 'undefined' ? nil : require), "_value_", [aModuleString]);
return self;},
args: ["aModuleString"],
source: "require: aModuleString\x0a\x09\x22call to the require function\x22\x0a\x09^require value: aModuleString",
messageSends: ["value:"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_respondFileNamed_to_",
smalltalk.method({
selector: "respondFileNamed:to:",
category: 'request handling',
fn: function (aFilename, aResponse){
var self=this;
var type=nil;
var filename=nil;
(filename=aFilename);
((($receiver = smalltalk.send(smalltalk.send(self['@fs'], "_statSync_", [aFilename]), "_isDirectory", [])).klass === smalltalk.Boolean) ? ($receiver ? (function(){return (filename=smalltalk.send(filename, "__comma", ["index.html"]));})() : nil) : smalltalk.send($receiver, "_ifTrue_", [(function(){return (filename=smalltalk.send(filename, "__comma", ["index.html"]));})]));
smalltalk.send(self['@fs'], "_readFile_do_", [filename, (function(ex, file){return ((($receiver = smalltalk.send(ex, "_notNil", [])).klass === smalltalk.Boolean) ? ($receiver ? (function(){return smalltalk.send(self, "_respondInternalErrorTo_", [aResponse]);})() : (function(){(type=smalltalk.send(smalltalk.send(self, "_class", []), "_mimeTypeFor_", [filename]));((($receiver = smalltalk.send(type, "__eq", ["application/javascript"])).klass === smalltalk.Boolean) ? ($receiver ? (function(){return (type=smalltalk.send(type, "__comma", [";charset=utf-8"]));})() : nil) : smalltalk.send($receiver, "_ifTrue_", [(function(){return (type=smalltalk.send(type, "__comma", [";charset=utf-8"]));})]));return (function($rec){smalltalk.send($rec, "_writeHead_options_", [(200), smalltalk.HashedCollection._fromPairs_([smalltalk.send("Content-Type", "__minus_gt", [type])])]);smalltalk.send($rec, "_write_encoding_", [file, "binary"]);return smalltalk.send($rec, "_end", []);})(aResponse);})()) : smalltalk.send($receiver, "_ifTrue_ifFalse_", [(function(){return smalltalk.send(self, "_respondInternalErrorTo_", [aResponse]);}), (function(){(type=smalltalk.send(smalltalk.send(self, "_class", []), "_mimeTypeFor_", [filename]));((($receiver = smalltalk.send(type, "__eq", ["application/javascript"])).klass === smalltalk.Boolean) ? ($receiver ? (function(){return (type=smalltalk.send(type, "__comma", [";charset=utf-8"]));})() : nil) : smalltalk.send($receiver, "_ifTrue_", [(function(){return (type=smalltalk.send(type, "__comma", [";charset=utf-8"]));})]));return (function($rec){smalltalk.send($rec, "_writeHead_options_", [(200), smalltalk.HashedCollection._fromPairs_([smalltalk.send("Content-Type", "__minus_gt", [type])])]);smalltalk.send($rec, "_write_encoding_", [file, "binary"]);return smalltalk.send($rec, "_end", []);})(aResponse);})]));})]);
return self;},
args: ["aFilename", "aResponse"],
source: "respondFileNamed: aFilename to: aResponse\x0a\x09| type filename |\x0a\x0a\x09filename := aFilename.\x0a\x09(fs statSync: aFilename) isDirectory ifTrue: [\x0a        \x09filename := filename, 'index.html'].\x0a\x0a\x09fs readFile: filename do: [:ex :file |\x0a\x09\x09ex notNil \x0a\x09\x09\x09ifTrue: [self respondInternalErrorTo: aResponse]\x0a\x09\x09\x09ifFalse: [\x0a\x09\x09\x09\x09type := self class mimeTypeFor: filename.\x0a\x09\x09\x09\x09type = 'application/javascript'\x0a\x09\x09\x09\x09\x09ifTrue: [ type:=type,';charset=utf-8' ].\x0a\x09\x09\x09\x09aResponse \x0a\x09\x09\x09\x09\x09writeHead: 200 options:  #{'Content-Type' -> type};\x0a\x09\x09\x09\x09\x09write: file encoding: 'binary';\x0a\x09\x09\x09\x09\x09end]]",
messageSends: ["ifTrue:", "isDirectory", "statSync:", ",", "readFile:do:", "ifTrue:ifFalse:", "notNil", "respondInternalErrorTo:", "mimeTypeFor:", "class", "=", "writeHead:options:", "->", "write:encoding:", "end"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_respondInternalErrorTo_",
smalltalk.method({
selector: "respondInternalErrorTo:",
category: 'request handling',
fn: function (aResponse){
var self=this;
(function($rec){smalltalk.send($rec, "_writeHead_options_", [(500), smalltalk.HashedCollection._fromPairs_([smalltalk.send("Content-Type", "__minus_gt", ["text/plain"])])]);smalltalk.send($rec, "_write_", ["500 Internal server error"]);return smalltalk.send($rec, "_end", []);})(aResponse);
return self;},
args: ["aResponse"],
source: "respondInternalErrorTo: aResponse\x0a\x09aResponse \x0a\x09\x09writeHead: 500 options: #{'Content-Type' -> 'text/plain'};\x0a\x09\x09write: '500 Internal server error';\x0a\x09\x09end",
messageSends: ["writeHead:options:", "->", "write:", "end"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_respondNotFoundTo_",
smalltalk.method({
selector: "respondNotFoundTo:",
category: 'request handling',
fn: function (aResponse){
var self=this;
(function($rec){smalltalk.send($rec, "_writeHead_options_", [(404), smalltalk.HashedCollection._fromPairs_([smalltalk.send("Content-Type", "__minus_gt", ["text/plain"])])]);smalltalk.send($rec, "_write_", ["404 Not found"]);return smalltalk.send($rec, "_end", []);})(aResponse);
return self;},
args: ["aResponse"],
source: "respondNotFoundTo: aResponse\x0a\x09aResponse \x0a\x09\x09writeHead: 404 options: #{'Content-Type' -> 'text/plain'};\x0a\x09\x09write: '404 Not found';\x0a\x09\x09end",
messageSends: ["writeHead:options:", "->", "write:", "end"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_respondOKTo_",
smalltalk.method({
selector: "respondOKTo:",
category: 'request handling',
fn: function (aResponse){
var self=this;
smalltalk.send(aResponse, "_writeHead_options_", [(200), smalltalk.HashedCollection._fromPairs_([smalltalk.send("Content-Type", "__minus_gt", ["text/plain"]),smalltalk.send("Access-Control-Allow-Origin", "__minus_gt", ["*"])])]);
smalltalk.send(aResponse, "_end", []);
return self;},
args: ["aResponse"],
source: "respondOKTo: aResponse\x0a\x09aResponse \x0a\x09\x09writeHead: 200 options: #{'Content-Type' -> 'text/plain'. 'Access-Control-Allow-Origin' -> '*'}.\x0a\x09aResponse end.",
messageSends: ["writeHead:options:", "->", "end"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_start",
smalltalk.method({
selector: "start",
category: 'starting',
fn: function (){
var self=this;
smalltalk.send(smalltalk.send(self['@http'], "_createServer_", [(function(request, response){return smalltalk.send(self, "_handleRequest_respondTo_", [request, response]);})]), "_listen_", [smalltalk.send(self, "_port", [])]);
smalltalk.send((typeof console == 'undefined' ? nil : console), "_log_", [smalltalk.send("Starting file server on port ", "__comma", [smalltalk.send(smalltalk.send(self, "_port", []), "_asString", [])])]);
return self;},
args: [],
source: "start\x0a\x09(http createServer: [:request :response |\x0a\x09 \x09self handleRequest: request respondTo: response]) listen: self port.\x0a\x09console log: 'Starting file server on port ', self port asString",
messageSends: ["listen:", "createServer:", "handleRequest:respondTo:", "port", "log:", ",", "asString"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_startOn_",
smalltalk.method({
selector: "startOn:",
category: 'starting',
fn: function (aPort){
var self=this;
(self['@port']=aPort);
smalltalk.send(self, "_start", []);
return self;},
args: ["aPort"],
source: "startOn: aPort\x0a\x09port := aPort.\x0a\x09self start",
messageSends: ["start"],
referencedClasses: []
}),
smalltalk.FileServer);

smalltalk.addMethod(
"_writeData_toFileNamed_",
smalltalk.method({
selector: "writeData:toFileNamed:",
category: 'private',
fn: function (data, aFilename){
var self=this;
smalltalk.send((typeof console == 'undefined' ? nil : console), "_log_", [aFilename]);
return self;},
args: ["data", "aFilename"],
source: "writeData: data toFileNamed: aFilename\x0a\x09console log: aFilename",
messageSends: ["log:"],
referencedClasses: []
}),
smalltalk.FileServer);


smalltalk.FileServer.klass.iVarNames = ['port','mimeTypes'];
smalltalk.addMethod(
"_defaultMimeTypes",
smalltalk.method({
selector: "defaultMimeTypes",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.HashedCollection._fromPairs_([smalltalk.send("%", "__minus_gt", ["application/x-trash"]),smalltalk.send("323", "__minus_gt", ["text/h323"]),smalltalk.send("abw", "__minus_gt", ["application/x-abiword"]),smalltalk.send("ai", "__minus_gt", ["application/postscript"]),smalltalk.send("aif", "__minus_gt", ["audio/x-aiff"]),smalltalk.send("aifc", "__minus_gt", ["audio/x-aiff"]),smalltalk.send("aiff", "__minus_gt", ["audio/x-aiff"]),smalltalk.send("alc", "__minus_gt", ["chemical/x-alchemy"]),smalltalk.send("art", "__minus_gt", ["image/x-jg"]),smalltalk.send("asc", "__minus_gt", ["text/plain"]),smalltalk.send("asf", "__minus_gt", ["video/x-ms-asf"]),smalltalk.send("asn", "__minus_gt", ["chemical/x-ncbi-asn1-spec"]),smalltalk.send("aso", "__minus_gt", ["chemical/x-ncbi-asn1-binary"]),smalltalk.send("asx", "__minus_gt", ["video/x-ms-asf"]),smalltalk.send("au", "__minus_gt", ["audio/basic"]),smalltalk.send("avi", "__minus_gt", ["video/x-msvideo"]),smalltalk.send("b", "__minus_gt", ["chemical/x-molconn-Z"]),smalltalk.send("bak", "__minus_gt", ["application/x-trash"]),smalltalk.send("bat", "__minus_gt", ["application/x-msdos-program"]),smalltalk.send("bcpio", "__minus_gt", ["application/x-bcpio"]),smalltalk.send("bib", "__minus_gt", ["text/x-bibtex"]),smalltalk.send("bin", "__minus_gt", ["application/octet-stream"]),smalltalk.send("bmp", "__minus_gt", ["image/x-ms-bmp"]),smalltalk.send("book", "__minus_gt", ["application/x-maker"]),smalltalk.send("bsd", "__minus_gt", ["chemical/x-crossfire"]),smalltalk.send("c", "__minus_gt", ["text/x-csrc"]),smalltalk.send("c++", "__minus_gt", ["text/x-c++src"]),smalltalk.send("c3d", "__minus_gt", ["chemical/x-chem3d"]),smalltalk.send("cac", "__minus_gt", ["chemical/x-cache"]),smalltalk.send("cache", "__minus_gt", ["chemical/x-cache"]),smalltalk.send("cascii", "__minus_gt", ["chemical/x-cactvs-binary"]),smalltalk.send("cat", "__minus_gt", ["application/vnd.ms-pki.seccat"]),smalltalk.send("cbin", "__minus_gt", ["chemical/x-cactvs-binary"]),smalltalk.send("cc", "__minus_gt", ["text/x-c++src"]),smalltalk.send("cdf", "__minus_gt", ["application/x-cdf"]),smalltalk.send("cdr", "__minus_gt", ["image/x-coreldraw"]),smalltalk.send("cdt", "__minus_gt", ["image/x-coreldrawtemplate"]),smalltalk.send("cdx", "__minus_gt", ["chemical/x-cdx"]),smalltalk.send("cdy", "__minus_gt", ["application/vnd.cinderella"]),smalltalk.send("cef", "__minus_gt", ["chemical/x-cxf"]),smalltalk.send("cer", "__minus_gt", ["chemical/x-cerius"]),smalltalk.send("chm", "__minus_gt", ["chemical/x-chemdraw"]),smalltalk.send("chrt", "__minus_gt", ["application/x-kchart"]),smalltalk.send("cif", "__minus_gt", ["chemical/x-cif"]),smalltalk.send("class", "__minus_gt", ["application/java-vm"]),smalltalk.send("cls", "__minus_gt", ["text/x-tex"]),smalltalk.send("cmdf", "__minus_gt", ["chemical/x-cmdf"]),smalltalk.send("cml", "__minus_gt", ["chemical/x-cml"]),smalltalk.send("cod", "__minus_gt", ["application/vnd.rim.cod"]),smalltalk.send("com", "__minus_gt", ["application/x-msdos-program"]),smalltalk.send("cpa", "__minus_gt", ["chemical/x-compass"]),smalltalk.send("cpio", "__minus_gt", ["application/x-cpio"]),smalltalk.send("cpp", "__minus_gt", ["text/x-c++src"]),smalltalk.send("cpt", "__minus_gt", ["image/x-corelphotopaint"]),smalltalk.send("crl", "__minus_gt", ["application/x-pkcs7-crl"]),smalltalk.send("crt", "__minus_gt", ["application/x-x509-ca-cert"]),smalltalk.send("csf", "__minus_gt", ["chemical/x-cache-csf"]),smalltalk.send("csh", "__minus_gt", ["text/x-csh"]),smalltalk.send("csm", "__minus_gt", ["chemical/x-csml"]),smalltalk.send("csml", "__minus_gt", ["chemical/x-csml"]),smalltalk.send("css", "__minus_gt", ["text/css"]),smalltalk.send("csv", "__minus_gt", ["text/comma-separated-values"]),smalltalk.send("ctab", "__minus_gt", ["chemical/x-cactvs-binary"]),smalltalk.send("ctx", "__minus_gt", ["chemical/x-ctx"]),smalltalk.send("cu", "__minus_gt", ["application/cu-seeme"]),smalltalk.send("cub", "__minus_gt", ["chemical/x-gaussian-cube"]),smalltalk.send("cxf", "__minus_gt", ["chemical/x-cxf"]),smalltalk.send("cxx", "__minus_gt", ["text/x-c++src"]),smalltalk.send("dat", "__minus_gt", ["chemical/x-mopac-input"]),smalltalk.send("dcr", "__minus_gt", ["application/x-director"]),smalltalk.send("deb", "__minus_gt", ["application/x-debian-package"]),smalltalk.send("dif", "__minus_gt", ["video/dv"]),smalltalk.send("diff", "__minus_gt", ["text/plain"]),smalltalk.send("dir", "__minus_gt", ["application/x-director"]),smalltalk.send("djv", "__minus_gt", ["image/vnd.djvu"]),smalltalk.send("djvu", "__minus_gt", ["image/vnd.djvu"]),smalltalk.send("dl", "__minus_gt", ["video/dl"]),smalltalk.send("dll", "__minus_gt", ["application/x-msdos-program"]),smalltalk.send("dmg", "__minus_gt", ["application/x-apple-diskimage"]),smalltalk.send("dms", "__minus_gt", ["application/x-dms"]),smalltalk.send("doc", "__minus_gt", ["application/msword"]),smalltalk.send("dot", "__minus_gt", ["application/msword"]),smalltalk.send("dv", "__minus_gt", ["video/dv"]),smalltalk.send("dvi", "__minus_gt", ["application/x-dvi"]),smalltalk.send("dx", "__minus_gt", ["chemical/x-jcamp-dx"]),smalltalk.send("dxr", "__minus_gt", ["application/x-director"]),smalltalk.send("emb", "__minus_gt", ["chemical/x-embl-dl-nucleotide"]),smalltalk.send("embl", "__minus_gt", ["chemical/x-embl-dl-nucleotide"]),smalltalk.send("ent", "__minus_gt", ["chemical/x-pdb"]),smalltalk.send("eps", "__minus_gt", ["application/postscript"]),smalltalk.send("etx", "__minus_gt", ["text/x-setext"]),smalltalk.send("exe", "__minus_gt", ["application/x-msdos-program"]),smalltalk.send("ez", "__minus_gt", ["application/andrew-inset"]),smalltalk.send("fb", "__minus_gt", ["application/x-maker"]),smalltalk.send("fbdoc", "__minus_gt", ["application/x-maker"]),smalltalk.send("fch", "__minus_gt", ["chemical/x-gaussian-checkpoint"]),smalltalk.send("fchk", "__minus_gt", ["chemical/x-gaussian-checkpoint"]),smalltalk.send("fig", "__minus_gt", ["application/x-xfig"]),smalltalk.send("flac", "__minus_gt", ["application/x-flac"]),smalltalk.send("fli", "__minus_gt", ["video/fli"]),smalltalk.send("fm", "__minus_gt", ["application/x-maker"]),smalltalk.send("frame", "__minus_gt", ["application/x-maker"]),smalltalk.send("frm", "__minus_gt", ["application/x-maker"]),smalltalk.send("gal", "__minus_gt", ["chemical/x-gaussian-log"]),smalltalk.send("gam", "__minus_gt", ["chemical/x-gamess-input"]),smalltalk.send("gamin", "__minus_gt", ["chemical/x-gamess-input"]),smalltalk.send("gau", "__minus_gt", ["chemical/x-gaussian-input"]),smalltalk.send("gcd", "__minus_gt", ["text/x-pcs-gcd"]),smalltalk.send("gcf", "__minus_gt", ["application/x-graphing-calculator"]),smalltalk.send("gcg", "__minus_gt", ["chemical/x-gcg8-sequence"]),smalltalk.send("gen", "__minus_gt", ["chemical/x-genbank"]),smalltalk.send("gf", "__minus_gt", ["application/x-tex-gf"]),smalltalk.send("gif", "__minus_gt", ["image/gif"]),smalltalk.send("gjc", "__minus_gt", ["chemical/x-gaussian-input"]),smalltalk.send("gjf", "__minus_gt", ["chemical/x-gaussian-input"]),smalltalk.send("gl", "__minus_gt", ["video/gl"]),smalltalk.send("gnumeric", "__minus_gt", ["application/x-gnumeric"]),smalltalk.send("gpt", "__minus_gt", ["chemical/x-mopac-graph"]),smalltalk.send("gsf", "__minus_gt", ["application/x-font"]),smalltalk.send("gsm", "__minus_gt", ["audio/x-gsm"]),smalltalk.send("gtar", "__minus_gt", ["application/x-gtar"]),smalltalk.send("h", "__minus_gt", ["text/x-chdr"]),smalltalk.send("h++", "__minus_gt", ["text/x-c++hdr"]),smalltalk.send("hdf", "__minus_gt", ["application/x-hdf"]),smalltalk.send("hh", "__minus_gt", ["text/x-c++hdr"]),smalltalk.send("hin", "__minus_gt", ["chemical/x-hin"]),smalltalk.send("hpp", "__minus_gt", ["text/x-c++hdr"]),smalltalk.send("hqx", "__minus_gt", ["application/mac-binhex40"]),smalltalk.send("hs", "__minus_gt", ["text/x-haskell"]),smalltalk.send("hta", "__minus_gt", ["application/hta"]),smalltalk.send("htc", "__minus_gt", ["text/x-component"]),smalltalk.send("htm", "__minus_gt", ["text/html"]),smalltalk.send("html", "__minus_gt", ["text/html"]),smalltalk.send("hxx", "__minus_gt", ["text/x-c++hdr"]),smalltalk.send("ica", "__minus_gt", ["application/x-ica"]),smalltalk.send("ice", "__minus_gt", ["x-conference/x-cooltalk"]),smalltalk.send("ico", "__minus_gt", ["image/x-icon"]),smalltalk.send("ics", "__minus_gt", ["text/calendar"]),smalltalk.send("icz", "__minus_gt", ["text/calendar"]),smalltalk.send("ief", "__minus_gt", ["image/ief"]),smalltalk.send("iges", "__minus_gt", ["model/iges"]),smalltalk.send("igs", "__minus_gt", ["model/iges"]),smalltalk.send("iii", "__minus_gt", ["application/x-iphone"]),smalltalk.send("inp", "__minus_gt", ["chemical/x-gamess-input"]),smalltalk.send("ins", "__minus_gt", ["application/x-internet-signup"]),smalltalk.send("iso", "__minus_gt", ["application/x-iso9660-image"]),smalltalk.send("isp", "__minus_gt", ["application/x-internet-signup"]),smalltalk.send("ist", "__minus_gt", ["chemical/x-isostar"]),smalltalk.send("istr", "__minus_gt", ["chemical/x-isostar"]),smalltalk.send("jad", "__minus_gt", ["text/vnd.sun.j2me.app-descriptor"]),smalltalk.send("jar", "__minus_gt", ["application/java-archive"]),smalltalk.send("java", "__minus_gt", ["text/x-java"]),smalltalk.send("jdx", "__minus_gt", ["chemical/x-jcamp-dx"]),smalltalk.send("jmz", "__minus_gt", ["application/x-jmol"]),smalltalk.send("jng", "__minus_gt", ["image/x-jng"]),smalltalk.send("jnlp", "__minus_gt", ["application/x-java-jnlp-file"]),smalltalk.send("jpe", "__minus_gt", ["image/jpeg"]),smalltalk.send("jpeg", "__minus_gt", ["image/jpeg"]),smalltalk.send("jpg", "__minus_gt", ["image/jpeg"]),smalltalk.send("js", "__minus_gt", ["application/javascript"]),smalltalk.send("kar", "__minus_gt", ["audio/midi"]),smalltalk.send("key", "__minus_gt", ["application/pgp-keys"]),smalltalk.send("kil", "__minus_gt", ["application/x-killustrator"]),smalltalk.send("kin", "__minus_gt", ["chemical/x-kinemage"]),smalltalk.send("kpr", "__minus_gt", ["application/x-kpresenter"]),smalltalk.send("kpt", "__minus_gt", ["application/x-kpresenter"]),smalltalk.send("ksp", "__minus_gt", ["application/x-kspread"]),smalltalk.send("kwd", "__minus_gt", ["application/x-kword"]),smalltalk.send("kwt", "__minus_gt", ["application/x-kword"]),smalltalk.send("latex", "__minus_gt", ["application/x-latex"]),smalltalk.send("lha", "__minus_gt", ["application/x-lha"]),smalltalk.send("lhs", "__minus_gt", ["text/x-literate-haskell"]),smalltalk.send("lsf", "__minus_gt", ["video/x-la-asf"]),smalltalk.send("lsx", "__minus_gt", ["video/x-la-asf"]),smalltalk.send("ltx", "__minus_gt", ["text/x-tex"]),smalltalk.send("lzh", "__minus_gt", ["application/x-lzh"]),smalltalk.send("lzx", "__minus_gt", ["application/x-lzx"]),smalltalk.send("m3u", "__minus_gt", ["audio/x-mpegurl"]),smalltalk.send("m4a", "__minus_gt", ["audio/mpeg"]),smalltalk.send("maker", "__minus_gt", ["application/x-maker"]),smalltalk.send("man", "__minus_gt", ["application/x-troff-man"]),smalltalk.send("mcif", "__minus_gt", ["chemical/x-mmcif"]),smalltalk.send("mcm", "__minus_gt", ["chemical/x-macmolecule"]),smalltalk.send("mdb", "__minus_gt", ["application/msaccess"]),smalltalk.send("me", "__minus_gt", ["application/x-troff-me"]),smalltalk.send("mesh", "__minus_gt", ["model/mesh"]),smalltalk.send("mid", "__minus_gt", ["audio/midi"]),smalltalk.send("midi", "__minus_gt", ["audio/midi"]),smalltalk.send("mif", "__minus_gt", ["application/x-mif"]),smalltalk.send("mm", "__minus_gt", ["application/x-freemind"]),smalltalk.send("mmd", "__minus_gt", ["chemical/x-macromodel-input"]),smalltalk.send("mmf", "__minus_gt", ["application/vnd.smaf"]),smalltalk.send("mml", "__minus_gt", ["text/mathml"]),smalltalk.send("mmod", "__minus_gt", ["chemical/x-macromodel-input"]),smalltalk.send("mng", "__minus_gt", ["video/x-mng"]),smalltalk.send("moc", "__minus_gt", ["text/x-moc"]),smalltalk.send("mol", "__minus_gt", ["chemical/x-mdl-molfile"]),smalltalk.send("mol2", "__minus_gt", ["chemical/x-mol2"]),smalltalk.send("moo", "__minus_gt", ["chemical/x-mopac-out"]),smalltalk.send("mop", "__minus_gt", ["chemical/x-mopac-input"]),smalltalk.send("mopcrt", "__minus_gt", ["chemical/x-mopac-input"]),smalltalk.send("mov", "__minus_gt", ["video/quicktime"]),smalltalk.send("movie", "__minus_gt", ["video/x-sgi-movie"]),smalltalk.send("mp2", "__minus_gt", ["audio/mpeg"]),smalltalk.send("mp3", "__minus_gt", ["audio/mpeg"]),smalltalk.send("mp4", "__minus_gt", ["video/mp4"]),smalltalk.send("mpc", "__minus_gt", ["chemical/x-mopac-input"]),smalltalk.send("mpe", "__minus_gt", ["video/mpeg"]),smalltalk.send("mpeg", "__minus_gt", ["video/mpeg"]),smalltalk.send("mpega", "__minus_gt", ["audio/mpeg"]),smalltalk.send("mpg", "__minus_gt", ["video/mpeg"]),smalltalk.send("mpga", "__minus_gt", ["audio/mpeg"]),smalltalk.send("ms", "__minus_gt", ["application/x-troff-ms"]),smalltalk.send("msh", "__minus_gt", ["model/mesh"]),smalltalk.send("msi", "__minus_gt", ["application/x-msi"]),smalltalk.send("mvb", "__minus_gt", ["chemical/x-mopac-vib"]),smalltalk.send("mxu", "__minus_gt", ["video/vnd.mpegurl"]),smalltalk.send("nb", "__minus_gt", ["application/mathematica"]),smalltalk.send("nc", "__minus_gt", ["application/x-netcdf"]),smalltalk.send("nwc", "__minus_gt", ["application/x-nwc"]),smalltalk.send("o", "__minus_gt", ["application/x-object"]),smalltalk.send("oda", "__minus_gt", ["application/oda"]),smalltalk.send("odb", "__minus_gt", ["application/vnd.oasis.opendocument.database"]),smalltalk.send("odc", "__minus_gt", ["application/vnd.oasis.opendocument.chart"]),smalltalk.send("odf", "__minus_gt", ["application/vnd.oasis.opendocument.formula"]),smalltalk.send("odg", "__minus_gt", ["application/vnd.oasis.opendocument.graphics"]),smalltalk.send("odi", "__minus_gt", ["application/vnd.oasis.opendocument.image"]),smalltalk.send("odm", "__minus_gt", ["application/vnd.oasis.opendocument.text-master"]),smalltalk.send("odp", "__minus_gt", ["application/vnd.oasis.opendocument.presentation"]),smalltalk.send("ods", "__minus_gt", ["application/vnd.oasis.opendocument.spreadsheet"]),smalltalk.send("odt", "__minus_gt", ["application/vnd.oasis.opendocument.text"]),smalltalk.send("ogg", "__minus_gt", ["application/ogg"]),smalltalk.send("old", "__minus_gt", ["application/x-trash"]),smalltalk.send("oth", "__minus_gt", ["application/vnd.oasis.opendocument.text-web"]),smalltalk.send("oza", "__minus_gt", ["application/x-oz-application"]),smalltalk.send("p", "__minus_gt", ["text/x-pascal"]),smalltalk.send("p7r", "__minus_gt", ["application/x-pkcs7-certreqresp"]),smalltalk.send("pac", "__minus_gt", ["application/x-ns-proxy-autoconfig"]),smalltalk.send("pas", "__minus_gt", ["text/x-pascal"]),smalltalk.send("pat", "__minus_gt", ["image/x-coreldrawpattern"]),smalltalk.send("pbm", "__minus_gt", ["image/x-portable-bitmap"]),smalltalk.send("pcf", "__minus_gt", ["application/x-font"]),smalltalk.send("pcf.Z", "__minus_gt", ["application/x-font"]),smalltalk.send("pcx", "__minus_gt", ["image/pcx"]),smalltalk.send("pdb", "__minus_gt", ["chemical/x-pdb"]),smalltalk.send("pdf", "__minus_gt", ["application/pdf"]),smalltalk.send("pfa", "__minus_gt", ["application/x-font"]),smalltalk.send("pfb", "__minus_gt", ["application/x-font"]),smalltalk.send("pgm", "__minus_gt", ["image/x-portable-graymap"]),smalltalk.send("pgn", "__minus_gt", ["application/x-chess-pgn"]),smalltalk.send("pgp", "__minus_gt", ["application/pgp-signature"]),smalltalk.send("pk", "__minus_gt", ["application/x-tex-pk"]),smalltalk.send("pl", "__minus_gt", ["text/x-perl"]),smalltalk.send("pls", "__minus_gt", ["audio/x-scpls"]),smalltalk.send("pm", "__minus_gt", ["text/x-perl"]),smalltalk.send("png", "__minus_gt", ["image/png"]),smalltalk.send("pnm", "__minus_gt", ["image/x-portable-anymap"]),smalltalk.send("pot", "__minus_gt", ["text/plain"]),smalltalk.send("ppm", "__minus_gt", ["image/x-portable-pixmap"]),smalltalk.send("pps", "__minus_gt", ["application/vnd.ms-powerpoint"]),smalltalk.send("ppt", "__minus_gt", ["application/vnd.ms-powerpoint"]),smalltalk.send("prf", "__minus_gt", ["application/pics-rules"]),smalltalk.send("prt", "__minus_gt", ["chemical/x-ncbi-asn1-ascii"]),smalltalk.send("ps", "__minus_gt", ["application/postscript"]),smalltalk.send("psd", "__minus_gt", ["image/x-photoshop"]),smalltalk.send("psp", "__minus_gt", ["text/x-psp"]),smalltalk.send("py", "__minus_gt", ["text/x-python"]),smalltalk.send("pyc", "__minus_gt", ["application/x-python-code"]),smalltalk.send("pyo", "__minus_gt", ["application/x-python-code"]),smalltalk.send("qt", "__minus_gt", ["video/quicktime"]),smalltalk.send("qtl", "__minus_gt", ["application/x-quicktimeplayer"]),smalltalk.send("ra", "__minus_gt", ["audio/x-realaudio"]),smalltalk.send("ram", "__minus_gt", ["audio/x-pn-realaudio"]),smalltalk.send("rar", "__minus_gt", ["application/rar"]),smalltalk.send("ras", "__minus_gt", ["image/x-cmu-raster"]),smalltalk.send("rd", "__minus_gt", ["chemical/x-mdl-rdfile"]),smalltalk.send("rdf", "__minus_gt", ["application/rdf+xml"]),smalltalk.send("rgb", "__minus_gt", ["image/x-rgb"]),smalltalk.send("rm", "__minus_gt", ["audio/x-pn-realaudio"]),smalltalk.send("roff", "__minus_gt", ["application/x-troff"]),smalltalk.send("ros", "__minus_gt", ["chemical/x-rosdal"]),smalltalk.send("rpm", "__minus_gt", ["application/x-redhat-package-manager"]),smalltalk.send("rss", "__minus_gt", ["application/rss+xml"]),smalltalk.send("rtf", "__minus_gt", ["text/rtf"]),smalltalk.send("rtx", "__minus_gt", ["text/richtext"]),smalltalk.send("rxn", "__minus_gt", ["chemical/x-mdl-rxnfile"]),smalltalk.send("sct", "__minus_gt", ["text/scriptlet"]),smalltalk.send("sd", "__minus_gt", ["chemical/x-mdl-sdfile"]),smalltalk.send("sd2", "__minus_gt", ["audio/x-sd2"]),smalltalk.send("sda", "__minus_gt", ["application/vnd.stardivision.draw"]),smalltalk.send("sdc", "__minus_gt", ["application/vnd.stardivision.calc"]),smalltalk.send("sdd", "__minus_gt", ["application/vnd.stardivision.impress"]),smalltalk.send("sdf", "__minus_gt", ["chemical/x-mdl-sdfile"]),smalltalk.send("sdp", "__minus_gt", ["application/vnd.stardivision.impress"]),smalltalk.send("sdw", "__minus_gt", ["application/vnd.stardivision.writer"]),smalltalk.send("ser", "__minus_gt", ["application/java-serialized-object"]),smalltalk.send("sgf", "__minus_gt", ["application/x-go-sgf"]),smalltalk.send("sgl", "__minus_gt", ["application/vnd.stardivision.writer-global"]),smalltalk.send("sh", "__minus_gt", ["text/x-sh"]),smalltalk.send("shar", "__minus_gt", ["application/x-shar"]),smalltalk.send("shtml", "__minus_gt", ["text/html"]),smalltalk.send("sid", "__minus_gt", ["audio/prs.sid"]),smalltalk.send("sik", "__minus_gt", ["application/x-trash"]),smalltalk.send("silo", "__minus_gt", ["model/mesh"]),smalltalk.send("sis", "__minus_gt", ["application/vnd.symbian.install"]),smalltalk.send("sit", "__minus_gt", ["application/x-stuffit"]),smalltalk.send("skd", "__minus_gt", ["application/x-koan"]),smalltalk.send("skm", "__minus_gt", ["application/x-koan"]),smalltalk.send("skp", "__minus_gt", ["application/x-koan"]),smalltalk.send("skt", "__minus_gt", ["application/x-koan"]),smalltalk.send("smf", "__minus_gt", ["application/vnd.stardivision.math"]),smalltalk.send("smi", "__minus_gt", ["application/smil"]),smalltalk.send("smil", "__minus_gt", ["application/smil"]),smalltalk.send("snd", "__minus_gt", ["audio/basic"]),smalltalk.send("spc", "__minus_gt", ["chemical/x-galactic-spc"]),smalltalk.send("spl", "__minus_gt", ["application/x-futuresplash"]),smalltalk.send("src", "__minus_gt", ["application/x-wais-source"]),smalltalk.send("stc", "__minus_gt", ["application/vnd.sun.xml.calc.template"]),smalltalk.send("std", "__minus_gt", ["application/vnd.sun.xml.draw.template"]),smalltalk.send("sti", "__minus_gt", ["application/vnd.sun.xml.impress.template"]),smalltalk.send("stl", "__minus_gt", ["application/vnd.ms-pki.stl"]),smalltalk.send("stw", "__minus_gt", ["application/vnd.sun.xml.writer.template"]),smalltalk.send("sty", "__minus_gt", ["text/x-tex"]),smalltalk.send("sv4cpio", "__minus_gt", ["application/x-sv4cpio"]),smalltalk.send("sv4crc", "__minus_gt", ["application/x-sv4crc"]),smalltalk.send("svg", "__minus_gt", ["image/svg+xml"]),smalltalk.send("svgz", "__minus_gt", ["image/svg+xml"]),smalltalk.send("sw", "__minus_gt", ["chemical/x-swissprot"]),smalltalk.send("swf", "__minus_gt", ["application/x-shockwave-flash"]),smalltalk.send("swfl", "__minus_gt", ["application/x-shockwave-flash"]),smalltalk.send("sxc", "__minus_gt", ["application/vnd.sun.xml.calc"]),smalltalk.send("sxd", "__minus_gt", ["application/vnd.sun.xml.draw"]),smalltalk.send("sxg", "__minus_gt", ["application/vnd.sun.xml.writer.global"]),smalltalk.send("sxi", "__minus_gt", ["application/vnd.sun.xml.impress"]),smalltalk.send("sxm", "__minus_gt", ["application/vnd.sun.xml.math"]),smalltalk.send("sxw", "__minus_gt", ["application/vnd.sun.xml.writer"]),smalltalk.send("t", "__minus_gt", ["application/x-troff"]),smalltalk.send("tar", "__minus_gt", ["application/x-tar"]),smalltalk.send("taz", "__minus_gt", ["application/x-gtar"]),smalltalk.send("tcl", "__minus_gt", ["text/x-tcl"]),smalltalk.send("tex", "__minus_gt", ["text/x-tex"]),smalltalk.send("texi", "__minus_gt", ["application/x-texinfo"]),smalltalk.send("texinfo", "__minus_gt", ["application/x-texinfo"]),smalltalk.send("text", "__minus_gt", ["text/plain"]),smalltalk.send("tgf", "__minus_gt", ["chemical/x-mdl-tgf"]),smalltalk.send("tgz", "__minus_gt", ["application/x-gtar"]),smalltalk.send("tif", "__minus_gt", ["image/tiff"]),smalltalk.send("tiff", "__minus_gt", ["image/tiff"]),smalltalk.send("tk", "__minus_gt", ["text/x-tcl"]),smalltalk.send("tm", "__minus_gt", ["text/texmacs"]),smalltalk.send("torrent", "__minus_gt", ["application/x-bittorrent"]),smalltalk.send("tr", "__minus_gt", ["application/x-troff"]),smalltalk.send("ts", "__minus_gt", ["text/texmacs"]),smalltalk.send("tsp", "__minus_gt", ["application/dsptype"]),smalltalk.send("tsv", "__minus_gt", ["text/tab-separated-values"]),smalltalk.send("txt", "__minus_gt", ["text/plain"]),smalltalk.send("udeb", "__minus_gt", ["application/x-debian-package"]),smalltalk.send("uls", "__minus_gt", ["text/iuls"]),smalltalk.send("ustar", "__minus_gt", ["application/x-ustar"]),smalltalk.send("val", "__minus_gt", ["chemical/x-ncbi-asn1-binary"]),smalltalk.send("vcd", "__minus_gt", ["application/x-cdlink"]),smalltalk.send("vcf", "__minus_gt", ["text/x-vcard"]),smalltalk.send("vcs", "__minus_gt", ["text/x-vcalendar"]),smalltalk.send("vmd", "__minus_gt", ["chemical/x-vmd"]),smalltalk.send("vms", "__minus_gt", ["chemical/x-vamas-iso14976"]),smalltalk.send("vor", "__minus_gt", ["application/vnd.stardivision.writer"]),smalltalk.send("vrm", "__minus_gt", ["x-world/x-vrml"]),smalltalk.send("vrml", "__minus_gt", ["x-world/x-vrml"]),smalltalk.send("vsd", "__minus_gt", ["application/vnd.visio"]),smalltalk.send("wad", "__minus_gt", ["application/x-doom"]),smalltalk.send("wav", "__minus_gt", ["audio/x-wav"]),smalltalk.send("wax", "__minus_gt", ["audio/x-ms-wax"]),smalltalk.send("wbmp", "__minus_gt", ["image/vnd.wap.wbmp"]),smalltalk.send("wbxml", "__minus_gt", ["application/vnd.wap.wbxml"]),smalltalk.send("wk", "__minus_gt", ["application/x-123"]),smalltalk.send("wm", "__minus_gt", ["video/x-ms-wm"]),smalltalk.send("wma", "__minus_gt", ["audio/x-ms-wma"]),smalltalk.send("wmd", "__minus_gt", ["application/x-ms-wmd"]),smalltalk.send("wml", "__minus_gt", ["text/vnd.wap.wml"]),smalltalk.send("wmlc", "__minus_gt", ["application/vnd.wap.wmlc"]),smalltalk.send("wmls", "__minus_gt", ["text/vnd.wap.wmlscript"]),smalltalk.send("wmlsc", "__minus_gt", ["application/vnd.wap.wmlscriptc"]),smalltalk.send("wmv", "__minus_gt", ["video/x-ms-wmv"]),smalltalk.send("wmx", "__minus_gt", ["video/x-ms-wmx"]),smalltalk.send("wmz", "__minus_gt", ["application/x-ms-wmz"]),smalltalk.send("wp5", "__minus_gt", ["application/wordperfect5.1"]),smalltalk.send("wpd", "__minus_gt", ["application/wordperfect"]),smalltalk.send("wrl", "__minus_gt", ["x-world/x-vrml"]),smalltalk.send("wsc", "__minus_gt", ["text/scriptlet"]),smalltalk.send("wvx", "__minus_gt", ["video/x-ms-wvx"]),smalltalk.send("wz", "__minus_gt", ["application/x-wingz"]),smalltalk.send("xbm", "__minus_gt", ["image/x-xbitmap"]),smalltalk.send("xcf", "__minus_gt", ["application/x-xcf"]),smalltalk.send("xht", "__minus_gt", ["application/xhtml+xml"]),smalltalk.send("xhtml", "__minus_gt", ["application/xhtml+xml"]),smalltalk.send("xlb", "__minus_gt", ["application/vnd.ms-excel"]),smalltalk.send("xls", "__minus_gt", ["application/vnd.ms-excel"]),smalltalk.send("xlt", "__minus_gt", ["application/vnd.ms-excel"]),smalltalk.send("xml", "__minus_gt", ["application/xml"]),smalltalk.send("xpi", "__minus_gt", ["application/x-xpinstall"]),smalltalk.send("xpm", "__minus_gt", ["image/x-xpixmap"]),smalltalk.send("xsl", "__minus_gt", ["application/xml"]),smalltalk.send("xtel", "__minus_gt", ["chemical/x-xtel"]),smalltalk.send("xul", "__minus_gt", ["application/vnd.mozilla.xul+xml"]),smalltalk.send("xwd", "__minus_gt", ["image/x-xwindowdump"]),smalltalk.send("xyz", "__minus_gt", ["chemical/x-xyz"]),smalltalk.send("zip", "__minus_gt", ["application/zip"]),smalltalk.send("zmt", "__minus_gt", ["chemical/x-mopac-input"]),smalltalk.send("~", "__minus_gt", ["application/x-trash"])]);
return self;},
args: [],
source: "defaultMimeTypes\x0a\x09^ #{\x0a\x09\x09'%' -> 'application/x-trash'.\x0a\x09\x09'323' -> 'text/h323'.\x0a\x09\x09'abw' -> 'application/x-abiword'.\x0a\x09\x09'ai' -> 'application/postscript'.\x0a\x09\x09'aif' -> 'audio/x-aiff'.\x0a\x09\x09'aifc' -> 'audio/x-aiff'.\x0a\x09\x09'aiff' -> 'audio/x-aiff'.\x0a\x09\x09'alc' -> 'chemical/x-alchemy'.\x0a\x09\x09'art' -> 'image/x-jg'.\x0a\x09\x09'asc' -> 'text/plain'.\x0a\x09\x09'asf' -> 'video/x-ms-asf'.\x0a\x09\x09'asn' -> 'chemical/x-ncbi-asn1-spec'.\x0a\x09\x09'aso' -> 'chemical/x-ncbi-asn1-binary'.\x0a\x09\x09'asx' -> 'video/x-ms-asf'.\x0a\x09\x09'au' -> 'audio/basic'.\x0a\x09\x09'avi' -> 'video/x-msvideo'.\x0a\x09\x09'b' -> 'chemical/x-molconn-Z'.\x0a\x09\x09'bak' -> 'application/x-trash'.\x0a\x09\x09'bat' -> 'application/x-msdos-program'.\x0a\x09\x09'bcpio' -> 'application/x-bcpio'.\x0a\x09\x09'bib' -> 'text/x-bibtex'.\x0a\x09\x09'bin' -> 'application/octet-stream'.\x0a\x09\x09'bmp' -> 'image/x-ms-bmp'.\x0a\x09\x09'book' -> 'application/x-maker'.\x0a\x09\x09'bsd' -> 'chemical/x-crossfire'.\x0a\x09\x09'c' -> 'text/x-csrc'.\x0a\x09\x09'c++' -> 'text/x-c++src'.\x0a\x09\x09'c3d' -> 'chemical/x-chem3d'.\x0a\x09\x09'cac' -> 'chemical/x-cache'.\x0a\x09\x09'cache' -> 'chemical/x-cache'.\x0a\x09\x09'cascii' -> 'chemical/x-cactvs-binary'.\x0a\x09\x09'cat' -> 'application/vnd.ms-pki.seccat'.\x0a\x09\x09'cbin' -> 'chemical/x-cactvs-binary'.\x0a\x09\x09'cc' -> 'text/x-c++src'.\x0a\x09\x09'cdf' -> 'application/x-cdf'.\x0a\x09\x09'cdr' -> 'image/x-coreldraw'.\x0a\x09\x09'cdt' -> 'image/x-coreldrawtemplate'.\x0a\x09\x09'cdx' -> 'chemical/x-cdx'.\x0a\x09\x09'cdy' -> 'application/vnd.cinderella'.\x0a\x09\x09'cef' -> 'chemical/x-cxf'.\x0a\x09\x09'cer' -> 'chemical/x-cerius'.\x0a\x09\x09'chm' -> 'chemical/x-chemdraw'.\x0a\x09\x09'chrt' -> 'application/x-kchart'.\x0a\x09\x09'cif' -> 'chemical/x-cif'.\x0a\x09\x09'class' -> 'application/java-vm'.\x0a\x09\x09'cls' -> 'text/x-tex'.\x0a\x09\x09'cmdf' -> 'chemical/x-cmdf'.\x0a\x09\x09'cml' -> 'chemical/x-cml'.\x0a\x09\x09'cod' -> 'application/vnd.rim.cod'.\x0a\x09\x09'com' -> 'application/x-msdos-program'.\x0a\x09\x09'cpa' -> 'chemical/x-compass'.\x0a\x09\x09'cpio' -> 'application/x-cpio'.\x0a\x09\x09'cpp' -> 'text/x-c++src'.\x0a\x09\x09'cpt' -> 'image/x-corelphotopaint'.\x0a\x09\x09'crl' -> 'application/x-pkcs7-crl'.\x0a\x09\x09'crt' -> 'application/x-x509-ca-cert'.\x0a\x09\x09'csf' -> 'chemical/x-cache-csf'.\x0a\x09\x09'csh' -> 'text/x-csh'.\x0a\x09\x09'csm' -> 'chemical/x-csml'.\x0a\x09\x09'csml' -> 'chemical/x-csml'.\x0a\x09\x09'css' -> 'text/css'.\x0a\x09\x09'csv' -> 'text/comma-separated-values'.\x0a\x09\x09'ctab' -> 'chemical/x-cactvs-binary'.\x0a\x09\x09'ctx' -> 'chemical/x-ctx'.\x0a\x09\x09'cu' -> 'application/cu-seeme'.\x0a\x09\x09'cub' -> 'chemical/x-gaussian-cube'.\x0a\x09\x09'cxf' -> 'chemical/x-cxf'.\x0a\x09\x09'cxx' -> 'text/x-c++src'.\x0a\x09\x09'dat' -> 'chemical/x-mopac-input'.\x0a\x09\x09'dcr' -> 'application/x-director'.\x0a\x09\x09'deb' -> 'application/x-debian-package'.\x0a\x09\x09'dif' -> 'video/dv'.\x0a\x09\x09'diff' -> 'text/plain'.\x0a\x09\x09'dir' -> 'application/x-director'.\x0a\x09\x09'djv' -> 'image/vnd.djvu'.\x0a\x09\x09'djvu' -> 'image/vnd.djvu'.\x0a\x09\x09'dl' -> 'video/dl'.\x0a\x09\x09'dll' -> 'application/x-msdos-program'.\x0a\x09\x09'dmg' -> 'application/x-apple-diskimage'.\x0a\x09\x09'dms' -> 'application/x-dms'.\x0a\x09\x09'doc' -> 'application/msword'.\x0a\x09\x09'dot' -> 'application/msword'.\x0a\x09\x09'dv' -> 'video/dv'.\x0a\x09\x09'dvi' -> 'application/x-dvi'.\x0a\x09\x09'dx' -> 'chemical/x-jcamp-dx'.\x0a\x09\x09'dxr' -> 'application/x-director'.\x0a\x09\x09'emb' -> 'chemical/x-embl-dl-nucleotide'.\x0a\x09\x09'embl' -> 'chemical/x-embl-dl-nucleotide'.\x0a\x09\x09'ent' -> 'chemical/x-pdb'.\x0a\x09\x09'eps' -> 'application/postscript'.\x0a\x09\x09'etx' -> 'text/x-setext'.\x0a\x09\x09'exe' -> 'application/x-msdos-program'.\x0a\x09\x09'ez' -> 'application/andrew-inset'.\x0a\x09\x09'fb' -> 'application/x-maker'.\x0a\x09\x09'fbdoc' -> 'application/x-maker'.\x0a\x09\x09'fch' -> 'chemical/x-gaussian-checkpoint'.\x0a\x09\x09'fchk' -> 'chemical/x-gaussian-checkpoint'.\x0a\x09\x09'fig' -> 'application/x-xfig'.\x0a\x09\x09'flac' -> 'application/x-flac'.\x0a\x09\x09'fli' -> 'video/fli'.\x0a\x09\x09'fm' -> 'application/x-maker'.\x0a\x09\x09'frame' -> 'application/x-maker'.\x0a\x09\x09'frm' -> 'application/x-maker'.\x0a\x09\x09'gal' -> 'chemical/x-gaussian-log'.\x0a\x09\x09'gam' -> 'chemical/x-gamess-input'.\x0a\x09\x09'gamin' -> 'chemical/x-gamess-input'.\x0a\x09\x09'gau' -> 'chemical/x-gaussian-input'.\x0a\x09\x09'gcd' -> 'text/x-pcs-gcd'.\x0a\x09\x09'gcf' -> 'application/x-graphing-calculator'.\x0a\x09\x09'gcg' -> 'chemical/x-gcg8-sequence'.\x0a\x09\x09'gen' -> 'chemical/x-genbank'.\x0a\x09\x09'gf' -> 'application/x-tex-gf'.\x0a\x09\x09'gif' -> 'image/gif'.\x0a\x09\x09'gjc' -> 'chemical/x-gaussian-input'.\x0a\x09\x09'gjf' -> 'chemical/x-gaussian-input'.\x0a\x09\x09'gl' -> 'video/gl'.\x0a\x09\x09'gnumeric' -> 'application/x-gnumeric'.\x0a\x09\x09'gpt' -> 'chemical/x-mopac-graph'.\x0a\x09\x09'gsf' -> 'application/x-font'.\x0a\x09\x09'gsm' -> 'audio/x-gsm'.\x0a\x09\x09'gtar' -> 'application/x-gtar'.\x0a\x09\x09'h' -> 'text/x-chdr'.\x0a\x09\x09'h++' -> 'text/x-c++hdr'.\x0a\x09\x09'hdf' -> 'application/x-hdf'.\x0a\x09\x09'hh' -> 'text/x-c++hdr'.\x0a\x09\x09'hin' -> 'chemical/x-hin'.\x0a\x09\x09'hpp' -> 'text/x-c++hdr'.\x0a\x09\x09'hqx' -> 'application/mac-binhex40'.\x0a\x09\x09'hs' -> 'text/x-haskell'.\x0a\x09\x09'hta' -> 'application/hta'.\x0a\x09\x09'htc' -> 'text/x-component'.\x0a\x09\x09'htm' -> 'text/html'.\x0a\x09\x09'html' -> 'text/html'.\x0a\x09\x09'hxx' -> 'text/x-c++hdr'.\x0a\x09\x09'ica' -> 'application/x-ica'.\x0a\x09\x09'ice' -> 'x-conference/x-cooltalk'.\x0a\x09\x09'ico' -> 'image/x-icon'.\x0a\x09\x09'ics' -> 'text/calendar'.\x0a\x09\x09'icz' -> 'text/calendar'.\x0a\x09\x09'ief' -> 'image/ief'.\x0a\x09\x09'iges' -> 'model/iges'.\x0a\x09\x09'igs' -> 'model/iges'.\x0a\x09\x09'iii' -> 'application/x-iphone'.\x0a\x09\x09'inp' -> 'chemical/x-gamess-input'.\x0a\x09\x09'ins' -> 'application/x-internet-signup'.\x0a\x09\x09'iso' -> 'application/x-iso9660-image'.\x0a\x09\x09'isp' -> 'application/x-internet-signup'.\x0a\x09\x09'ist' -> 'chemical/x-isostar'.\x0a\x09\x09'istr' -> 'chemical/x-isostar'.\x0a\x09\x09'jad' -> 'text/vnd.sun.j2me.app-descriptor'.\x0a\x09\x09'jar' -> 'application/java-archive'.\x0a\x09\x09'java' -> 'text/x-java'.\x0a\x09\x09'jdx' -> 'chemical/x-jcamp-dx'.\x0a\x09\x09'jmz' -> 'application/x-jmol'.\x0a\x09\x09'jng' -> 'image/x-jng'.\x0a\x09\x09'jnlp' -> 'application/x-java-jnlp-file'.\x0a\x09\x09'jpe' -> 'image/jpeg'.\x0a\x09\x09'jpeg' -> 'image/jpeg'.\x0a\x09\x09'jpg' -> 'image/jpeg'.\x0a\x09\x09'js' -> 'application/javascript'.\x0a\x09\x09'kar' -> 'audio/midi'.\x0a\x09\x09'key' -> 'application/pgp-keys'.\x0a\x09\x09'kil' -> 'application/x-killustrator'.\x0a\x09\x09'kin' -> 'chemical/x-kinemage'.\x0a\x09\x09'kpr' -> 'application/x-kpresenter'.\x0a\x09\x09'kpt' -> 'application/x-kpresenter'.\x0a\x09\x09'ksp' -> 'application/x-kspread'.\x0a\x09\x09'kwd' -> 'application/x-kword'.\x0a\x09\x09'kwt' -> 'application/x-kword'.\x0a\x09\x09'latex' -> 'application/x-latex'.\x0a\x09\x09'lha' -> 'application/x-lha'.\x0a\x09\x09'lhs' -> 'text/x-literate-haskell'.\x0a\x09\x09'lsf' -> 'video/x-la-asf'.\x0a\x09\x09'lsx' -> 'video/x-la-asf'.\x0a\x09\x09'ltx' -> 'text/x-tex'.\x0a\x09\x09'lzh' -> 'application/x-lzh'.\x0a\x09\x09'lzx' -> 'application/x-lzx'.\x0a\x09\x09'm3u' -> 'audio/x-mpegurl'.\x0a\x09\x09'm4a' -> 'audio/mpeg'.\x0a\x09\x09'maker' -> 'application/x-maker'.\x0a\x09\x09'man' -> 'application/x-troff-man'.\x0a\x09\x09'mcif' -> 'chemical/x-mmcif'.\x0a\x09\x09'mcm' -> 'chemical/x-macmolecule'.\x0a\x09\x09'mdb' -> 'application/msaccess'.\x0a\x09\x09'me' -> 'application/x-troff-me'.\x0a\x09\x09'mesh' -> 'model/mesh'.\x0a\x09\x09'mid' -> 'audio/midi'.\x0a\x09\x09'midi' -> 'audio/midi'.\x0a\x09\x09'mif' -> 'application/x-mif'.\x0a\x09\x09'mm' -> 'application/x-freemind'.\x0a\x09\x09'mmd' -> 'chemical/x-macromodel-input'.\x0a\x09\x09'mmf' -> 'application/vnd.smaf'.\x0a\x09\x09'mml' -> 'text/mathml'.\x0a\x09\x09'mmod' -> 'chemical/x-macromodel-input'.\x0a\x09\x09'mng' -> 'video/x-mng'.\x0a\x09\x09'moc' -> 'text/x-moc'.\x0a\x09\x09'mol' -> 'chemical/x-mdl-molfile'.\x0a\x09\x09'mol2' -> 'chemical/x-mol2'.\x0a\x09\x09'moo' -> 'chemical/x-mopac-out'.\x0a\x09\x09'mop' -> 'chemical/x-mopac-input'.\x0a\x09\x09'mopcrt' -> 'chemical/x-mopac-input'.\x0a\x09\x09'mov' -> 'video/quicktime'.\x0a\x09\x09'movie' -> 'video/x-sgi-movie'.\x0a\x09\x09'mp2' -> 'audio/mpeg'.\x0a\x09\x09'mp3' -> 'audio/mpeg'.\x0a\x09\x09'mp4' -> 'video/mp4'.\x0a\x09\x09'mpc' -> 'chemical/x-mopac-input'.\x0a\x09\x09'mpe' -> 'video/mpeg'.\x0a\x09\x09'mpeg' -> 'video/mpeg'.\x0a\x09\x09'mpega' -> 'audio/mpeg'.\x0a\x09\x09'mpg' -> 'video/mpeg'.\x0a\x09\x09'mpga' -> 'audio/mpeg'.\x0a\x09\x09'ms' -> 'application/x-troff-ms'.\x0a\x09\x09'msh' -> 'model/mesh'.\x0a\x09\x09'msi' -> 'application/x-msi'.\x0a\x09\x09'mvb' -> 'chemical/x-mopac-vib'.\x0a\x09\x09'mxu' -> 'video/vnd.mpegurl'.\x0a\x09\x09'nb' -> 'application/mathematica'.\x0a\x09\x09'nc' -> 'application/x-netcdf'.\x0a\x09\x09'nwc' -> 'application/x-nwc'.\x0a\x09\x09'o' -> 'application/x-object'.\x0a\x09\x09'oda' -> 'application/oda'.\x0a\x09\x09'odb' -> 'application/vnd.oasis.opendocument.database'.\x0a\x09\x09'odc' -> 'application/vnd.oasis.opendocument.chart'.\x0a\x09\x09'odf' -> 'application/vnd.oasis.opendocument.formula'.\x0a\x09\x09'odg' -> 'application/vnd.oasis.opendocument.graphics'.\x0a\x09\x09'odi' -> 'application/vnd.oasis.opendocument.image'.\x0a\x09\x09'odm' -> 'application/vnd.oasis.opendocument.text-master'.\x0a\x09\x09'odp' -> 'application/vnd.oasis.opendocument.presentation'.\x0a\x09\x09'ods' -> 'application/vnd.oasis.opendocument.spreadsheet'.\x0a\x09\x09'odt' -> 'application/vnd.oasis.opendocument.text'.\x0a\x09\x09'ogg' -> 'application/ogg'.\x0a\x09\x09'old' -> 'application/x-trash'.\x0a\x09\x09'oth' -> 'application/vnd.oasis.opendocument.text-web'.\x0a\x09\x09'oza' -> 'application/x-oz-application'.\x0a\x09\x09'p' -> 'text/x-pascal'.\x0a\x09\x09'p7r' -> 'application/x-pkcs7-certreqresp'.\x0a\x09\x09'pac' -> 'application/x-ns-proxy-autoconfig'.\x0a\x09\x09'pas' -> 'text/x-pascal'.\x0a\x09\x09'pat' -> 'image/x-coreldrawpattern'.\x0a\x09\x09'pbm' -> 'image/x-portable-bitmap'.\x0a\x09\x09'pcf' -> 'application/x-font'.\x0a\x09\x09'pcf.Z' -> 'application/x-font'.\x0a\x09\x09'pcx' -> 'image/pcx'.\x0a\x09\x09'pdb' -> 'chemical/x-pdb'.\x0a\x09\x09'pdf' -> 'application/pdf'.\x0a\x09\x09'pfa' -> 'application/x-font'.\x0a\x09\x09'pfb' -> 'application/x-font'.\x0a\x09\x09'pgm' -> 'image/x-portable-graymap'.\x0a\x09\x09'pgn' -> 'application/x-chess-pgn'.\x0a\x09\x09'pgp' -> 'application/pgp-signature'.\x0a\x09\x09'pk' -> 'application/x-tex-pk'.\x0a\x09\x09'pl' -> 'text/x-perl'.\x0a\x09\x09'pls' -> 'audio/x-scpls'.\x0a\x09\x09'pm' -> 'text/x-perl'.\x0a\x09\x09'png' -> 'image/png'.\x0a\x09\x09'pnm' -> 'image/x-portable-anymap'.\x0a\x09\x09'pot' -> 'text/plain'.\x0a\x09\x09'ppm' -> 'image/x-portable-pixmap'.\x0a\x09\x09'pps' -> 'application/vnd.ms-powerpoint'.\x0a\x09\x09'ppt' -> 'application/vnd.ms-powerpoint'.\x0a\x09\x09'prf' -> 'application/pics-rules'.\x0a\x09\x09'prt' -> 'chemical/x-ncbi-asn1-ascii'.\x0a\x09\x09'ps' -> 'application/postscript'.\x0a\x09\x09'psd' -> 'image/x-photoshop'.\x0a\x09\x09'psp' -> 'text/x-psp'.\x0a\x09\x09'py' -> 'text/x-python'.\x0a\x09\x09'pyc' -> 'application/x-python-code'.\x0a\x09\x09'pyo' -> 'application/x-python-code'.\x0a\x09\x09'qt' -> 'video/quicktime'.\x0a\x09\x09'qtl' -> 'application/x-quicktimeplayer'.\x0a\x09\x09'ra' -> 'audio/x-realaudio'.\x0a\x09\x09'ram' -> 'audio/x-pn-realaudio'.\x0a\x09\x09'rar' -> 'application/rar'.\x0a\x09\x09'ras' -> 'image/x-cmu-raster'.\x0a\x09\x09'rd' -> 'chemical/x-mdl-rdfile'.\x0a\x09\x09'rdf' -> 'application/rdf+xml'.\x0a\x09\x09'rgb' -> 'image/x-rgb'.\x0a\x09\x09'rm' -> 'audio/x-pn-realaudio'.\x0a\x09\x09'roff' -> 'application/x-troff'.\x0a\x09\x09'ros' -> 'chemical/x-rosdal'.\x0a\x09\x09'rpm' -> 'application/x-redhat-package-manager'.\x0a\x09\x09'rss' -> 'application/rss+xml'.\x0a\x09\x09'rtf' -> 'text/rtf'.\x0a\x09\x09'rtx' -> 'text/richtext'.\x0a\x09\x09'rxn' -> 'chemical/x-mdl-rxnfile'.\x0a\x09\x09'sct' -> 'text/scriptlet'.\x0a\x09\x09'sd' -> 'chemical/x-mdl-sdfile'.\x0a\x09\x09'sd2' -> 'audio/x-sd2'.\x0a\x09\x09'sda' -> 'application/vnd.stardivision.draw'.\x0a\x09\x09'sdc' -> 'application/vnd.stardivision.calc'.\x0a\x09\x09'sdd' -> 'application/vnd.stardivision.impress'.\x0a\x09\x09'sdf' -> 'chemical/x-mdl-sdfile'.\x0a\x09\x09'sdp' -> 'application/vnd.stardivision.impress'.\x0a\x09\x09'sdw' -> 'application/vnd.stardivision.writer'.\x0a\x09\x09'ser' -> 'application/java-serialized-object'.\x0a\x09\x09'sgf' -> 'application/x-go-sgf'.\x0a\x09\x09'sgl' -> 'application/vnd.stardivision.writer-global'.\x0a\x09\x09'sh' -> 'text/x-sh'.\x0a\x09\x09'shar' -> 'application/x-shar'.\x0a\x09\x09'shtml' -> 'text/html'.\x0a\x09\x09'sid' -> 'audio/prs.sid'.\x0a\x09\x09'sik' -> 'application/x-trash'.\x0a\x09\x09'silo' -> 'model/mesh'.\x0a\x09\x09'sis' -> 'application/vnd.symbian.install'.\x0a\x09\x09'sit' -> 'application/x-stuffit'.\x0a\x09\x09'skd' -> 'application/x-koan'.\x0a\x09\x09'skm' -> 'application/x-koan'.\x0a\x09\x09'skp' -> 'application/x-koan'.\x0a\x09\x09'skt' -> 'application/x-koan'.\x0a\x09\x09'smf' -> 'application/vnd.stardivision.math'.\x0a\x09\x09'smi' -> 'application/smil'.\x0a\x09\x09'smil' -> 'application/smil'.\x0a\x09\x09'snd' -> 'audio/basic'.\x0a\x09\x09'spc' -> 'chemical/x-galactic-spc'.\x0a\x09\x09'spl' -> 'application/x-futuresplash'.\x0a\x09\x09'src' -> 'application/x-wais-source'.\x0a\x09\x09'stc' -> 'application/vnd.sun.xml.calc.template'.\x0a\x09\x09'std' -> 'application/vnd.sun.xml.draw.template'.\x0a\x09\x09'sti' -> 'application/vnd.sun.xml.impress.template'.\x0a\x09\x09'stl' -> 'application/vnd.ms-pki.stl'.\x0a\x09\x09'stw' -> 'application/vnd.sun.xml.writer.template'.\x0a\x09\x09'sty' -> 'text/x-tex'.\x0a\x09\x09'sv4cpio' -> 'application/x-sv4cpio'.\x0a\x09\x09'sv4crc' -> 'application/x-sv4crc'.\x0a\x09\x09'svg' -> 'image/svg+xml'.\x0a\x09\x09'svgz' -> 'image/svg+xml'.\x0a\x09\x09'sw' -> 'chemical/x-swissprot'.\x0a\x09\x09'swf' -> 'application/x-shockwave-flash'.\x0a\x09\x09'swfl' -> 'application/x-shockwave-flash'.\x0a\x09\x09'sxc' -> 'application/vnd.sun.xml.calc'.\x0a\x09\x09'sxd' -> 'application/vnd.sun.xml.draw'.\x0a\x09\x09'sxg' -> 'application/vnd.sun.xml.writer.global'.\x0a\x09\x09'sxi' -> 'application/vnd.sun.xml.impress'.\x0a\x09\x09'sxm' -> 'application/vnd.sun.xml.math'.\x0a\x09\x09'sxw' -> 'application/vnd.sun.xml.writer'.\x0a\x09\x09't' -> 'application/x-troff'.\x0a\x09\x09'tar' -> 'application/x-tar'.\x0a\x09\x09'taz' -> 'application/x-gtar'.\x0a\x09\x09'tcl' -> 'text/x-tcl'.\x0a\x09\x09'tex' -> 'text/x-tex'.\x0a\x09\x09'texi' -> 'application/x-texinfo'.\x0a\x09\x09'texinfo' -> 'application/x-texinfo'.\x0a\x09\x09'text' -> 'text/plain'.\x0a\x09\x09'tgf' -> 'chemical/x-mdl-tgf'.\x0a\x09\x09'tgz' -> 'application/x-gtar'.\x0a\x09\x09'tif' -> 'image/tiff'.\x0a\x09\x09'tiff' -> 'image/tiff'.\x0a\x09\x09'tk' -> 'text/x-tcl'.\x0a\x09\x09'tm' -> 'text/texmacs'.\x0a\x09\x09'torrent' -> 'application/x-bittorrent'.\x0a\x09\x09'tr' -> 'application/x-troff'.\x0a\x09\x09'ts' -> 'text/texmacs'.\x0a\x09\x09'tsp' -> 'application/dsptype'.\x0a\x09\x09'tsv' -> 'text/tab-separated-values'.\x0a\x09\x09'txt' -> 'text/plain'.\x0a\x09\x09'udeb' -> 'application/x-debian-package'.\x0a\x09\x09'uls' -> 'text/iuls'.\x0a\x09\x09'ustar' -> 'application/x-ustar'.\x0a\x09\x09'val' -> 'chemical/x-ncbi-asn1-binary'.\x0a\x09\x09'vcd' -> 'application/x-cdlink'.\x0a\x09\x09'vcf' -> 'text/x-vcard'.\x0a\x09\x09'vcs' -> 'text/x-vcalendar'.\x0a\x09\x09'vmd' -> 'chemical/x-vmd'.\x0a\x09\x09'vms' -> 'chemical/x-vamas-iso14976'.\x0a\x09\x09'vor' -> 'application/vnd.stardivision.writer'.\x0a\x09\x09'vrm' -> 'x-world/x-vrml'.\x0a\x09\x09'vrml' -> 'x-world/x-vrml'.\x0a\x09\x09'vsd' -> 'application/vnd.visio'.\x0a\x09\x09'wad' -> 'application/x-doom'.\x0a\x09\x09'wav' -> 'audio/x-wav'.\x0a\x09\x09'wax' -> 'audio/x-ms-wax'.\x0a\x09\x09'wbmp' -> 'image/vnd.wap.wbmp'.\x0a\x09\x09'wbxml' -> 'application/vnd.wap.wbxml'.\x0a\x09\x09'wk' -> 'application/x-123'.\x0a\x09\x09'wm' -> 'video/x-ms-wm'.\x0a\x09\x09'wma' -> 'audio/x-ms-wma'.\x0a\x09\x09'wmd' -> 'application/x-ms-wmd'.\x0a\x09\x09'wml' -> 'text/vnd.wap.wml'.\x0a\x09\x09'wmlc' -> 'application/vnd.wap.wmlc'.\x0a\x09\x09'wmls' -> 'text/vnd.wap.wmlscript'.\x0a\x09\x09'wmlsc' -> 'application/vnd.wap.wmlscriptc'.\x0a\x09\x09'wmv' -> 'video/x-ms-wmv'.\x0a\x09\x09'wmx' -> 'video/x-ms-wmx'.\x0a\x09\x09'wmz' -> 'application/x-ms-wmz'.\x0a\x09\x09'wp5' -> 'application/wordperfect5.1'.\x0a\x09\x09'wpd' -> 'application/wordperfect'.\x0a\x09\x09'wrl' -> 'x-world/x-vrml'.\x0a\x09\x09'wsc' -> 'text/scriptlet'.\x0a\x09\x09'wvx' -> 'video/x-ms-wvx'.\x0a\x09\x09'wz' -> 'application/x-wingz'.\x0a\x09\x09'xbm' -> 'image/x-xbitmap'.\x0a\x09\x09'xcf' -> 'application/x-xcf'.\x0a\x09\x09'xht' -> 'application/xhtml+xml'.\x0a\x09\x09'xhtml' -> 'application/xhtml+xml'.\x0a\x09\x09'xlb' -> 'application/vnd.ms-excel'.\x0a\x09\x09'xls' -> 'application/vnd.ms-excel'.\x0a\x09\x09'xlt' -> 'application/vnd.ms-excel'.\x0a\x09\x09'xml' -> 'application/xml'.\x0a\x09\x09'xpi' -> 'application/x-xpinstall'.\x0a\x09\x09'xpm' -> 'image/x-xpixmap'.\x0a\x09\x09'xsl' -> 'application/xml'.\x0a\x09\x09'xtel' -> 'chemical/x-xtel'.\x0a\x09\x09'xul' -> 'application/vnd.mozilla.xul+xml'.\x0a\x09\x09'xwd' -> 'image/x-xwindowdump'.\x0a\x09\x09'xyz' -> 'chemical/x-xyz'.\x0a\x09\x09'zip' -> 'application/zip'.\x0a\x09\x09'zmt' -> 'chemical/x-mopac-input'.\x0a\x09\x09'~' -> 'application/x-trash'\x0a\x09}",
messageSends: ["->"],
referencedClasses: []
}),
smalltalk.FileServer.klass);

smalltalk.addMethod(
"_main",
smalltalk.method({
selector: "main",
category: 'initialization',
fn: function (){
var self=this;
return smalltalk.send(smalltalk.send(self, "_new", []), "_startOn_", [smalltalk.send(self, "_port", [])]);
return self;},
args: [],
source: "main\x0a\x09^self new startOn: self port",
messageSends: ["startOn:", "new", "port"],
referencedClasses: []
}),
smalltalk.FileServer.klass);

smalltalk.addMethod(
"_mimeTypeFor_",
smalltalk.method({
selector: "mimeTypeFor:",
category: 'accessing',
fn: function (aString){
var self=this;
return smalltalk.send(smalltalk.send(self, "_mimeTypes", []), "_at_ifAbsent_", [smalltalk.send(aString, "_replace_with_", [".*[\x5c.]", ""]), (function(){return "text/plain";})]);
return self;},
args: ["aString"],
source: "mimeTypeFor: aString\x0a\x09^self mimeTypes at: (aString replace: '.*[\x5c.]' with: '') ifAbsent: ['text/plain']",
messageSends: ["at:ifAbsent:", "mimeTypes", "replace:with:"],
referencedClasses: []
}),
smalltalk.FileServer.klass);

smalltalk.addMethod(
"_mimeTypes",
smalltalk.method({
selector: "mimeTypes",
category: 'accessing',
fn: function (){
var self=this;
return (($receiver = self['@mimeTypes']) == nil || $receiver == undefined) ? (function(){return (self['@mimeTypes']=smalltalk.send(self, "_defaultMimeTypes", []));})() : $receiver;
return self;},
args: [],
source: "mimeTypes\x0a\x09^mimeTypes ifNil: [mimeTypes := self defaultMimeTypes]",
messageSends: ["ifNil:", "defaultMimeTypes"],
referencedClasses: []
}),
smalltalk.FileServer.klass);

smalltalk.addMethod(
"_port",
smalltalk.method({
selector: "port",
category: 'accessing',
fn: function (){
var self=this;
return (($receiver = self['@port']) == nil || $receiver == undefined) ? (function(){return (4000);})() : $receiver;
return self;},
args: [],
source: "port\x0a\x09^port ifNil: [4000]",
messageSends: ["ifNil:"],
referencedClasses: []
}),
smalltalk.FileServer.klass);

smalltalk.addMethod(
"_port_",
smalltalk.method({
selector: "port:",
category: 'accessing',
fn: function (aNumber){
var self=this;
(self['@port']=aNumber);
return self;},
args: ["aNumber"],
source: "port: aNumber\x0a\x09port := aNumber",
messageSends: [],
referencedClasses: []
}),
smalltalk.FileServer.klass);


