
exports.testParser = require("./parser/parser-tests");
exports.testCodegen = require("./codegen/codegen-tests");
exports.testCallbacks = require("./callbacks");

if (typeof process != 'undefined' || require.main === module)
    require("test").run(exports);
