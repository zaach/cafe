
// Define Objective-J AST nodes

exports.defineNodes = function defineNodes (prototypes, constructors, def) {

var node = prototypes.base,
    stmt = prototypes.stmt,
    expr = prototypes.expr;

def(stmt,'BlockCallExpr', { });
def(stmt,'BlockArg', { });
def(stmt,'BlockParamDecl', { });

return def;
}
