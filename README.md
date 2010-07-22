
Welcome to the café
===================
We feature the most exquisite compilers to brew your JavaScript just the way you like it.
There is much work to be done but a few recipes are ready for you to try and help improve.
No refunds if you grow a third arm!

Install
-------
Clone the repository with git.

js.js
-----
Here's an example of callbacks from the examples directory:

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

Run with node:

    node ./examples/function-decl.js

The script is parsed in AST form, which you can modify, and then converted back to JavaScript.
I'm not sure what kind of API cafe will have, really, but this seemed like something cool and easy to show. There are more tricks possible.

objj.js
-------
There's also an Objective-J to JavaScript compiler. It doesn't contain the Objective-J runtime or anything, but could help catch syntactic errors. It probably needs an official once over from 280North to make sure it's correct, but when it is it should be better at catching syntax errors than the official Objective-J parser.

harmony.js (soon)
----------------
I plan to have a Simple Modules to JavaScript and CommonJS module compilation and other syntactic goodies.

(your js here).js
-----------------
Whatever, let's go wild and add stuff.


To be continued...

-Zach
