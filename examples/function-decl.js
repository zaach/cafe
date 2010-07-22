var 
  sys = require("sys"),
  cafe = require("../lib/cafe"),
  compiler = new cafe.js.Compiler();

compiler.on("parse:FunctionDecl", function () {
  sys.puts(sys.inspect(this));

  // rewrite the function name
  this.children[0].name = 'zomg';
});

var source = "function foo (bar) { return this; }";

var ast = compiler.parse(source);

sys.puts(ast.toJS(0));
