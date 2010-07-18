
var indentChar = '    '; //4 spaces

function idt (lvl) {
    return Array(lvl+1).join(indentChar);
}

var codegens = exports.nodes = {
    'ImportDecl': function ImportDecl_codegen (lvl) {
        var moduleName = this.children[0].toJS(lvl);
        return 'var '+
            this.children[1].children.map(function (node){
                return node.aliased()+' = '+moduleName+'.'+node.name;
            }).join(',\n'+idt(lvl));
    },
    'ModuleSpecifier': function ModuleSpecifier_codegen (lvl) {
        return 'require("'+this.children[0].name+'")'+
                this.children.slice(1).map(function (node){ return '.'+node.name;}).join('');
    },
    'ImportSpecifierItem': function ImportSpecifierItem_codegen (lvl) {
    },
};

// Extend the node prototypes to include code generation functions
exports.extend = function extend (protos) {
    var type;
    for (type in codegens) {
        protos[type].toJS = codegens[type];
    }
};
