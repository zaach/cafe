
var assert = require("assert"),
    parser = require("../setup").parser,
    parse = require("../setup").parse,
    Node = parser.yy.Node,
    IdPatt = parser.yy.IdPatt;



exports["test conditional"] = function () {
    var source = 'a ? b : c;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ConditionalExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'}),
                    Node('IdExpr',{name:'c'})
                    ));
    assert.deepEqual(program, nodes);
};

exports["test logical or"] = function () {
    var source = 'vim || emacs;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('LogicalORExpr',{},
                    Node('IdExpr',{name:'vim'}),
                    Node('IdExpr',{name:'emacs'})
                    ));
    assert.deepEqual(program, nodes);
};

exports["test logical and"] = function () {
    var source = 'fast && slow;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('LogicalANDExpr',{},
                    Node('IdExpr',{name:'fast'}),
                    Node('IdExpr',{name:'slow'})
                    ));
    assert.deepEqual(program, nodes);
};

exports["test bitwise or"] = function () {
    var source = 'vim | emacs;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BitwiseORExpr',{},
                    Node('IdExpr',{name:'vim'}),
                    Node('IdExpr',{name:'emacs'})
                    ));
    assert.deepEqual(program, nodes);
};

exports["test bitwise xor"] = function () {
    var source = 'vim ^ emacs;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BitwiseXORExpr',{},
                    Node('IdExpr',{name:'vim'}),
                    Node('IdExpr',{name:'emacs'})
                    ));
    assert.deepEqual(program, nodes);
};

exports["test bitwise and"] = function () {
    var source = 'vim & emacs;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BitwiseANDExpr',{},
                    Node('IdExpr',{name:'vim'}),
                    Node('IdExpr',{name:'emacs'})));
    assert.deepEqual(program, nodes);
};

exports["test equality"] = function () {
    var source = 'a == b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('EqualExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test strict equality"] = function () {
    var source = 'a === b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('StrictEqualExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test not equal"] = function () {
    var source = 'a != b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('NotEqualExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test strict not equal"] = function () {
    var source = 'a !== b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('StrictNotEqualExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test in"] = function () {
    var source = 'a in b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('InExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test instanceof"] = function () {
    var source = 'a instanceof b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('InstanceofExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test >="] = function () {
    var source = 'a >= b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('GreaterEqExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test <="] = function () {
    var source = 'a <= b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('LessEqExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test >"] = function () {
    var source = 'a > b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('GreaterExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test <"] = function () {
    var source = 'a < b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('LessExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test >>>"] = function () {
    var source = 'a >>> b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('URightShiftExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test <<"] = function () {
    var source = 'a << b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('LeftShiftExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test >>"] = function () {
    var source = 'a >> b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('RightShiftExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test add"] = function () {
    var source = 'a + b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('AddExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test subtract"] = function () {
    var source = 'a - b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('SubExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test modulus"] = function () {
    var source = 'a % b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('ModExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test divide"] = function () {
    var source = 'a / b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('DivExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test divide ambiguities"] = function () {
    var source = 'a / b / c;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('DivExpr',{},
                    Node('DivExpr',{},
                      Node('IdExpr',{name:'a'}),
                      Node('IdExpr',{name:'b'})),
                    Node('IdExpr',{name:'c'})));
    assert.deepEqual(program, nodes);
};

exports["test multiply"] = function () {
    var source = 'a * b;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('MultExpr',{},
                    Node('IdExpr',{name:'a'}),
                    Node('IdExpr',{name:'b'})));
    assert.deepEqual(program, nodes);
};

exports["test void"] = function () {
    var source = 'void 0;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('VoidExpr',{},
                    Node('LiteralExpr',{type:'number',value:0})));
    assert.deepEqual(program, nodes);
};

