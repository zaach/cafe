
var assert = require("assert"),
    parser = require("../setup").parser,
    parse = require("../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;

exports["test null literal"] = function () {
    var source = 'null;',
        program = parse(source),
        nodes = Node('Program',{},Node('LiteralExpr',{type:'null',value:null}));
    assert.deepEqual(program, nodes);
};

exports["test true literal"] = function () {
    var source = 'true;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('LiteralExpr',{type:'boolean',value:true}));
    assert.deepEqual(program, nodes);
};

exports["test false literal"] = function () {
    var source = 'false;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('LiteralExpr',{type:'boolean',value:false}));
    assert.deepEqual(program, nodes);
};

exports["test number literal"] = function () {
    var source = '42;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('LiteralExpr',{type:'number',value:42}));
    assert.deepEqual(program, nodes);
};

exports["test number hex literal"] = function () {
    var source = '0xff;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('LiteralExpr',{type:'number',value:255}));
    assert.deepEqual(program, nodes);
};

exports["test string literal"] = function () {
    var source = '"hello";',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('LiteralExpr',{type:'string',value:"hello"}));
    assert.deepEqual(program, nodes);
};

exports["test string literal with escapes"] = function () {
    var source = '"h\\el\\"l\\no \\\\test";',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('LiteralExpr',{type:'string',value:'hel\"l\\no \\\\test'}));
    assert.deepEqual(program, nodes);
};

exports["test string literal with line continuation"] = function () {
    var source = '"h\\el\\"l\\no \\\ntest";',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('LiteralExpr',{type:'string',value:'hel\"l\\no test'}));
    assert.deepEqual(program, nodes);
};

exports["test string literal linebreak throws"] = function () {
    var source = '"h\nello";';
    assert['throws'](function () { parse(source); });
};

exports["test array literal"] = function () {
    var source = '[];',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('ArrayExpr',{}));
    assert.deepEqual(program, nodes);
};

exports["test array literal list"] = function () {
    var source = '[,1,,2,3,,];',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('ArrayExpr',{},
                      Node('Empty'),
                      Node('LiteralExpr',{type:'number',value:1}),
                      Node('Empty'),
                      Node('LiteralExpr',{type:'number',value:2}),
                      Node('LiteralExpr',{type:'number',value:3}),
                      Node('Empty')));
    assert.deepEqual(program, nodes);
};

exports["test object literal"] = function () {
    var source = '({});',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('ObjectExpr',{parens:true}));
    assert.deepEqual(program, nodes);
};

exports["test object literal with properties"] = function () {
    var source = '({a:1, "b":2, 3:3});',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('ObjectExpr',{parens:true},
                      Node('DataProp', {name:'a'},
                        Node('LiteralExpr',{type:'number',value:1})),
                      Node('DataProp', {name:'b'},
                        Node('LiteralExpr',{type:'number',value:2})),
                      Node('DataProp', {name:3},
                        Node('LiteralExpr',{type:'number',value:3}))));
    assert.deepEqual(program, nodes);
};

exports["test object literal with getter"] = function () {
    var source = '({get foo(){1;}});',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('ObjectExpr',{parens:true},
                      Node('GetterSetterProp', {name:'foo', op:'get'},
                        Node('ParamDecl', {}),
                        Node('LiteralExpr',{type:'number',value:1}))));
    assert.deepEqual(program, nodes);
};

exports["test object literal with getter and param"] = function () {
    var source = '({get foo(a){1;}});',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('ObjectExpr',{parens:true},
                      Node('GetterSetterProp', {name:'foo', op:'get'},
                        Node('ParamDecl', {}, IdPatt('a')),
                        Node('LiteralExpr',{type:'number',value:1}))));
    assert.deepEqual(program, nodes);
};

exports["test object literal with setter"] = function () {
    var source = '({set foo(){1;}});',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('ObjectExpr',{parens:true},
                      Node('GetterSetterProp', {name:'foo', op:'set'},
                        Node('ParamDecl', {}),
                        Node('LiteralExpr',{type:'number',value:1}))));
    assert.deepEqual(program, nodes);
};

exports["test object literal with setter and param"] = function () {
    var source = '({set foo(a){1;}});',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('ObjectExpr',{parens:true},
                      Node('GetterSetterProp', {name:'foo', op:'set'},
                        Node('ParamDecl', {}, IdPatt('a')),
                        Node('LiteralExpr',{type:'number',value:1}))));
    assert.deepEqual(program, nodes);
};

exports["test object literal with wrong getter setter op"] = function () {
    var source = '({st foo(){1;}});';
    assert['throws'](function (){parse(source);});
};

exports["test object literal with wrong getter setter op and param"] = function () {
    var source = '({st foo(a){1;}});';
    assert['throws'](function (){parse(source);});
};

exports["test regexp"] = function () {
    var source = '/aaa/;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('RegExpExpr',{body: 'aaa',flags:''}));
    assert.deepEqual(program, nodes);
};

exports["test regexp with flags"] = function () {
    var source = '/aaa/gi;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('RegExpExpr',{body: 'aaa',flags:'gi'}));
    assert.deepEqual(program, nodes);
};

exports["test bad regexp"] = function () {
    var source = '/aaa/ a;';

    assert["throws"](function () {parse(source);});
};

exports["test regexp with /="] = function () {
    var source = '/=aaa/;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('RegExpExpr',{body: '=aaa',flags:''}));
    assert.deepEqual(program, nodes);
};

exports["test complex regexp"] = function () {
    var source = '/\\/\\\\[^a\\]]/gi;',
        program = parse(source),
        nodes = Node('Program',{},
                    Node('RegExpExpr',{body: '\\/\\\\[^a\\]]',flags:'gi'}));
    assert.deepEqual(program, nodes);
};
