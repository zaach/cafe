
var indentChar = '    '; //4 spaces

function idt (lvl) {
    return Array(lvl+1).join(indentChar);
}

var codegens = exports.nodes = {
    'CPImportStmt': function CPImport_codegen () {
        return 'objj_executeFile("'+this.name+'", '+(this.lib ? 'NO':'YES')+')';
    },
    'CPMessageSendExpr': function CPMessageSendExpr_codegen (lvl) {
        return 'objj_msgSend('+this.children[0].toJS(lvl+1) + ', "' +
                (this.children[1].nodeType == 'IdPatt' ? this.children[1].toJS() +'"' :
                  this.children.slice(1).map(function(node){return node.name}).join(':')+':", '+
                  this.children.slice(1).map(function(node){
                      return node.toJS(lvl);
                  }).join(', ')
                )+
                ')';
    },
    'CPSuperMessageSendExpr': function CPSuperMessageSendExpr_codegen (lvl) {
        return 'objj_msgSendSuper({ receiver:self, super_class:objj_getClass($objj_className).super_class }, "' +
                (this.children[0].nodeType == 'IdPatt' ? this.children[0].toJS() +'"' :
                  this.children.map(function(node){return node.name}).join(':')+':", '+
                  this.children.map(function(node){
                      return node.toJS(lvl+1);
                  }).join(', ')
                )+
                ')';
    },
    'CPKeyword': function CPKeyword_codegen (lvl) {
        return this.children[0].toJS();
    },
    'CPClassImplementationStmt': function CPClassImplementationStmt_codegen (lvl) {
        var cname = this.name;
        return '{var $objj_className = "'+this.name+'"'+
               ', the_class = objj_allocateClassPair('+
                  (this.children[0].nodeType == 'Empty' ?
                      'Nil' : this.children[0].toJS(lvl+1))+
                  ', $objj_className)'+
               ',\nmeta_class = the_class.isa;'+
               this.children[1].toJS(lvl)+ // instance vars
               'objj_registerClassPair(the_class);'+
               this.children.slice(2).map(function(node){return node.blockgen(lvl, cname)}).join('\n')+
               '\n}';
    },
    'CPInstanceVars': function CPInstanceVars_codegen (lvl) {
        return this.children.length ?
                ('class_addIvars(the_class, ['+
                this.children.map(function(node){return node.toJS(lvl+1)}).join(', ')+
                ']);') :
                '';
    },
    'CPInstanceVarDecl': function CPInstanceVarDecl (lvl) {
        return 'new objj_ivar("'+this.children[0].name+'")';
    },
    'CPClassMethodDecl': function CPClassMethodDecl_codegen (lvl, className) {
        var selectors = this.children[0].nodeType !== 'IdPatt';
        return 'class_addMethods(meta_class, [new objj_method(sel_getUid("'+
                this.children[0].toJS(lvl)+'"), '+ // selectors
                'function $'+className+'__'+
                (selectors ?
                  this.children[0].children.map(function(node){return node.children[0].name}).join('_')+'_(self, _cmd, '+
                    this.children[0].children.map(function(node){return node.children[1].name}).join(', ')+')' :
                  this.children[0].name+'(self, _cmd)'
                )+
                '\n{ with(self)\n{\n'+idt(lvl)+
                    this.children.slice(1).map(function(node){return node.blockgen(lvl+1)}).join('\n'+idt(lvl))+
                '\n}\n},["'+this.type+'"'+
                    (selectors ? (', "'+
                    this.children[0].children.map(function(node){return node.type}).join('", "')+'"') : '') +'])'+
                '])';
    },
    'CPInstanceMethodDecl': function CPInstanceMethodDecl_codegen (lvl, className) {
        var selectors = this.children[0].nodeType !== 'IdPatt';
        return 'class_addMethods(the_class, [new objj_method(sel_getUid("'+
                this.children[0].toJS(lvl+1)+'"), '+ // selectors
                'function $'+className+'__'+
                (selectors ?
                  this.children[0].children.map(function(node){return node.children[0].name}).join('_')+'_(self, _cmd, '+
                    this.children[0].children.map(function(node){return node.children[1].name}).join(', ')+')' :
                  this.children[0].name+'(self, _cmd)'
                )+
                '\n{ with(self)\n{\n'+idt(lvl)+
                    this.children.slice(1).map(function(node){return node.blockgen(lvl+1)}).join('\n'+idt(lvl))+
                '\n}\n},["'+this.type+'"'+
                    (selectors ? (', "'+
                    this.children[0].children.map(function(node){return node.type}).join('", "')+'"') : '') +'])'+
                '])';
    },
    'CPSelectorsDecl': function CPSelectorsDecl_codegen (lvl) {
        return this.children.map(function(node){return node.children[0].name}).join(':')+':';
    },
    'CPSelectorExpr': function CPSelectorExpr_codegen (lvl) {
        return 'sel_getUid("'+this.name+'")';
    }
};

// Wrap epressions in parens if they were in original source
function curryParenWrap (fun) { return function () { return this.parens ? '('+fun.apply(this, arguments)+')' : fun.apply(this, arguments); }; }

// But some (like while-loop, if-then, etc) do not
function idWrap (source) { return source; }

// Extend the node prototypes to include code generation functions
exports.extend = function extend (protos) {
    var type;
    for (type in codegens) {
        protos[type].toJS = curryParenWrap(codegens[type]);
    }
    protos['CPClassImplementationStmt'].stmtWrap = idWrap;
};
