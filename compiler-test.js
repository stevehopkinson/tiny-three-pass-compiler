var Compiler = require('./compiler.js');


function simulate(asm, args) {
  var r0 = undefined;
  var r1 = undefined;
  var stack = [];
  asm.forEach(function (instruct) {
    var match = instruct.match(/(IM|AR)\s+(\d+)/) || [ 0, instruct, 0 ];
    var ins = match[1];
    var n = match[2] | 0;

    if (ins == 'IM')   { r0 = n; }
    else if (ins == 'AR') { r0 = args[n]; }
    else if (ins == 'SW') { var tmp = r0; r0 = r1; r1 = tmp; }
    else if (ins == 'PU') { stack.push(r0); }
    else if (ins == 'PO') { r0 = stack.pop(); }
    else if (ins == 'AD') { r0 += r1; }
    else if (ins == 'SU') { r0 -= r1; }
    else if (ins == 'MU') { r0 *= r1; }
    else if (ins == 'DI') { r0 /= r1; }
  });
  return r0;
}

var c = new Compiler();

var prog = '[ x y z ] x - y - z + 10 / 5 / 2 - 7 / 1 / 7';
p1 = c.pass1(prog);
p2 = c.pass2(p1);
p3 = c.pass3(p2);

console.log('Pass 3: ' + JSON.stringify(p3));
console.log('Result: ' + simulate(p3, [5, 4, 1]));