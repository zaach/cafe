
var indentChar = '    '; //4 spaces

function idt (lvl) {
    if (lvl < 0) lvl = 0;
    return Array(lvl+1).join(indentChar);
}

var codegens = exports.nodes = {
    'Empty': function Empty_codegen () {
        return '';
    },
    'EmptyStmt': function Empty_codegen () {
        return '';
    },
    'LiteralExpr': function LiteralExpr_codegen () {
        switch (this.type) {
            case 'null':
                return 'null';
            case 'string':
                return '"'+this.value+'"';
            default:
                return this.value.toString();
        }
    },
    'RegExpExpr': function RegExpExpr_codegen (lvl) {
        return "/"+this.body+"/"+this.flags;
    },
    'DataProp': function DataProp_codegen (lvl) {
        return '"'+this.name+'": '+this.children[0].toJS(lvl+1)
    },
    'GetterSetterProp': function GetterSetterProp_codegen (lvl) {
        return this.op+" "+this.name
            +' ('+ this.children[0].toJS() + ') '
            +'{\n'+idt(lvl)+genStmts(this.children.slice(1), lvl) +'\n'+idt(lvl-1)+'}';
    },
    'ObjectExpr': function ObjectExpr_codegen (lvl) {
        return this.children.length ? "{\n"+idt(lvl)+this.children.map(function(node){return node.toJS(lvl+1)}).join(',\n'+idt(lvl))+'\n'+idt(lvl-1)+'}':
            '{}';
    },
    'ThisExpr': function ThisExpr_codegen (lvl) {
        return 'this';
    },
    'ArrayExpr': function ObjectExpr_codegen (lvl) {
        return "["+this.children.map(function(node){return node.toJS(lvl+1)}).join(', ')
            +(this.children.length && this.children[this.children.length-1].nodeType === 'Empty' ? ',':'')
            +"]";
    },
    'IdExpr': function IdExpr_codegen (lvl) {
        return this.name;
    },
    'IdPatt': function IdPatt_codegen (lvl) {
        return this.name;
    },
    'MemberExpr': function MemberExpr_codegen (lvl) {
        return this.children[0].toJS(lvl+1) + 
                (this.brackets ?
                  '['+this.children[1].toJS(lvl+1)+']' :
                  '.'+this.children[1].value);
    },
    'NewExpr': function MemberExpr_codegen (lvl) {
        return 'new '+this.children[0].toJS(lvl+1) + 
                (this.children.length > 1 ?
                  '('+this.children.slice(1).map(function(node){return node.toJS(lvl+1)}).join(', ')+')' : '()');
    },
    'CallExpr': function CappExpr_codegen (lvl) {
        return this.children[0].toJS(lvl+1) + 
                (this.children.length > 1 ?
                  '('+this.children.slice(1).map(function(node){return node.toJS(lvl+1)}).join(', ')+')' : '()');
    },
    'InvokeExpr': function InvokeExpr_codegen (lvl) {
        return this.children[0].toJS(lvl+1) + 
                (this.brackets ?
                  '['+this.children[1].toJS(lvl+1)+']' :
                  '.'+this.children[1].value) +
                (this.children.length > 2 ?
                  '('+this.children.slice(2).map(function(node){return node.toJS(lvl+1)}).join(', ')+')' : '()');
    },
    'CountExpr': function CountExpr_codegen (lvl) {
        return this.isPrefix ?
            this.op + this.children[0].toJS(lvl+1) :
            this.children[0].toJS(lvl+1) + this.op;
    },
    'DeleteExpr': function DeleteExpr_codegen (lvl) {
        return 'delete '+this.children[0].toJS(lvl+1);
    },
    'VoidExpr': function VoidExpr_codegen (lvl) {
        return 'void '+this.children[0].toJS(lvl+1);
    },
    'TypeofExpr': function TypeofExpr_codegen (lvl) {
        return 'typeof '+this.children[0].toJS(lvl+1);
    },
    'UnaryPlusExpr': function UnaryPlusExpr_codegen (lvl) {
        return '+ '+this.children[0].toJS(lvl+1);
    },
    'NegateExpr': function NegateExpr_codegen (lvl) {
        return '- '+this.children[0].toJS(lvl+1);
    },
    'BitwiseNotExpr': function BitwiseNotExpr_codegen (lvl) {
        return '~'+this.children[0].toJS(lvl+1);
    },
    'LogicalNotExpr': function LogicalNotExpr_codegen (lvl) {
        return '!'+this.children[0].toJS(lvl+1);
    },
    'MultExpr': binaryExprCodegen,
    'DivExpr': binaryExprCodegen,
    'ModExpr': binaryExprCodegen,
    'AddExpr': binaryExprCodegen,
    'SubExpr': binaryExprCodegen,
    'LeftShiftExpr': binaryExprCodegen,
    'RightShiftExpr': binaryExprCodegen,
    'URightShiftExpr': binaryExprCodegen,
    'LessExpr': binaryExprCodegen,
    'GreaterExpr': binaryExprCodegen,
    'LessEqExpr': binaryExprCodegen,
    'GreaterEqExpr': binaryExprCodegen,
    'InstanceofExpr': binaryExprCodegen,
    'InExpr': binaryExprCodegen,
    'EqualExpr': binaryExprCodegen,
    'NotEqualExpr': binaryExprCodegen,
    'StrictEqualExpr': binaryExprCodegen,
    'StrictNotEqualExpr': binaryExprCodegen,
    'BitwiseXORExpr': binaryExprCodegen,
    'BitwiseORExpr': binaryExprCodegen,
    'BitwiseANDExpr': binaryExprCodegen,
    'LogicalORExpr': binaryExprCodegen,
    'LogicalANDExpr': binaryExprCodegen,
    'ConditionalExpr': function ConditionalExpr_codegen (lvl) {
        return this.children[0].toJS(lvl+1) + ' ? ' +
            this.children[1].toJS(lvl+1) +' : '+
            this.children[2].toJS(lvl+1);
    },
    'AssignExpr': function AssignExpr_codegen (lvl) {
        return this.children[0].toJS(lvl+1) +' '+ this.op +' '+
            this.children[1].toJS(lvl+1);
    },
    'BinaryExpr': function BinaryExpr_codegen (lvl) {
        return this.children[0].toJS(lvl+1) + this.op +' '+ this.children[1].toJS(lvl+1);
    },
    'BlockStmt': function BlockStmt_codegen (lvl) {
        return this.children.length ? "{\n"+idt(lvl)+genStmts(this.children, lvl)+"\n"+idt(lvl-1)+"}" :
        '{ }';
    },
    'VarDecl': function VarDecl_codegen (lvl) {
        return "var "+this.children.map(function(node){return node.toJS(lvl);}).join(',\n'+idt(lvl+1));
    },
    'ConstDecl': function ConstDecl_codegen (lvl) {
        return "const "+this.children.map(function(node){return node.toJS(lvl);}).join(',\n'+idt(lvl+1));
    },
    'InitPatt': function InitPatt_codegen (lvl) {
        return this.children[0].toJS(lvl) +' = '+
            this.children[1].toJS(lvl);
    },
    'IfStmt': function IfStmt_codegen (lvl) {
        return 'if (' + this.children[0].toJS(lvl+1) +') '+ this.children[1].blockgen(lvl+1)
            + (this.children[2].nodeType === 'EmptyStmt' ? '' :
            ' else '+this.children[2].blockgen(lvl));
    },
    'DoWhileStmt': function DoWhileStmt_codegen (lvl) {
        return 'do '+this.children[0].blockgen(lvl+1) + ' while (' + this.children[1].toJS(lvl+1) +')';
    },
    'WhileStmt': function WhileStmt_codegen (lvl) {
        return 'while (' + this.children[0].toJS(lvl+1) +') '+ this.children[1].blockgen(lvl+1);
    },
    'ForStmt': function ForStmt_codegen (lvl) {
        return 'for (' + this.children[0].toJS(lvl+1) +
            ';' + this.children[1].toJS(lvl+1) +
            ';' + this.children[2].toJS(lvl+1) +') '+ this.children[3].blockgen(lvl+1);
    },
    'ForInStmt': function ForStmt_codegen (lvl) {
        return 'for (' + this.children[0].toJS(lvl+1) +
            ' in ' + this.children[1].toJS(lvl+1) +') '+ this.children[2].blockgen(lvl+1);
    },
    'ContinueStmt': function ContinueStmt_codegen (lvl) {
        return 'continue' + (this.label ? ' '+this.label : '');
    },
    'BreakStmt': function BreakStmt_codegen (lvl) {
        return 'break' + (this.label ? ' '+this.label : '');
    },
    'ReturnStmt': function ReturnStmt_codegen (lvl) {
        return 'return' + (this.children.length ? ' '+this.children[0].toJS(lvl+1) : '');
    },
    'WithStmt': function WithStmt_codegen (lvl) {
        return 'with (' +this.children[0].toJS() + ') ' + this.children[1].blockgen(lvl);
    },
    'SwitchStmt': function SwitchStmt_codegen (lvl) {
        return 'switch ('+this.children[0].toJS()+') {\n'+idt(lvl)
            +this.children.slice(1).map(function(node){return node.toJS(lvl+1)}).join('\n'+idt(lvl))
            +'\n'+idt(lvl-1)+'}';
    },
    'Case': function Case_codegen (lvl) {
        return 'case ' +this.children[0].toJS()+':\n'+idt(lvl)+this.children.slice(1).map(function(node){return node.blockgen(lvl+1)}).join('\n'+idt(lvl));
    },
    'DefaultCase': function DefaultCase_codegen (lvl) {
        return 'default:\n'+idt(lvl) +this.children.map(function(node){return node.blockgen(lvl+1)}).join('\n'+idt(lvl));
    },
    'LabelledStmt': function LabelledStmt_codegen (lvl) {
        return 'labelled:\n'+idt(lvl) +this.children[0].blockgen(lvl+1);
    },
    'ThrowStmt': function ThrowStmt_codegen (lvl) {
        return 'throw ' + this.children[0].toJS(lvl+1);
    },
    'TryStmt': function TryStmt_codegen (lvl) {
        return 'try ' + this.children[0].toJS(lvl+1)
            +this.children[1].toJS(lvl+1)
            +(this.children.length === 3 ? 
                ' finally '+this.children[2].toJS(lvl+1) : '');
    },
    'CatchClause': function CatchClause_codegen (lvl) {
        return ' catch (' + this.children[0].toJS(lvl) +') '+this.children[1].toJS(lvl);
    },
    'DebuggerStmt': function DebuggerStmt_codegen (lvl) {
        return 'debugger';
    },
    'FunctionDecl': function FunctionDecl_codegen (lvl) {
        return 'function ' + this.children[0].toJS() +' ('
            +this.children[1].toJS(lvl+1) + ') '
            +'{\n'+idt(lvl)+genStmts(this.children.slice(2), lvl) +'\n'+idt(lvl-1)+'}';
    },
    'FunctionExpr': function FunctionExpr_codegen (lvl) {
        return 'function' + (this.children[0].nodeType === 'Empty' ? '' : ' '+this.children[0].toJS()) +' ('
            +this.children[1].toJS() + ') '
            +'{\n'+idt(lvl)+genStmts(this.children.slice(2), lvl) +'\n'+idt(lvl-1)+'}';
    },
    'ParamDecl': function ParamDecl_codegen (lvl) {
        return this.children.map(function(node){return node.toJS(lvl)}).join(', ');
    },
    'Program': function Program_codegen (lvl) {
        return this.children.map(function(node){return node.blockgen(lvl+1)}).join('\n')+'\n';
    }
};

