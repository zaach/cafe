
var indentChar = '    '; //4 spaces

function idt (lvl) {
    return Array(lvl+1).join(indentChar);
}

var codegens = exports.nodes = {
    'BlockCallExpr': function BlockCallExpr_codegen (lvl) {
        return this.children[0].toJS(lvl);
    },
    'BlockArg': function BlockArg_codegen (lvl) {
        return 'function ('
            +this.children[0].toJS() + ') '
            +'{\n'+idt(lvl)+genStmts(this.children.slice(1), lvl) +'\n'+idt(lvl-1)+'}';
    },
    'BlockParamDecl': function BlockParamDecl_codegen (lvl) {
        return this.children.map(function(node){return node.toJS(lvl)}).join(', ');
    },
};

// convenience function for generating a list of statements
function genStmts (nodes, lvl) {
    return nodes.map(function(node){return node.blockgen(lvl)}).join('\n'+idt(lvl));
}
// Extend the node prototypes to include code generation functions
exports.extend = function extend (protos) {
    var type;
    for (type in codegens) {
        protos[type].toJS = codegens[type];
    }
};
