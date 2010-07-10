
var assert = require("assert"),
    parse = require("../setup").parse,
    toJS = require("../setup").toJS;

exports["test labels"] = function () {
    var source = 'labelled: 0;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test continue"] = function () {
    var source = 'continue a;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test switch"] = function () {
    var source = 'switch(e) { }',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test switch with case"] = function () {
    var source = 'switch(e) { case 2: 2;}',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test switch with case and break"] = function () {
    var source = 'switch(e) { case 2: 2; break; }',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test switch with case and default"] = function () {
    var source = 'switch(e) { case 2: 3; default: 1; case 4: break a;}',
        program = parse(source);

    assert.deepEqual(program, parse(toJS(program)));
};

exports["test if no else"] = function () {
    var source = 'if (true) { 1;2;3;}',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test if else"] = function () {
    var source = 'if (true)1;else 2;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test if, else if, else"] = function () {
    var source = 'if (true)1;else if(false)2;else {3;2;1;}',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

