
function extend (base, ext, except) {
    for (var k in ext) {
      if (ext.hasOwnProperty(k) && (!except || !except[k])) {
        base[k] = ext[k];
      }
    }
}

var beget = (function () {
    var fn = function fn () {};
    return function bfn (base, ext) {
        fn.prototype = base;
        var obj = new fn();
        fn.prototype = null;
        extend(obj, ext);
        return obj;
    }
})();


exports.defineNodes = function (prototypes, constructors) {

var node = prototypes.base = {
    init: function node (props) {
        extend(this, props);
        this.children = [];
        var args = Array.prototype.slice.call(arguments, 1);
        if (args.length) this.appendList(args);
        return this;
    },
    append: function (item) {
        this.children.push(item);
        return this;
    },
    appendList: function (nodes) {
        if (!nodes.length) return this;
        var kids = this.children;
        nodes.forEach(function (item){
            if (item) kids.push(item);
        });
        return this;
    },
    clone: function (extend) {
        return beget(this, extend);
    },
    eldest: function (extend) {
        return this.children[0];
    },
    fire: function fire (evt) {
        var self = this;
        if (constructors[this.nodeType].handlers['parse'])
          constructors[this.nodeType].handlers['parse'].map(function (fn) { fn.call(self); });
    },
    toJsonML: function toJsonML () {
        var json = [this.nodeType, {}];
        extend(json[1], this, {nodeType:1,children:1});
        var kids = this.children.map(function (kid) { return kid.toJsonML(); });
        return json.concat(kids);
    }
};

var expr = prototypes.expr = node.clone();
var stmt = prototypes.stmt = node.clone();

var binaryExpr = prototypes.binaryExpr = expr.clone({
    toJsonML: function toJSON () {
        var json = ['BinaryExpr', {op: this.op},
                      this.children[0].toJsonML(),
                      this.children[1].toJsonML()];
        return json;
    }
});

var unaryExpr = prototypes.unaryExpr = expr.clone({
    toJsonML: function toJSON () {
        var json = ['UnaryExpr', {op: this.op},
                      this.children[0].toJsonML()];
        return json;
    }
});


var def = function def(proto, name, extend, construct) {
    prototypes[name] = proto.clone(extend);
    prototypes[name].nodeType = name;

    constructors[name] = construct || function () {
        this.init.apply(this, arguments);
        this.nodeType = name; // do this for tests
        this.fire('parse');
        return this;
    };
    constructors[name].prototype = prototypes[name];
    var handlers = constructors[name].handlers = {};
    constructors[name].on = function on (evt, fn) {
        if (!handlers[evt]) handlers[evt] = [];
        handlers[evt].push(fn);
    };
    constructors[name].off = function off (evt, fn) {
        if (!evt) handlers = {};
        else if (!fn && handlers[evt]) handlers[evt] = [];
        //handlers[evt].push(fn);
    };
}

/* Nodes
*/

// Program node
def(node,'Program', { });

// Identifier node
def(node,'IdPatt', { }, function (name) {
    this.init({name:name});
    this.fire('parse');
    this.nodeType = 'IdPatt';
    return this;
});

// Literal expression node
def(expr,'LiteralExpr', { });

// "this" expression node
def(expr,'ThisExpr', { });

// Regexp Literal expression node
def(expr,'RegExpExpr', { });

// Var statement node
def(stmt,'VarDecl', { });

// Const statement node
def(stmt,'ConstDecl', { });

// Init pattern node
def(expr,'InitPatt', { });

// Identifier expression node
def(expr,'IdExpr', { });

// Assignment expression node
def(expr,'AssignExpr', { });

def(expr,'ArrayExpr', { });

def(expr,'ObjectExpr', { });

def(node,'DataProp', { });

def(node,'GetterSetterProp', { });

// Function declaration node
def(stmt,'FunctionDecl', { });

// Function expression node
def(expr,'FunctionExpr', prototypes.FunctionDecl);

// Param declaration node
def(node,'ParamDecl', { });

// return statement node
def(stmt,'ReturnStmt', { });

def(stmt,'TryStmt', { });

def(stmt,'BlockStmt', { });

def(node,'CatchClause', { });

def(stmt,'ThrowStmt', { });

def(stmt,'LabelledStmt', { });

def(stmt,'BreakStmt', { });

def(stmt,'ContinueStmt', { });

def(stmt,'SwitchStmt', { });

def(node,'Case', { });
def(node,'DefaultCase', { });

def(stmt,'WithStmt', { });

// operators
def(expr,'ConditionalExpr', { });

def(unaryExpr,'UnaryExpr', { });

def(binaryExpr,'BinaryExpr', { });

def(binaryExpr,'LogicalORExpr', {op: '||'});
def(binaryExpr,'LogicalANDExpr', {op: '&&'});

def(binaryExpr,'BitwiseORExpr', {op: '|'});
def(binaryExpr,'BitwiseANDExpr', {op: '&'});
def(binaryExpr,'BitwiseXORExpr', {op: '^'});

def(binaryExpr,'EqualExpr', {op: '=='});
def(binaryExpr,'NotEqualExpr', {op: '!='});
def(binaryExpr,'StrictEqualExpr', {op: '==='});
def(binaryExpr,'StrictNotEqualExpr', {op: '!=='});

def(binaryExpr,'InExpr', {op: 'in'});
def(binaryExpr,'InstanceofExpr', {op: 'instanceof'});
def(binaryExpr,'GreaterEqExpr', {op: '>='});
def(binaryExpr,'LessEqExpr', {op: '<='});
def(binaryExpr,'GreaterExpr', {op: '>'});
def(binaryExpr,'LessExpr', {op: '<'});
def(binaryExpr,'URightShiftExpr', {op: '>>>'});
def(binaryExpr,'RightShiftExpr', {op: '>>'});
def(binaryExpr,'LeftShiftExpr', {op: '<<'});
def(binaryExpr,'AddExpr', {op: '+'});
def(binaryExpr,'SubExpr', {op: '-'});
def(binaryExpr,'ModExpr', {op: '%'});
def(binaryExpr,'DivExpr', {op: '/'});
def(binaryExpr,'MultExpr', {op: '*'});

def(unaryExpr,'VoidExpr', {op: 'void'});
def(unaryExpr,'LogicalNotExpr', {op: '!'});
def(unaryExpr,'BitwiseNotExpr', {op: '~'});
def(unaryExpr,'NegateExpr', {op: '-'});
def(unaryExpr,'UnaryPlusExpr', {op: '+'});
def(unaryExpr,'DeleteExpr', {op: 'delete'});
def(unaryExpr,'TypeofExpr', {op: 'typeof'});

def(expr,'CountExpr', { });

def(expr,'CallExpr', { });

def(expr,'NewExpr', { });

def(expr,'MemberExpr', { });

def(expr,'InvokeExpr', { });

// debugger node
def(stmt,'DebuggerStmt', { });

// empty node
def(node,'Empty', { });

def(stmt,'EmptyStmt', { });

// control structs

def(stmt,'WhileStmt', { });

def(stmt,'DoWhileStmt', { });

def(stmt,'ForStmt', { });

def(stmt,'ForInStmt', { });

def(stmt,'IfStmt', { });

return def;
}

