
var protoParser = require("./objj/parser").parser,
    js = require("./js"),
    nodes = require("./js/nodes"),
    codegen = require("./js/codegen"),
    cpnodes = require("./objj/nodes"),
    cpcodegen = require("./objj/codegen");


function Compiler () {
    var constructors = {},
        prototypes = {};

    // Define AST nodes
    var def = nodes.defineNodes(prototypes, constructors);
    cpnodes.defineNodes(prototypes, constructors, def);

    // extend nodes with JavaScript code generation methods
    codegen.extend(prototypes);
    cpcodegen.extend(prototypes);

    this.Parser = js.baseParser(protoParser, constructors, prototypes);
    this.parser = new this.Parser();
}

Compiler.prototype = js.Compiler.prototype;

exports.Compiler = Compiler;

// Convienience API
exports.parse = function (source) {
    return new Compiler().parse(source);
};

exports.toJS = function (ast) {
    var s = ast.toJS(0);
    //print(s);
    return s;
};

exports.compile = function (source) {
    var s = new Compiler().parse(source).toJS(0);
    return s;
};

exports.cliCompile = function (source) {
    var s = new Compiler().parse(source).toJS(0);
    return s;
};
