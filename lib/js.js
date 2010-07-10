
var protoParser = require("./js/parser").parser,
    nodes = require("./js/nodes"),
    codegen = require("./js/codegen");



// TODO
function Compiler () {
    this.parser = new exports.Parser();
}

var constructors = {},
    prototypes = {};

// Define AST nodes
nodes.defineNodes(prototypes, constructors);

// extend nodes with JavaScript code generation methods
codegen.extend(prototypes);

// Create a parser constructor and an instance
exports.Parser = baseParser(protoParser, constructors, prototypes);
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

exports.baseParser = baseParser;

// Creates JavaScript parser factories
function baseParser (parser, constructors, prototypes) {
    function Parser () { }

    Parser.prototype = parser;

    // allow yy.NodeType calls in parser
    for (var con in constructors) {
        if (constructors.hasOwnProperty(con)) {
            parser.yy[con] = function (name){
                return function (a,b,c,d,e,f,g) {
                        return new constructors[name](a,b,c,d,e,f,g);
                    }
                }(con);
        }
    }

    // used named arguments to avoid arguments array
    parser.yy.Node = function Node (type, meta, a,b,c,d,e,f,g) {
        if (constructors[type]) {
            return new constructors[type](meta, a,b,c,d,e,f,g);
        } else {
            throw 'no such node type: '+type;
        }
    };

    // Handle parse errors and recover from ASI
    parser.yy.parseError = function (err, hash) {
        // don't print error for missing semicolon
        if (!(hash.expected.indexOf("';'") >= 0 && (hash.token === 'CLOSEBRACE' || parser.yy.lineBreak || parser.yy.lastLineBreak || hash.token === 1))) {
            throw err;
        }
    };

    // used to check if last match was a line break (for ; insertion)
    var realLex = parser.lexer.lex;
    parser.lexer.lex = function () {
        parser.yy.lastLineBreak = parser.yy.lineBreak;
        parser.yy.lineBreak = false;
        return realLex.call(parser.lexer);
    };

    parser.yy.escapeString = function (s) {
      return s.replace(/\\\n/,'').replace(/\\([^xubfnvrt0\\])/g, '$1');
    };

    var oldParse = parser.parse;
    parser.parse = function (source) {
        parser.yy.lineBreak = false;
        parser.yy.inRegex = false;
        parser.yy.ASI = false;
        return oldParse.call(this,source);
    };

    return Parser;
}

