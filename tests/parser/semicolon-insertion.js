
var assert = require("assert"),
    parser = require("../setup").parser,
    parse = require("../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test expression semicolon insert"] = function () {
    var source = '45';
    assert.ok(parse(source));
};

exports["test expression line break semicolon insert"] = function () {
    var source = 'debugger\n45',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('DebuggerStmt',{}),
                  Node('LiteralExpr',{type:'number',value:45}));
    assert.deepEqual(program, nodes);
};

exports["test statement semicolon insert"] = function () {
    var source = 'debugger';
    assert.ok(parse(source));
};

exports["test return ASI"] = function () {
    var source = 'return\n5',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ReturnStmt',{}),
                  Node('LiteralExpr',{type:'number',value:5}));
    assert.deepEqual(program, nodes);
};

exports["test return expr ASI"] = function () {
    var source = 'return 8\n5',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ReturnStmt',{},Node('LiteralExpr',{type:'number',value:8})),
                  Node('LiteralExpr',{type:'number',value:5}));
    assert.deepEqual(program, nodes);
};

exports["test break ASI"] = function () {
    var source = 'break\na',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BreakStmt',{}),
                  Node('IdExpr',{name:'a'}));
    assert.deepEqual(program, nodes);
};

exports["test continue ASI"] = function () {
    var source = 'continue\na',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ContinueStmt',{}),
                  Node('IdExpr',{name:'a'}));
    assert.deepEqual(program, nodes);
};

exports["test throw insert"] = function () {
    var source = 'throw a',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ThrowStmt',{},
                  Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test pre-incement"] = function () {
    var source = 'i\n++\nj',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('IdExpr',{name:'i'}),
                  Node('CountExpr',{isPrefix:true,op:'++'},
                    Node('IdExpr',{name:'j'})));
    assert.deepEqual(program, nodes);
};

exports["test pre-incement no empties"] = function () {
    var source = 'i;\n++j;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('IdExpr',{name:'i'}),
                  Node('CountExpr',{isPrefix:true,op:'++'},
                    Node('IdExpr',{name:'j'})));
    assert.deepEqual(program, nodes);
};

exports["test post-increment parse error"] = function () {
    var source = 'i\n++';

    assert['throws'](function () {parse(source);});
};

exports["test throw ASI"] = function () {
    var source = 'throw\na';

    assert['throws'](function () {parse(source);});
};

exports["test block"] = function () {
    var source = '{true}',
        program = parser.parse(source),
        nodes = Node('Program',{},
                  Node('BlockStmt',{},
                    Node('LiteralExpr',{type:'boolean',value:true})));
    assert.deepEqual(program, nodes);
};

exports["test return unneeded ASI with space"] = function () {
    var source = 'return {\nfoo:5}',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ReturnStmt',{},
                    Node('ObjectExpr',{},
                    Node('DataProp',{name:'foo'},
                      Node('LiteralExpr',{type:'number',value:5})))));
    assert.deepEqual(program, nodes);
};

exports["test return unneeded ASI with comment"] = function () {
    var source = 'return/* */{\nfoo:5}',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ReturnStmt',{},
                    Node('ObjectExpr',{},
                    Node('DataProp',{name:'foo'},
                      Node('LiteralExpr',{type:'number',value:5})))));
    assert.deepEqual(program, nodes);
};

exports["test space between breaks"] = function () {
    var source = 'do {} while(true)\n  \n3;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('DoWhileStmt',{},
                    Node('BlockStmt',{}),
                    Node('LiteralExpr',{type:'boolean',value:true})),
                    Node('LiteralExpr',{type:'number',value:3}));
    assert.deepEqual(program, nodes);
};
