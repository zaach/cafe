
var assert = require("assert"),
    parser = require("../setup").parser,
    parse = require("../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test single var decl"] = function () {
    var source = 'var a;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('VarDecl',{},IdPatt('a')));
    assert.deepEqual(program, nodes);
};

exports["test var decl init"] = function () {
    var source = 'var a = true;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('VarDecl',{},
                        Node('InitPatt',{},
                            IdPatt('a'),
                            Node('LiteralExpr',{type:'boolean',value:true}))));
    assert.deepEqual(program, nodes);
};

exports["test var decl list"] = function () {
    var source = 'var a, b, c;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('VarDecl',{},
                            IdPatt('a'), IdPatt('b'), IdPatt('c')));
    assert.deepEqual(program, nodes);
};

exports["test single conts decl"] = function () {
    var source = 'const a;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('ConstDecl',{},IdPatt('a')));
    assert.deepEqual(program, nodes);
};

exports["test const decl init"] = function () {
    var source = 'const a = true;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('ConstDecl',{},
                        Node('InitPatt',{},
                            IdPatt('a'),
                            Node('LiteralExpr',{type:'boolean',value:true})
                            )));
    assert.deepEqual(program, nodes);
};

exports["test const decl list"] = function () {
    var source = 'const a, b, c;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('ConstDecl',{},
                            IdPatt('a'), IdPatt('b'), IdPatt('c')
                            ));
    assert.deepEqual(program, nodes);
};

exports["test implicit global"] = function () {
    var source = 'a = true;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'boolean',value:true})));
    assert.deepEqual(program, nodes);
};

exports["test /= assign"] = function () {
    var source = 'a /= 5;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '/='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'number',value:5})));
    assert.deepEqual(program, nodes);
};

exports["test /= assign ambiguous"] = function () {
    var source = 'a /= 5 / a;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '/='},
                          Node('IdExpr', {name:'a'}),
                          Node('DivExpr', {},
                            Node('LiteralExpr',{type:'number',value:5}),
                            Node('IdExpr', {name:'a'}))));
    assert.deepEqual(program, nodes);
};

exports["test *= assign"] = function () {
    var source = 'a *= 5;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '*='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'number',value:5})));
    assert.deepEqual(program, nodes);
};

exports["test -= assign"] = function () {
    var source = 'a -= 5;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '-='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'number',value:5})));
    assert.deepEqual(program, nodes);
};

exports["test += assign"] = function () {
    var source = 'a += 5;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '+='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'number',value:5})));
    assert.deepEqual(program, nodes);
};

exports["test %= assign"] = function () {
    var source = 'a %= 5;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '%='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'number',value:5})));
    assert.deepEqual(program, nodes);
};

exports["test &= assign"] = function () {
    var source = 'a &= 5;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '&='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'number',value:5})));
    assert.deepEqual(program, nodes);
};

exports["test |= assign"] = function () {
    var source = 'a |= 5;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '|='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'number',value:5})));
    assert.deepEqual(program, nodes);
};

exports["test ^= assign"] = function () {
    var source = 'a ^= 5;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '^='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'number',value:5})));
    assert.deepEqual(program, nodes);
};

exports["test <<= assign"] = function () {
    var source = 'a <<= 5;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '<<='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'number',value:5})));
    assert.deepEqual(program, nodes);
};

exports["test >>= assign"] = function () {
    var source = 'a >>= 5;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '>>='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'number',value:5})));
    assert.deepEqual(program, nodes);
};

exports["test >>>= assign"] = function () {
    var source = 'a >>>= 5;',
        program = parse(source),
        nodes = Node('Program',{},
                      Node('AssignExpr',{op: '>>>='},
                          Node('IdExpr', {name:'a'}),
                          Node('LiteralExpr',{type:'number',value:5})));
    assert.deepEqual(program, nodes);
};

