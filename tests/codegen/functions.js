
var assert = require("assert"),
    parse = require("../setup").parse,
    toJS = require("../setup").toJS;

exports["test empty function declaration"] = function () {
    var source = 'function foo () { }',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test function declaration with params and body"] = function () {
    var source = 'function foo (bar, baz) { return 42; }',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test function return this"] = function () {
    var source = 'function foo () { return this; }',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test function expression"] = function () {
    var source = '(function foo () { });',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test function expression with params and body"] = function () {
    var source = '(function foo (bar, baz) { return 42; });',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test anonymous function"] = function () {
    var source = '(function () { });',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test anonymous function with params and body"] = function () {
    var source = '(function (bar, baz) { return 42; });',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};


