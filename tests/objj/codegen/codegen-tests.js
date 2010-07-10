// Code generation tests

exports.testExpressions = require("./expressions");
exports.testStatements = require("./statements");

if (require.main === module)
    require("os").exit(require("test").run(exports)); 
