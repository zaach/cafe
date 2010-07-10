
var assert = require("assert"),
    parse = require("../setup").parse,
    toJS = require("../setup").toJS;

exports["test single var decl"] = function () {
    var source = 'var a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test var decl init"] = function () {
    var source = 'var a = true;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test var decl list"] = function () {
    var source = 'var a, b, c;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test single conts decl"] = function () {
    var source = 'const a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test const decl init"] = function () {
    var source = 'const a = true;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test const decl list"] = function () {
    var source = 'const a, b, c;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test implicit global"] = function () {
    var source = 'a = true;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test /= assign"] = function () {
    var source = 'a /= 5;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test /= assign ambiguous"] = function () {
    var source = 'a /= 5 / a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test *= assign"] = function () {
    var source = 'a *= 5;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test -= assign"] = function () {
    var source = 'a -= 5;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test += assign"] = function () {
    var source = 'a += 5;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test %= assign"] = function () {
    var source = 'a %= 5;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test &= assign"] = function () {
    var source = 'a &= 5;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test |= assign"] = function () {
    var source = 'a |= 5;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test ^= assign"] = function () {
    var source = 'a ^= 5;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test <<= assign"] = function () {
    var source = 'a <<= 5;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test >>= assign"] = function () {
    var source = 'a >>= 5;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test >>>= assign"] = function () {
    var source = 'a >>>= 5;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

