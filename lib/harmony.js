
var protoParser = require("./harmony/parser").parser,
    js = require("./js"),
    nodes = require("./js/nodes"),
    codegen = require("./js/codegen"),
    harmonyNodes = require("./harmony/nodes");
    //harmonyCodegen = require("./harmony/codegen");

var constructors = {},
    prototypes = {};

// Define AST nodes
var def = nodes.defineNodes(prototypes, constructors);
harmonyNodes.defineNodes(prototypes, constructors, def);

// extend nodes with JavaScript code generation methods
codegen.extend(prototypes);
//harmonyCodegen.extend(prototypes);

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

