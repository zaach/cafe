
var assert = require("assert"),
    parse = require("../../setup").parse,
    toJS = require("../../setup").toJS;

exports["test module import"] = function () {
    var source = 'import Math.{sum,pi};',
        jssource = 'var sum = require("Math").sum,pi = require("Math").pi;',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test module import alias"] = function () {
    var source = 'import Math.{sum:add,pi};',
        jssource = 'var add = require("Math").sum,pi = require("Math").pi;',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};
