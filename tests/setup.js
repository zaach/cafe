var C;
if (typeof objj !== 'undefined') { //hacky
    C = require("../lib/objj").Compiler;
} else if (typeof harmony !== 'undefined') {
    C = require("../lib/harmony").Compiler;
} else if (typeof experimental !== 'undefined') {
    C = require("../lib/experimental").Compiler;
} else {
    C = require("../lib/js").Compiler;
}
var compiler = new C;
exports.compiler = compiler;
exports.parser = compiler.parser;
exports.parse = function (s) {return exports.parser.parse(s);};
exports.toJS = compiler.toJS;
