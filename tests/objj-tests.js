global.objj = true;

exports.testParser = require("./parser/parser-tests");
exports.testObjJParser = require("./objj/parser/parser-tests");
exports.testCodegen = require("./codegen/codegen-tests");
exports.testObjJCodegen = require("./objj/codegen/codegen-tests");

if (require.main === module)
    require("os").exit(require("test").run(exports));
