global.harmony = true;

exports.testParser = require("./parser/parser-tests");
exports.testHarmonyParser = require("./harmony/parser/parser-tests");
exports.testCodegen = require("./codegen/codegen-tests");
exports.testHarmonyCodegen = require("./harmony/codegen/codegen-tests");

if (require.main === module)
    require("test").run(exports);
