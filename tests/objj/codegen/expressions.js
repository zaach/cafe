
var assert = require("assert"),
    parse = require("../../setup").parse,
    toJS = require("../../setup").toJS;

exports["test CPString"] = function () {
    var source = '@"foo"',
        jssource = '"foo"',
        program = parse(source);
        
    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test selector"] = function () {
    var source = '@selector(foo)',
        jssource = 'sel_getUid("foo");',
        program = parse(source);
        
    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test complex selector"] = function () {
    var source = '@selector(foo:bar:)',
        jssource = 'sel_getUid("foo:bar:");',
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

exports["test class implementation with class method super expression"] = function () {
    var source = '@implementation Person : CPObject { } +(CPString)foo { [super init];} @end',
        jssource = '{var $objj_className = "Person", the_class = objj_allocateClassPair(CPObject, $objj_className), meta_class = the_class.isa;objj_registerClassPair(the_class);'+
            'class_addMethods(meta_class, ['+
'new objj_method(sel_getUid("foo"), function $Person__foo(self, _cmd) { with(self) { objj_msgSendSuper({ receiver:self, super_class:objj_getClass($objj_className).super_class }, "init"); } }'+
            ',["CPString"])]);}',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};


