
var protoParser = require("./js/parser").parser,
    nodes = require("./js/nodes"),
    codegen = require("./js/codegen");

function Compiler () {
    var constructors = {},
        prototypes = {};

    // Define AST nodes
    nodes.defineNodes(prototypes, constructors);

    // extend nodes with JavaScript code generation methods
    codegen.extend(prototypes);

    // Create a parser constructor and an instance
    this.Parser = exports.baseParser(protoParser, constructors, prototypes);
    this.parser = new this.Parser();
}

Compiler.prototype = {
    parse: function (source) {
        return this.parser.parse(source);
    },
    toJS: function (ast) {
        var s = ast.toJS(0);
        return s;
    },
    compile: function (source) {
        var s = this.parser.parse(source).toJS(0);
        return s;
    },
    on: function on (evt, fn) {
        var split = evt.split(':');
        if (split[0] == 'parse') {
            this.parser.on(split[1],fn);
        }
    },
    off: function off (evt, fn) {
        var split = evt.split(':');
        if (split[0] == 'parse') {
            this.parser.off(split[1],fn);
        }
    }
};

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

exports.compile = exports.cliCompile = function (source) {
    var s = new Compiler().parse(source).toJS(0);
    return s;
};


// Creates JavaScript parser factories
exports.baseParser = function baseParser (parser, constructors, prototypes) {
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
            throw new Error(err);
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

    var handlers = {};

    parser.on = function on (evt, fn) {
        if (evt in constructors) {
            constructors[evt].on('parse',fn);
        } else {
            handlers[evt].push(fn);
        }
    };
    parser.off = function off (evt, fn) {
        if (evt in constructors) {
            constructors[evt].off('parse',fn);
        } else if (!evt) {
            for (evt in constructors) {
                constructors[evt].off('parse',fn);
            }
        }
    };

    return Parser;
}

