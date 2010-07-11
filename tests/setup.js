if (typeof objj !== 'undefined') { //hacky
exports.parser = require("../lib/objj").parser;
exports.parse = require("../lib/objj").parse;
exports.toJS = require("../lib/objj").toJS;
} else if (typeof harmony !== 'undefined') {
exports.parser = require("../lib/harmony").parser;
exports.parse = require("../lib/harmony").parse;
exports.toJS = require("../lib/harmony").toJS;
} else {
exports.parser = require("../lib/js").parser;
exports.parse = require("../lib/js").parse;
exports.toJS = require("../lib/js").toJS;
}
