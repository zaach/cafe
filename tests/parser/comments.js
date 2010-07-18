
var assert = require("assert"),
    parser = require("../setup").parser,
    parse = require("../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test single line comment"] = function () {
    var source = '//hey\na',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('IdExpr',{name: 'a'}));
    assert.deepEqual(program, nodes);
};

exports["test hash comment"] = function () {
    var source = '#hey\na',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('IdExpr',{name: 'a'}));
    assert.deepEqual(program, nodes);
};

exports["test multiline comment"] = function () {
    var source = '/* \nhey\n */\na/* */',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('IdExpr',{name: 'a'}));
    assert.deepEqual(program, nodes);
};
