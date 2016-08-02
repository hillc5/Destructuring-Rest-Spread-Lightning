function build(subject, verb, noun, ...adj) {
    let adjString = adj.length ? adj.join(', ') + ' ' : '';
    return `${subject} ${verb}ed the ${adjString}${noun}`;
}

console.log(build('Charlie', 'punch', 'clown', 'big', 'scary', 'dirty'));
console.log(build('Charlie', 'kick', 'spider', 'brown', 'ugly'));
console.log(build('Charlie', 'attack', 'cake'));


let obj = { a: 1, b: 2, c: 3 };

let { a: a, b: b, c: c } = obj;

console.log(a, b, c);

let { a: foo, b: bar, c: baz } = obj;
console.log(foo, bar, baz);

obj = { d: { e: 2 }, f: 3 };
let arr = [1, [ 2, 3 ], 4 ];

let { d, d: { e }, f } = obj;
console.log(d, e, f);

let [ first, [ second, third ], fourth ] = arr;

console.log(first, second, third, fourth);


function curryOld(fn) {
    let args = Array.prototype.slice.call(arguments, 1),
        { length }  = fn;

    return function() {
        var newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length === length) {
            return fn.apply(null, newArgs);
        }
        return curryOld.apply(null, [fn].concat(newArgs));
    }
}

function curryNew(fn, ...args) {
    let { length } = fn;

    return function(...nextArgs) {
        let newArgs = [ ...args, ...nextArgs ];
        if (newArgs.length === length) {
            return fn(...newArgs);
        }
        return curryNew(fn, ...newArgs);
    }
}

function add(x, y, z) {
    return x + y + z;
}

let addThreeTo = curryOld(add, 3);
let addFourTo = curryNew(add, 4);
let addEightTo = addFourTo(4);
let add13To = addThreeTo(10);

console.log(add13To(10));
console.log(addThreeTo(5)(5));
console.log(addFourTo(5, 5));
console.log(addEightTo(10));