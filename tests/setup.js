if (typeof objj !== 'undefined') { //hacky
exports.parser = require("../lib/objj").parser;
exports.parse = require("../lib/objj").parse;
exports.toJS = require("../lib/objj").toJS;
} else {
exports.parser = require("../lib/js").parser;
exports.parse = require("../lib/js").parse;
exports.toJS = require("../lib/js").toJS;
}
