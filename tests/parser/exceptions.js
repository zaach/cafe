
var assert = require("assert"),
    parser = require("../setup").parser,
    parse = require("../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test try finally"] = function () {
    var source = 'try {} finally {}',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('TryStmt',{},
                    Node('BlockStmt',{}),
                    Node('Empty'),
                    Node('BlockStmt',{})));
    assert.deepEqual(program, nodes);
};

exports["test try catch"] = function () {
    var source = 'try {} catch (e) {}',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('TryStmt',{},
                    Node('BlockStmt',{}),
                    Node('CatchClause',{},
                      IdPatt('e'),
                      Node('BlockStmt',{}))));
    assert.deepEqual(program, nodes);
};

exports["test try catch finally"] = function () {
    var source = 'try {} catch (e) {} finally {}',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('TryStmt',{},
                    Node('BlockStmt',{}),
                    Node('CatchClause',{},
                      IdPatt('e'),
                      Node('BlockStmt',{})),
                    Node('BlockStmt',{})));
    assert.deepEqual(program, nodes);
};

exports["test throw"] = function () {
    var source = 'throw 42;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ThrowStmt',{},
                    Node('LiteralExpr',{type:'number',value:42})));
    assert.deepEqual(program, nodes);
};

