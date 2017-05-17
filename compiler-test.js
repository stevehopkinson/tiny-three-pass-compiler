var Compiler = require('./compiler.js');

// Note: the simulate(asm,args) function is pre-loaded.

var prog = '[ x y z ] ( 2*3*x + 5*y - 3*z ) / (1 + 3 + 2*2)';
var t1 = JSON.stringify({"op":"/","a":{"op":"-","a":{"op":"+","a":{"op":"*","a":{"op":"*","a":{"op":"imm","n":2},"b":{"op":"imm","n":3}},"b":{"op":"arg","n":0}},"b":{"op":"*","a":{"op":"imm","n":5},"b":{"op":"arg","n":1}}},"b":{"op":"*","a":{"op":"imm","n":3},"b":{"op":"arg","n":2}}},"b":{"op":"+","a":{"op":"+","a":{"op":"imm","n":1},"b":{"op":"imm","n":3}},"b":{"op":"*","a":{"op":"imm","n":2},"b":{"op":"imm","n":2}}}});
var t2 = JSON.stringify({"op":"/","a":{"op":"-","a":{"op":"+","a":{"op":"*","a":{"op":"imm","n":6},"b":{"op":"arg","n":0}},"b":{"op":"*","a":{"op":"imm","n":5},"b":{"op":"arg","n":1}}},"b":{"op":"*","a":{"op":"imm","n":3},"b":{"op":"arg","n":2}}},"b":{"op":"imm","n":8}});

var c = new Compiler();

var p1 = c.pass1(prog);
console.log(JSON.stringify(p1) === t1 ? 'Pass 1 output matches expected.' : 'Pass 1 output doesn\'t match.');