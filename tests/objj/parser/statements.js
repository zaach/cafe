
var assert = require("assert"),
    parser = require("../../setup").parser,
    parse = require("../../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test import"] = function () {
    var source = '@import "test.j"',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPImportStmt',{name: 'test.j'}));
    assert.deepEqual(program, nodes);
};

exports["test class implementation"] = function () {
    var source = '@implementation Person @end',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPClassImplementationStmt',{name:'Person'},
                    Node('Empty'),
                    Node('Empty')));
    assert.deepEqual(program, nodes);
};

exports["test class implementation with empty vars"] = function () {
    var source = '@implementation Person { } @end',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPClassImplementationStmt',{name:'Person'},
                    Node('Empty'),
                    Node('CPInstanceVars',{})));
    assert.deepEqual(program, nodes);
};

exports["test class implementation with superclass"] = function () {
    var source = '@implementation Person : CPObject { } @end',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPClassImplementationStmt',{name:'Person'},
                    IdPatt('CPObject'),
                    Node('CPInstanceVars',{})));
    assert.deepEqual(program, nodes);
};

exports["test class implementation with superclass and vars"] = function () {
    var source = '@implementation Person : CPObject { CPString name; CPString foo; } @end',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPClassImplementationStmt',{name:'Person'},
                    IdPatt('CPObject'),
                    Node('CPInstanceVars',{},
                      Node('CPInstanceVarDecl',{type: 'CPString'}, IdPatt('name')),
                      Node('CPInstanceVarDecl',{type: 'CPString'}, IdPatt('foo'))
                    )));
    assert.deepEqual(program, nodes);
};

exports["test class implementation with class method"] = function () {
    var source = '@implementation Person : CPObject { } +(CPString)foo { return true;} @end',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPClassImplementationStmt',{name:'Person'},
                    IdPatt('CPObject'),
                    Node('CPInstanceVars',{}),
                    Node('CPClassMethodDecl',{type: 'CPString'},
                      IdPatt('foo'),
                      Node('ReturnStmt',{},
                        Node('LiteralExpr',{type: 'boolean', value: true})))));
    assert.deepEqual(program, nodes);
};

exports["test class implementation with void type method"] = function () {
    var source = '@implementation Person : CPObject { } +(void)foo { return true;} @end',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPClassImplementationStmt',{name:'Person'},
                    IdPatt('CPObject'),
                    Node('CPInstanceVars',{}),
                    Node('CPClassMethodDecl',{type: 'void'},
                      IdPatt('foo'),
                      Node('ReturnStmt',{},
                        Node('LiteralExpr',{type: 'boolean', value: true})))));
    assert.deepEqual(program, nodes);
};

exports["test class implementation with unsigned int type method"] = function () {
    var source = '@implementation Person : CPObject { } +(unsigned int)foo { return true;} @end',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPClassImplementationStmt',{name:'Person'},
                    IdPatt('CPObject'),
                    Node('CPInstanceVars',{}),
                    Node('CPClassMethodDecl',{type: 'unsigned int'},
                      IdPatt('foo'),
                      Node('ReturnStmt',{},
                        Node('LiteralExpr',{type: 'boolean', value: true})))));
    assert.deepEqual(program, nodes);
};

exports["test class implementation with class and instance method"] = function () {
    var source = '@implementation Person : CPObject { } +(CPString)foo { return true;} -(id)bar{ return false;} @end',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPClassImplementationStmt',{name:'Person'},
                    IdPatt('CPObject'),
                    Node('CPInstanceVars',{}),
                    Node('CPClassMethodDecl',{type: 'CPString'},
                      IdPatt('foo'),
                      Node('ReturnStmt',{},
                        Node('LiteralExpr',{type: 'boolean', value: true}))),
                    Node('CPInstanceMethodDecl',{type: 'id'},
                      IdPatt('bar'),
                      Node('ReturnStmt',{},
                        Node('LiteralExpr',{type: 'boolean', value: false})))));
    assert.deepEqual(program, nodes);
};

exports["test class implementation with class method using selectors"] = function () {
    var source = '@implementation Person : CPObject { } +(CPString)foo:(id)bar baz:(CPString)boo { return true;} @end',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPClassImplementationStmt',{name: 'Person'},
                    IdPatt('CPObject'),
                    Node('CPInstanceVars',{}),
                    Node('CPClassMethodDecl',{type: 'CPString'},
                      Node('CPSelectorsDecl',{},
                        Node('CPSelector',{type:'id'},IdPatt('foo'),IdPatt('bar')),
                        Node('CPSelector',{type:'CPString'},IdPatt('baz'),IdPatt('boo'))),
                      Node('ReturnStmt',{},
                        Node('LiteralExpr',{type: 'boolean', value: true})))));
    assert.deepEqual(program, nodes);
};
