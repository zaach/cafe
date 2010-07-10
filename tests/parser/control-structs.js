
var assert = require("assert"),
    parser = require("../setup").parser,
    parse = require("../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test labels"] = function () {
    var source = 'labelled: 0;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('LabelledStmt',{label:'labelled'},
                    Node('LiteralExpr',{type:'number',value:0})));
    assert.deepEqual(program, nodes);
};

exports["test continue"] = function () {
    var source = 'continue a;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ContinueStmt',{label:'a'}))
    assert.deepEqual(program, nodes);
};

exports["test switch"] = function () {
    var source = 'switch(e) { }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('SwitchStmt',{},
                    Node('IdExpr',{name:'e'})));
    assert.deepEqual(program, nodes);
};

exports["test switch with case and break"] = function () {
    var source = 'switch(e) { case 2: 2;\n break; }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('SwitchStmt',{},
                    Node('IdExpr',{name:'e'}),
                    Node('Case',{},
                      Node('LiteralExpr',{type:'number',value:2}),
                      Node('LiteralExpr',{type:'number',value:2}),
                      Node('BreakStmt',{}))));
    assert.deepEqual(program, nodes);
};

exports["test switch with case and default"] = function () {
    var source = 'switch(e) { case 2: 3;\n default: 1;\n case 4: break a; }',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('SwitchStmt',{},
                    Node('IdExpr',{name:'e'}),
                    Node('Case',{},
                      Node('LiteralExpr',{type:'number',value:2}),
                      Node('LiteralExpr',{type:'number',value:3})),
                    Node('DefaultCase',{},
                      Node('LiteralExpr',{type:'number',value:1})),
                    Node('Case',{},
                      Node('LiteralExpr',{type:'number',value:4}),
                      Node('BreakStmt', {label:'a'}))
                    ));

    assert.deepEqual(program, nodes);
};

exports["test if no else"] = function () {
    var source = 'if (true);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('IfStmt',{},
                    Node('LiteralExpr',{type:'boolean',value:true}),
                    Node('EmptyStmt', {}),
                    Node('EmptyStmt', {})));
    assert.deepEqual(program, nodes);
};

exports["test if else"] = function () {
    var source = 'if (true)1;else 2;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('IfStmt',{},
                    Node('LiteralExpr',{type:'boolean',value:true}),
                    Node('LiteralExpr',{type:'number',value:1}),
                    Node('LiteralExpr',{type:'number',value:2})));
    assert.deepEqual(program, nodes);
};

exports["test if, else if, else"] = function () {
    var source = 'if (true)1;else if(false)2;else 3;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('IfStmt',{},
                    Node('LiteralExpr',{type:'boolean',value:true}),
                    Node('LiteralExpr',{type:'number',value:1}),
                    Node('IfStmt',{},
                      Node('LiteralExpr',{type:'boolean',value:false}),
                      Node('LiteralExpr',{type:'number',value:2}),
                      Node('LiteralExpr',{type:'number',value:3}))));
    assert.deepEqual(program, nodes);
};


