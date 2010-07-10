
var assert = require("assert"),
    parser = require("../setup").parser,
    parse = require("../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test empty function declaration"] = function () {
    var source = 'function foo () { }',
        program = parser.parse(source),
        nodes = Node('Program',{},
                    Node('FunctionDecl',{},
                            IdPatt('foo'),
                            Node('ParamDecl')));
    assert.deepEqual(program, nodes);
};

exports["test function declaration with params and body"] = function () {
    var source = 'function foo (bar, baz) { return 42; }',
        program = parser.parse(source),
        nodes = Node('Program',{},
                    Node('FunctionDecl',{},
                            IdPatt('foo'),
                            Node('ParamDecl', {}).appendList([IdPatt('bar'), IdPatt('baz')]))
                              .appendList([Node('ReturnStmt', {},
                                  Node('LiteralExpr', {type: 'number',value: 42}))]));
    assert.deepEqual(program, nodes);
};

exports["test function return this"] = function () {
    var source = 'function foo () { return this; }',
        program = parser.parse(source),
        nodes = Node('Program',{},
                    Node('FunctionDecl',{},
                            IdPatt('foo'),
                            Node('ParamDecl', {}))
                              .appendList([Node('ReturnStmt', {},
                                  Node('ThisExpr', {}))]));
    assert.deepEqual(program, nodes);
};

exports["test function expression"] = function () {
    var source = '(function foo () { });',
        program = parser.parse(source),
        nodes = Node('Program',{},
                    Node('FunctionExpr',{parens:true},
                            IdPatt('foo'),
                            Node('ParamDecl',{})
                            ));
    assert.deepEqual(program, nodes);
};

exports["test function expression with params and body"] = function () {
    var source = '(function foo (bar, baz) { return 42; });',
        program = parser.parse(source),
        nodes = Node('Program',{},
                    Node('FunctionExpr',{parens:true},
                            IdPatt('foo'),
                            Node('ParamDecl', {}).appendList([IdPatt('bar'), IdPatt('baz')]))
                                .appendList([Node('ReturnStmt', {}, Node('LiteralExpr', {type: 'number',value: 42}))]));
    assert.deepEqual(program, nodes);
};

exports["test anonymous function"] = function () {
    var source = '(function () { });',
        program = parser.parse(source),
        nodes = Node('Program',{},
                    Node('FunctionExpr',{parens:true},
                            Node('Empty'),
                            Node('ParamDecl',{})
                            ));
    assert.deepEqual(program, nodes);
};

exports["test anonymous function with params and body"] = function () {
    var source = '(function (bar, baz) { return 42; });',
        program = parser.parse(source),
        nodes = Node('Program',{},
                    Node('FunctionExpr',{parens:true},
                            Node('Empty'),
                            Node('ParamDecl', {}).appendList([IdPatt('bar'), IdPatt('baz')]))
                                .appendList([Node('ReturnStmt', {}, Node('LiteralExpr', {type: 'number',value: 42}))]));
    assert.deepEqual(program, nodes);
};


