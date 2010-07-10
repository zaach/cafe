
var assert = require("assert"),
    parse = require("../setup").parse,
    toJS = require("../setup").toJS;

exports["test try finally"] = function () {
    var source = 'try {} finally {}',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test try catch"] = function () {
    var source = 'try {} catch (e) {}',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test try catch finally"] = function () {
    var source = 'try {} catch (e) {} finally {}',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test throw"] = function () {
    var source = 'throw 42;',
        program = parse(source);
        
    assert.deepEqual(program, parse(toJS(program)));
};

