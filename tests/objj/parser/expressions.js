
var assert = require("assert"),
    parser = require("../../setup").parser,
    parse = require("../../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test CPString"] = function () {
    var source = '@"foo"',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('LiteralExpr',{type: 'string', value: 'foo', cp: true}));
    assert.deepEqual(program, nodes);
};

exports["test super message send"] = function () {
    var source = '[super init];',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPSuperMessageSendExpr',{},
                    IdPatt('init')));
    assert.deepEqual(program, nodes);
};

exports["test simple message send"] = function () {
    var source = '[foo init];',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPMessageSendExpr',{},
                    Node('IdExpr',{name:'foo'}),
                    IdPatt('init')));
    assert.deepEqual(program, nodes);
};

exports["test message send with keywords"] = function () {
    var source = '[foo setName:@"Joe" age: 21];',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPMessageSendExpr',{},
                    Node('IdExpr',{name:'foo'}),
                    Node('CPKeyword',{name:'setName'},
                      Node('LiteralExpr',{type:'string',value:'Joe',cp: true})),
                    Node('CPKeyword',{name:'age'},
                      Node('LiteralExpr',{type:'number',value:21}))
                    ));
    assert.deepEqual(program, nodes);
};

exports["test super message send with keywords"] = function () {
    var source = '[super setName:@"Joe" age: 21];',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CPSuperMessageSendExpr',{},
                    Node('CPKeyword',{name:'setName'},
                      Node('LiteralExpr',{type:'string',value:'Joe',cp: true})),
                    Node('CPKeyword',{name:'age'},
                      Node('LiteralExpr',{type:'number',value:21}))
                    ));
    assert.deepEqual(program, nodes);
};
