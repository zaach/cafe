
var assert = require("assert"),
    parse = require("../setup").parse,
    toJS = require("../setup").toJS;

exports["test while loop"] = function () {
    var source = 'while(true);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test do-while loop"] = function () {
    var source = 'do {} while(true);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test for loop"] = function () {
    var source = 'for(1;;1);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test for loop with variable"] = function () {
    var source = 'for(var i = 0;;1);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test for-in loop"] = function () {
    var source = 'for(p in obj);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test for-in loop with var"] = function () {
    var source = 'for(var p in obj);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test for-in loop with var init"] = function () {
    var source = 'for(var p=0 in obj);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test for-in loop with var init"] = function () {
    var source = 'for(var p=0 in obj);',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

