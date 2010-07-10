
var assert = require("assert"),
    parse = require("../setup").parse,
    toJS = require("../setup").toJS;

exports["test block"] = function () {
    var source = '{ 1; 2;}',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test with"] = function () {
    var source = 'with(42);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test debugger"] = function () {
    var source = 'debugger;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

