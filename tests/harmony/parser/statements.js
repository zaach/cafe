
var assert = require("assert"),
    parser = require("../../setup").parser,
    parse = require("../../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test import in non top level block fails"] = function () {
    var source = '{ import Math.*; }';

    assert['throws'](function (){ parse(source); });
};

exports["test module import wildcard"] = function () {
    var source = 'import Math.*;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ImportWildcardDecl',{},
                    Node('ModuleSpecifier',{},
                      IdPatt('Math'))));
    assert.deepEqual(program, nodes);
};

exports["test module import empty"] = function () {
    var source = 'import Math.{};',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ImportDecl',{},
                    Node('ModuleSpecifier',{},
                      IdPatt('Math')),
                    Node('ImportSpecifier',{})));
    assert.deepEqual(program, nodes);
};

exports["test module import"] = function () {
    var source = 'import Math.{sum,pi};',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ImportDecl',{},
                    Node('ModuleSpecifier',{},
                      IdPatt('Math')),
                    Node('ImportSpecifier',{},
                      Node('ImportSpecifierItem',{name:'sum'}),
                      Node('ImportSpecifierItem',{name:'pi'}))));
    assert.deepEqual(program, nodes);
};

exports["test longer module import"] = function () {
    var source = 'import Math.foo.{sum,pi};',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ImportDecl',{},
                    Node('ModuleSpecifier',{},
                      IdPatt('Math'),
                      IdPatt('foo')),
                    Node('ImportSpecifier',{},
                      Node('ImportSpecifierItem',{name:'sum'}),
                      Node('ImportSpecifierItem',{name:'pi'}))));
    assert.deepEqual(program, nodes);
};

exports["test module import with alias"] = function () {
    var source = 'import Math.{sum:add,pi};',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ImportDecl',{},
                    Node('ModuleSpecifier',{},
                      IdPatt('Math')),
                    Node('ImportSpecifier',{},
                      Node('ImportSpecifierItem',{name:'sum',alias:'add'}),
                      Node('ImportSpecifierItem',{name:'pi'}))));
    assert.deepEqual(program, nodes);
};

exports["test empty module declaration"] = function () {
    var source = 'module Math { }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ModuleDecl',{},
                    IdPatt('Math')));
    assert.deepEqual(program, nodes);
};

exports["test module assign"] = function () {
    var source = 'module Math = Foo.bar;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ModuleAssignDecl',{},
                    IdPatt('Math'),
                    Node('ModuleSpecifier',{},
                      IdPatt('Foo'),
                      IdPatt('bar'))));
    assert.deepEqual(program, nodes);
};

exports["test module declaration with var export"] = function () {
    var source = 'module Math { export var pi = 3.14; }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ModuleDecl',{},
                    IdPatt('Math'),
                    Node('ExportDecl',{},
                      Node('VarDecl',{},
                        Node('InitPatt',{},
                            IdPatt('pi'),
                            Node('LiteralExpr',{type:'number',value:3.14}))))
                ));
    assert.deepEqual(program, nodes);
};

exports["test module declaration with function export"] = function () {
    var source = 'module Math { export var pi = 3.14; export function sum (a,b) { } }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ModuleDecl',{},
                    IdPatt('Math'),
                    Node('ExportDecl',{},
                      Node('VarDecl',{},
                        Node('InitPatt',{},
                            IdPatt('pi'),
                            Node('LiteralExpr',{type:'number',value:3.14})))),
                    Node('ExportDecl',{},
                      Node('FunctionDecl',{},
                            IdPatt('sum'),
                            Node('ParamDecl', {},IdPatt('a'), IdPatt('b'))))
                ));
    assert.deepEqual(program, nodes);
};

exports["test module declaration with import"] = function () {
    var source = 'module Math { import Foo.{a}; }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ModuleDecl',{},
                    IdPatt('Math'),
                    Node('ImportDecl',{},
                      Node('ModuleSpecifier',{},
                        IdPatt('Foo')),
                      Node('ImportSpecifier',{},
                        Node('ImportSpecifierItem',{name:'a'})))
                ));
    assert.deepEqual(program, nodes);
};

exports["test nested module declarations"] = function () {
    var source = 'module Math { module Foo {} }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ModuleDecl',{},
                    IdPatt('Math'),
                    Node('ModuleDecl',{},
                      IdPatt('Foo'))
                ));
    assert.deepEqual(program, nodes);
};

exports["test nested module declarations with init"] = function () {
    var source = 'module Math { module Foo = Bar; }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ModuleDecl',{},
                    IdPatt('Math'),
                    Node('ModuleAssignDecl',{},
                      IdPatt('Foo'),
                      Node('ModuleSpecifier',{},
                        IdPatt('Bar')))
                ));
    assert.deepEqual(program, nodes);
};

