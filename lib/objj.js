
var protoParser = require("./objj/parser").parser,
    js = require("./js"),
    nodes = require("./js/nodes"),
    codegen = require("./js/codegen"),
    cpnodes = require("./objj/cpnodes"),
    cpcodegen = require("./objj/cpcodegen");

var constructors = {},
    prototypes = {};

// Define AST nodes
var def = nodes.defineNodes(prototypes, constructors);
cpnodes.defineNodes(prototypes, constructors, def);

// extend nodes with JavaScript code generation methods
codegen.extend(prototypes);
cpcodegen.extend(prototypes);

exports.Parser = js.baseParser(protoParser, constructors, prototypes);
var parser = exports.parser = new exports.Parser();

var parse = exports.parse = function (source) {
    return parser.parse(source);
};

exports.toJS = function (ast) {
    var s = ast.toJS(0);
    return s;
};

exports.compile = function (source) {
    var s = parse(source).toJS(0);
    return s;
};

