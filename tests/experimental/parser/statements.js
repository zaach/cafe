
var assert = require("assert"),
    parser = require("../../setup").parser,
    parse = require("../../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test block call expression"] = function () {
    var source = 'foo(bar) { a; }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BlockCallExpr',{},
                    Node('CallExpr',{},
                      Node('IdExpr',{name:'foo'}),
                      Node('IdExpr',{name:'bar'}),
                      Node('BlockArg',{},
                        Node('BlockParamDecl',{}),
                        Node('IdExpr', {name:'a'})))));
    assert.deepEqual(program, nodes);
};

exports["test block invoke expression"] = function () {
    var source = 'foo.bar(baz) { a; }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BlockCallExpr',{},
                    Node('InvokeExpr',{brackets:false},
                      Node('IdExpr',{name:'foo'}),
                      Node('LiteralExpr',{type:'string',value:'bar'}),
                      Node('IdExpr',{name:'baz'}),
                      Node('BlockArg',{},
                        Node('BlockParamDecl',{}),
                        Node('IdExpr', {name:'a'})))));
    assert.deepEqual(program, nodes);
};

exports["test block call expression no args"] = function () {
    var source = 'foo { a; }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BlockCallExpr',{},
                    Node('CallExpr',{},
                      Node('IdExpr',{name:'foo'}),
                      Node('BlockArg',{},
                        Node('BlockParamDecl',{}),
                        Node('IdExpr', {name:'a'})))));
    assert.deepEqual(program, nodes);
};

exports["test block invoke expression no args"] = function () {
    var source = 'foo.bar { a; }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BlockCallExpr',{},
                    Node('InvokeExpr',{brackets:false},
                      Node('IdExpr',{name:'foo'}),
                      Node('LiteralExpr',{type:'string',value:'bar'}),
                      Node('BlockArg',{},
                        Node('BlockParamDecl',{}),
                        Node('IdExpr', {name:'a'})))));
    assert.deepEqual(program, nodes);
};

exports["test block call expression with params"] = function () {
    var source = 'foo { |bar, baz| a; }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BlockCallExpr',{},
                    Node('CallExpr',{},
                      Node('IdExpr',{name:'foo'}),
                      Node('BlockArg',{},
                        Node('BlockParamDecl',{}, IdPatt('bar'), IdPatt('baz')),
                        Node('IdExpr', {name:'a'})))));
    assert.deepEqual(program, nodes);
};
