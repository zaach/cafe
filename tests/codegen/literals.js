
var assert = require("assert"),
    parse = require("../setup").parse,
    toJS = require("../setup").toJS;

exports["test null literal"] = function () {
    var source = 'null;',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test true literal"] = function () {
    var source = 'true;',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test false literal"] = function () {
    var source = 'false;',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test number literal"] = function () {
    var source = '42;',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test string literal"] = function () {
    var source = '"hello";',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test array literal"] = function () {
    var source = '[];',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test array literal list"] = function () {
    var source = '[,1,,2,3,,];',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test object literal"] = function () {
    var source = '({});',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test object literal with properties"] = function () {
    var source = '({a:1, "b":2, 3:3});',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test object literal with getter"] = function () {
    var source = '({get foo(){1;}});',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test object literal with getter and param"] = function () {
    var source = '({get foo(a){1;}});',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test object literal with setter"] = function () {
    var source = '({set foo(){1;}});',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test object literal with setter and param"] = function () {
    var source = '({set foo(a){1;}});',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test regexp"] = function () {
    var source = '(/aaa/);',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test regexp with flags"] = function () {
    var source = '(/aaa/gi);',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test regexp with /="] = function () {
    var source = '(/=aaa/);',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};

exports["test complex regexp"] = function () {
    var source = '(/\\/\\\\[^a\\]]/gi);',
        program = parse(source);
    assert.deepEqual(program, parse(toJS(program)));
};
