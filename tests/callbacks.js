var assert = require("assert"),
    compiler = require("./setup").compiler;

exports["test parser callback"] = function () {
    var source = 'foo';

    compiler.on('parse:IdExpr', function () {
        assert.equal(this.name, 'foo');
    });
    compiler.parser.parse(source);
    compiler.off('parse');
};

exports["test parser multi callback"] = function () {
    var source = 'foo, bar';
    var parsed = 0;

    compiler.on('parse:IdExpr', function () {
        parsed++;
    });
    compiler.parser.parse(source);
    assert.equal(parsed, 2);
    compiler.off('parse');
};

exports["test parser multi callback"] = function () {
    var source = 'foo, bar';
    var parsed = 0;

    compiler.on('parse:IdExpr', function () {
        parsed++;
    });
    compiler.parser.parse(source);
    assert.equal(parsed, 2);
    compiler.off('parse');
};

exports["test parser function callback"] = function () {
    var source = 'function foo () { }\nfunction bar () {}';
    var parsed = 0;

    compiler.on('parse:FunctionDecl', function () {
        parsed++;
    });
    compiler.parser.parse(source);
    assert.equal(parsed, 2);
    compiler.off('parse');
};
