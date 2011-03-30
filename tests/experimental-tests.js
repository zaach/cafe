global.experimental = true;

exports.testParser = require("./parser/parser-tests");
exports.testExperimentalParser = require("./experimental/parser/parser-tests");
exports.testCodegen = require("./codegen/codegen-tests");
exports.testExperimentalCodegen = require("./experimental/codegen/codegen-tests");

if (require.main === module)
    require("test").run(exports);
