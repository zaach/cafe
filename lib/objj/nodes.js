
// Define Objective-J AST nodes

exports.defineNodes = function defineNodes (prototypes, constructors, def) {

var node = prototypes.base,
    stmt = prototypes.stmt,
    expr = prototypes.expr;

def(stmt,'CPImportStmt', { });

def(stmt,'CPClassImplementationStmt', { });

def(stmt,'CPInstanceVars', { });
def(stmt,'CPInstanceVarDecl', { });

def(stmt,'CPClassMethodDecl', { });
def(stmt,'CPInstanceMethodDecl', { });

def(node,'CPSelectorsDecl', { });
def(node,'CPSelector', { });

// Expressions
def(expr,'CPMessageSendExpr', { });
def(expr,'CPSuperMessageSendExpr', { });
def(node,'CPKeyword', { });

def(node,'CPSelectorExpr', { });

return def;
}
