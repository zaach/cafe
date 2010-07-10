
var assert = require("assert"),
    parse = require("../../setup").parse,
    toJS = require("../../setup").toJS;

exports["test CPString"] = function () {
    var source = '@"foo"',
        jssource = '"foo"',
        program = parse(source);
        
    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test simple message send"] = function () {
    var source = '[foo init];',
        jssource = 'objj_msgSend(foo, "init")',
        program = parse(source);
        
    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test message send with keywords"] = function () {
    var source = '[foo setName:@"Joe" age: 21];',
        jssource = 'objj_msgSend(foo, "setName:age:", "Joe", 21)',
        program = parse(source);
        
    assert.deepEqual(parse(jssource), parse(toJS(program)));
};
