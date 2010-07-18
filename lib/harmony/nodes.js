
// Define Objective-J AST nodes

exports.defineNodes = function defineNodes (prototypes, constructors, def) {

var node = prototypes.base,
    stmt = prototypes.stmt,
    expr = prototypes.expr;

def(stmt,'ExportDecl', { });

def(stmt,'ImportDecl', { });
def(stmt,'ImportWildcardDecl', { });

def(node,'ImportSpecifier', { });
def(node,'ImportSpecifierItem', {
    aliased: function () { return this.alias || this.name; }
});

def(node,'ModuleSpecifier', { });

def(stmt,'ModuleDecl', { });
def(stmt,'ModuleAssignDecl', { });

return def;
}
