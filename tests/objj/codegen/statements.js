
var assert = require("assert"),
    parse = require("../../setup").parse,
    toJS = require("../../setup").toJS;

exports["test import"] = function () {
    var source = '@import "test.j"',
        jssource = 'objj_executeFile("test.j", YES);',
        program = parse(source);
        
    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test class implementation"] = function () {
    var source = '@implementation Person @end',
        jssource = '{var $objj_className = "Person", the_class = objj_allocateClassPair(Nil, $objj_className), meta_class = the_class.isa;objj_registerClassPair(the_class); }',
        program = parse(source);
        
    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test class implementation with empty vars"] = function () {
    var source = '@implementation Person { } @end',
        jssource = '{var $objj_className = "Person", the_class = objj_allocateClassPair(Nil, $objj_className), meta_class = the_class.isa;objj_registerClassPair(the_class); }',
        program = parse(source);
        
    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test class implementation with superclass"] = function () {
    var source = '@implementation Person : CPObject { } @end',
        jssource = '{var $objj_className = "Person", the_class = objj_allocateClassPair(CPObject, $objj_className), meta_class = the_class.isa;objj_registerClassPair(the_class); }',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test class implementation with superclass and vars"] = function () {
    var source = '@implementation Person : CPObject { CPString name; CPString foo; } @end',
        jssource = '{var $objj_className = "Person", the_class = objj_allocateClassPair(CPObject, $objj_className), meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("name"), new objj_ivar("foo")]);objj_registerClassPair(the_class); }',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test class implementation with class method"] = function () {
    var source = '@implementation Person : CPObject { } +(CPString)foo { return true;} @end',
        jssource = '{var $objj_className = "Person", the_class = objj_allocateClassPair(CPObject, $objj_className), meta_class = the_class.isa;objj_registerClassPair(the_class);'+
            'class_addMethods(meta_class, ['+
'new objj_method(sel_getUid("foo"), function $Person__foo(self, _cmd) { with(self) { return true; } }'+
            ',["CPString"])]);}',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test class implementation with instance method"] = function () {
    var source = '@implementation Person : CPObject { } +(CPString)foo { return true;} -(id)bar { return false;} @end',
        jssource = '{var $objj_className = "Person", the_class = objj_allocateClassPair(CPObject, $objj_className), meta_class = the_class.isa;objj_registerClassPair(the_class);'+
            'class_addMethods(meta_class, ['+
'new objj_method(sel_getUid("foo"), function $Person__foo(self, _cmd) { with(self) { return true; } }'+
            ',["CPString"])]);'+
            'class_addMethods(the_class, ['+
'new objj_method(sel_getUid("bar"), function $Person__bar(self, _cmd) { with(self) { return false; } }'+
            ',["id"])]);'+
            '}',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};

exports["test class implementation with class method using selectors"] = function () {
    var source = '@implementation Person : CPObject { } +(CPString)setName:(CPString)aName age:(int)anAge { return true;} @end',
        jssource = '{var $objj_className = "Person", the_class = objj_allocateClassPair(CPObject, $objj_className), \nmeta_class = the_class.isa;objj_registerClassPair(the_class);'+
            'class_addMethods(meta_class, ['+
'new objj_method(sel_getUid("setName:age:"), function $Person__setName_age_(self, _cmd, aName, anAge) \n{ with(self) \n{ \nreturn true; \n} \n}'+
            ',["CPString", "CPString", "int"])]);\n}',
        program = parse(source);

    assert.deepEqual(parse(jssource), parse(toJS(program)));
};