exports["test not"] = function () {
    var source = '!a;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('LogicalNotExpr',{},
                    Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test bitwise not"] = function () {
    var source = '~a;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BitwiseNotExpr',{},
                    Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test negate"] = function () {
    var source = '-a;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('NegateExpr',{},
                    Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test UnaryPlusExpr"] = function () {
    var source = '+a;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('UnaryPlusExpr',{},
                    Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test delete"] = function () {
    var source = 'delete a;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('DeleteExpr',{},
                    Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test typeof"] = function () {
    var source = 'typeof a;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('TypeofExpr',{},
                    Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test ++a"] = function () {
    var source = '++a;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CountExpr',{op:'++', isPrefix: true},
                    Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test --a"] = function () {
    var source = '--a;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CountExpr',{op:'--', isPrefix: true},
                    Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test a++"] = function () {
    var source = 'a++;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CountExpr',{op:'++', isPrefix: false},
                    Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test a--"] = function () {
    var source = 'a--;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CountExpr',{op:'--', isPrefix: false},
                    Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test new"] = function () {
    var source = 'new a;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('NewExpr',{},
                    Node('IdExpr',{name:'a'})));
    assert.deepEqual(program, nodes);
};

exports["test new with args"] = function () {
    var source = 'new foo(bar);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('NewExpr',{},
                    Node('IdExpr',{name:'foo'}),
                    Node('IdExpr',{name:'bar'})));
    assert.deepEqual(program, nodes);
};

exports["test member property"] = function () {
    var source = 'foo.bar;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('MemberExpr',{brackets: false},
                    Node('IdExpr',{name:'foo'}),
                    Node('LiteralExpr',{type:'string',value:'bar'})));
    assert.deepEqual(program, nodes);
};

exports["test member property bracket access"] = function () {
    var source = 'foo[false];',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('MemberExpr',{brackets: true},
                    Node('IdExpr',{name:'foo'}),
                    Node('LiteralExpr',{type:'boolean',value:false})));
    assert.deepEqual(program, nodes);
};

exports["test member property nested"] = function () {
    var source = 'foo.bar.baz;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('MemberExpr',{brackets: false},
                    Node('MemberExpr',{brackets: false},
                      Node('IdExpr',{name:'foo'}),
                      Node('LiteralExpr',{type:'string',value:'bar'})),
                    Node('LiteralExpr',{type:'string',value:'baz'})));
    assert.deepEqual(program, nodes);
};

exports["test call with args"] = function () {
    var source = 'a(b,c);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CallExpr',{},
                    Node('IdExpr',{name:'a'}),
                      Node('IdExpr',{name:'b'}),
                      Node('IdExpr',{name:'c'})));
    assert.deepEqual(program, nodes);
};

exports["test double call"] = function () {
    var source = 'foo(bar)(baz);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('CallExpr',{},
                    Node('CallExpr',{},
                      Node('IdExpr',{name:'foo'}),
                      Node('IdExpr',{name:'bar'})),
                    Node('IdExpr',{name:'baz'})));
    assert.deepEqual(program, nodes);
};

exports["test call member"] = function () {
    var source = 'foo().bar;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('MemberExpr',{brackets: false},
                    Node('CallExpr',{},
                      Node('IdExpr',{name:'foo'})),
                    Node('LiteralExpr',{type:'string',value:'bar'})));
    assert.deepEqual(program, nodes);
};

exports["test call member with brackets"] = function () {
    var source = 'foo()[true];',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('MemberExpr',{brackets: true},
                    Node('CallExpr',{},
                      Node('IdExpr',{name:'foo'})),
                    Node('LiteralExpr',{type:'boolean',value:true})));
    assert.deepEqual(program, nodes);
};

exports["test invoke"] = function () {
    var source = 'foo.bar(b,c);',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('InvokeExpr',{brackets:false},
                    Node('IdExpr',{name:'foo'}),
                    Node('LiteralExpr',{type:'string',value:'bar'}),
                    Node('IdExpr',{name:'b'}),
                    Node('IdExpr',{name:'c'})));
    assert.deepEqual(program, nodes);
};

exports["test expression list"] = function () {
    var source = '1,2,3;',
        program = parse(source),
        nodes = Node('Program',{},
                  Node('BinaryExpr',{op:','},
                    Node('BinaryExpr',{op:','},
                      Node('LiteralExpr',{type:'number',value:1}),
                      Node('LiteralExpr',{type:'number',value:2})),
                    Node('LiteralExpr',{type:'number',value:3})));
    assert.deepEqual(program, nodes);
};
