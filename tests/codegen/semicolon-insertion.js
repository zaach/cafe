
var assert = require("assert"),
    parse = require("../setup").parse,
    toJS = require("../setup").toJS;

exports["test expression line break semicolon insert"] = function () {
    var source = 'debugger\n45',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test return ASI"] = function () {
    var source = 'return\n5',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test return expr ASI"] = function () {
    var source = 'return 8\n5',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test break ASI"] = function () {
    var source = 'break\na',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test continue ASI"] = function () {
    var source = 'continue\na',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test throw insert"] = function () {
    var source = 'throw a',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test pre-incement"] = function () {
    var source = 'i\n++\nj',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test block"] = function () {
    var source = '{true}',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};
