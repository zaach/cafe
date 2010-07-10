
exports.testParser = require("./parser/parser-tests");
exports.testCodegen = require("./codegen/codegen-tests");

if (require.main === module)
    require("os").exit(require("test").run(exports));
