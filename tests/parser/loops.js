
var assert = require("assert"),
    parser = require("../setup").parser,
    parse = require("../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;


exports["test while loop"] = function () {
    var source = 'while(true);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('WhileStmt',{},
                    Node('LiteralExpr',{type:'boolean',value:true}),
                    Node('EmptyStmt',{})));
    assert.deepEqual(program, nodes);
};

exports["test do-while loop"] = function () {
    var source = 'do {} while(true);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('DoWhileStmt',{},
                    Node('BlockStmt',{}),
                    Node('LiteralExpr',{type:'boolean',value:true})));
    assert.deepEqual(program, nodes);
};

exports["test for loop"] = function () {
    var source = 'for(1;;1);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ForStmt',{},
                    Node('LiteralExpr',{type:'number',value:1}),
                    Node('Empty'),
                    Node('LiteralExpr',{type:'number',value:1}),
                    Node('EmptyStmt', {})));
    assert.deepEqual(program, nodes);
};

exports["test for loop with variable"] = function () {
    var source = 'for(var i = 0;;1);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ForStmt',{},
                    Node('VarDecl',{},
                        Node('InitPatt',{},
                            IdPatt('i'),
                            Node('LiteralExpr',{type:'number',value:0}))),
                    Node('Empty'),
                    Node('LiteralExpr',{type:'number',value:1}),
                    Node('EmptyStmt', {})));
    assert.deepEqual(program, nodes);
};

exports["test for-in loop"] = function () {
    var source = 'for(p in obj);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ForInStmt',{},
                    Node('IdExpr', {name:'p'}),
                    Node('IdExpr', {name:'obj'}),
                    Node('EmptyStmt', {})));
    assert.deepEqual(program, nodes);
};

exports["test for-in loop with var"] = function () {
    var source = 'for(var p in obj);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ForInStmt',{},
                    Node('VarDecl',{},IdPatt('p')),
                    Node('IdExpr', {name:'obj'}),
                    Node('EmptyStmt', {})));
    assert.deepEqual(program, nodes);
};

exports["test for-in loop with var init"] = function () {
    var source = 'for(var p=0 in obj);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ForInStmt',{},
                    Node('VarDecl',{},
                        Node('InitPatt',{},
                            IdPatt('p'),
                            Node('LiteralExpr',{type:'number',value:0}))),
                    Node('IdExpr', {name:'obj'}),
                    Node('EmptyStmt', {})));
    assert.deepEqual(program, nodes);
};

exports["test for-in loop with var init"] = function () {
    var source = 'for(var p=0 in obj);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ForInStmt',{},
                    Node('VarDecl',{},
                        Node('InitPatt',{},
                            IdPatt('p'),
                            Node('LiteralExpr',{type:'number',value:0}))),
                    Node('IdExpr', {name:'obj'}),
                    Node('EmptyStmt', {})));
    assert.deepEqual(program, nodes);
};

