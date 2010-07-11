
var indentChar = '    '; //4 spaces

function idt (lvl) {
    return Array(lvl+1).join(indentChar);
}

var codegens = exports.nodes = {
    'CPImportStmt': function CPImport_codegen () {
        return 'objj_executeFile("'+this.name+'", '+(this.lib ? 'NO':'YES')+')';
    },
};

// Wrap epressions in parens if they were in original source
function curryParenWrap (fun) { return function () { return this.parens ? '('+fun.apply(this, arguments)+')' : fun.apply(this, arguments); }; }

// Extend the node prototypes to include code generation functions
exports.extend = function extend (protos) {
    var type;
    for (type in codegens) {
        protos[type].toJS = curryParenWrap(codegens[type]);
    }
};
