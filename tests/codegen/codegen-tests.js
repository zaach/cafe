// Parsing tests

exports.testControlStructures = require("./control-structs");
exports.testExceptions = require("./exceptions");
exports.testExpressions = require("./expressions");
exports.testFunctions = require("./functions");
exports.testLiterals = require("./literals");
exports.testLoops = require("./loops");
exports.testSemicolonInsertion = require("./semicolon-insertion");
exports.testStatements = require("./statements");
exports.testVariables = require("./variables");

if (require.main === module)
    require("os").exit(require("test").run(exports)); 
