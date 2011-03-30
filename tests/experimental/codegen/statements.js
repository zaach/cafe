
var assert = require("assert"),
    parse = require("../../setup").parse,
    toJS = require("../../setup").toJS;

exports["test block call expr"] = function () {
    var source = 'foo(bar) { a; };',
        jssource = 'foo(bar, function (){ a; });',
        program = parse(source);

//console.log(toJS(program));
    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test block invoke expr"] = function () {
    var source = 'foo.bar(baz) { a; };',
        jssource = 'foo.bar(baz, function (){ a; });',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test block call expr no args"] = function () {
    var source = 'foo { a; };',
        jssource = 'foo(function (){ a; });',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test block invoke expr no args"] = function () {
    var source = 'foo.bar { a; };',
        jssource = 'foo.bar(function (){ a; });',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test block call expr with params"] = function () {
    var source = 'foo { |bar, baz| a; };',
        jssource = 'foo(function (bar, baz){ a; });',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};