function binaryExprCodegen (lvl) {
    return this.children[0].toJS(lvl+1) +' '+ this.op +' '+ this.children[1].toJS(lvl+1);
}

// convenience function for generating a list of statements
function genStmts (nodes, lvl) {
    return nodes.map(function(node){return node.blockgen(lvl)}).join('\n'+idt(lvl));
}

// convenience function for generating code as a statement (default is expr)
function blockgen () { return this.stmtWrap(this.toJS.apply(this, arguments)); }

// Most statements end with a semicolon
function defaultStmtWrap (source) { return source+';'; }

// But some (like while-loop, if-then, etc) do not
function idWrap (source) { return source; }

// Wrap epressions in parens if they were in original source
function curryParenWrap (fun) { return function (lvl) { return this.parens ? '('+fun.call(this, lvl)+')' : fun.call(this, lvl); }; }

// Overwrite defaultStmtWrap for specific nodes
var wraps = {
    // objects must be wrapped with parens to disambiguate from blocks
    'ObjectExpr': function (source) { return defaultStmtWrap(this.parens ? source : '('+source+')'); },
    'BlockStmt': idWrap,
    'WhileStmt': idWrap,
    'WithStmt': idWrap,
    'ForStmt': idWrap,
    'ForInStmt': idWrap,
    'IfStmt': idWrap,
    'SwitchStmt': idWrap,
    'LabelledStmt': idWrap,
    'TryStmt': idWrap,
    // func-expr must be wrapped with parens to disambiguate from func-decl
    'FunctionExpr': function (source) { return defaultStmtWrap(this.parens ? source : '('+source+')'); },
    'FunctionDecl': idWrap,
    'Program': idWrap
};


// Extend the node prototypes to include code generation functions
exports.extend = function extend (protos) {
    var type;
    protos.base.stmtWrap = defaultStmtWrap;
    protos.base.blockgen = blockgen;
    for (type in codegens) {
        protos[type].toJS = curryParenWrap(codegens[type]);
        if (type in wraps) protos[type].stmtWrap = wraps[type];
    }
};

