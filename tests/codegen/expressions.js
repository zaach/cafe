
var assert = require("assert"),
    parse = require("../setup").parse,
    toJS = require("../setup").toJS;

exports["test conditional"] = function () {
    var source = 'a ? b : c;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test logical or"] = function () {
    var source = 'vim || emacs;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test logical and"] = function () {
    var source = 'fast && slow;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test bitwise or"] = function () {
    var source = 'vim | emacs;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test bitwise xor"] = function () {
    var source = 'vim ^ emacs;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test bitwise and"] = function () {
    var source = 'vim & emacs;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test equality"] = function () {
    var source = 'a == b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test strict equality"] = function () {
    var source = 'a === b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test not equal"] = function () {
    var source = 'a != b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test strict not equal"] = function () {
    var source = 'a !== b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test in"] = function () {
    var source = 'a in b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test instanceof"] = function () {
    var source = 'a instanceof b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test >="] = function () {
    var source = 'a >= b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test <="] = function () {
    var source = 'a <= b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test >"] = function () {
    var source = 'a > b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test <"] = function () {
    var source = 'a < b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test >>>"] = function () {
    var source = 'a >>> b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test <<"] = function () {
    var source = 'a << b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test >>"] = function () {
    var source = 'a >> b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test add"] = function () {
    var source = 'a + b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test subtract"] = function () {
    var source = 'a - b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test modulus"] = function () {
    var source = 'a % b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test divide"] = function () {
    var source = 'a / b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test divide ambiguities"] = function () {
    var source = 'a / b / c;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test multiply"] = function () {
    var source = 'a * b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test order of operations"] = function () {
    var source = '(a + c) * b;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test void"] = function () {
    var source = 'void 0;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test not"] = function () {
    var source = '!a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test bitwise not"] = function () {
    var source = '~a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test negate"] = function () {
    var source = '-a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test UnaryPlusExpr"] = function () {
    var source = '+a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test delete"] = function () {
    var source = 'delete a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test typeof"] = function () {
    var source = 'typeof a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test ++a"] = function () {
    var source = '++a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test --a"] = function () {
    var source = '--a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test a++"] = function () {
    var source = 'a++;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test a--"] = function () {
    var source = 'a--;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test new"] = function () {
    var source = 'new a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test new with args"] = function () {
    var source = 'new foo(bar);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test member property"] = function () {
    var source = 'foo.bar;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test member property bracket access"] = function () {
    var source = 'foo[false];',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test member property nested"] = function () {
    var source = 'foo.bar.baz;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test call with args"] = function () {
    var source = 'a(b,c);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test double call"] = function () {
    var source = 'foo(bar)(baz);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test call member"] = function () {
    var source = 'foo().bar;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test call member with brackets"] = function () {
    var source = 'foo()[true];',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test invoke"] = function () {
    var source = 'foo.bar(b,c);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test expression list"] = function () {
    var source = '1,2,3;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};
