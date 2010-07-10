
var assert = require("assert"),
    parser = require("../setup").parser,
    parse = require("../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test block"] = function () {
    var source = '{ 1; 2;}',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BlockStmt',{},
                    Node('LiteralExpr',{type:'number',value:1}),
                    Node('LiteralExpr',{type:'number',value:2})));
    assert.deepEqual(program, nodes);
};

exports["test with"] = function () {
    var source = 'with(42);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('WithStmt',{},
                    Node('LiteralExpr',{type:'number',value:42}),
                    Node('EmptyStmt',{})));
    assert.deepEqual(program, nodes);
};

exports["test debugger"] = function () {
    var source = 'debugger;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('DebuggerStmt',{}));
    assert.deepEqual(program, nodes);
};

