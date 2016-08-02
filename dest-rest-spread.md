## Destructuring, Rest and Spread Operators, Default Parameters

* ES6 in Depth (blog posts): 
  * https://hacks.mozilla.org/category/es6-in-depth/
* Exploring ES6 (book): 
  * http://exploringjs.com/es6/


---


## Destructuring

consider:
```javascript
let arr = [ 1, 2, 3 ];
    
let first = arr[0];
let second = arr[1];
let third = arr[2];

console.log(first, second, third) // 1 2 3
```

or:
```javascript
let obj = { a: 1, b: 2, c: 3 };

let a = obj.a,
    b = obj.b,
    c = obj.c;

console.log(a, b, c) // 1 2 3  
```


----


`Destructuring` gives us a convenient way of extracting values form data stored in arrays and objects
* The syntax for doing so mimics the way that we can construct array and object literals:

```javascript
let obj = { a: 1, b: 2, c: 3},
    arr = [ 1, 2, 3 ];
    
let [ first, second, third ] = arr,
    { a: a, b: b, c: c } = obj;

console.log(first, second, third); // 1 2 3
console.log(a, b, c); // 1 2 3
```


----


With object destructuring we have two ways of extracting the values

explicitly:
```javascript
let obj = { a: 1, b: 2, c: 3 };

// explicitly naming variables the same 
// as obj's properties
let { a: a, b: b, c: c } = obj
console.log(a, b, c); // 1 2 3

// aliasing the property names
let { a: foo, b: bar, c: baz } = obj;
console.log(foo, bar, baz); // 1 2 3
```

implicitly:
```javascript
let obj = { a: 1, b: 2, c: 3 };

let { a, b, c } = obj;
console.log(a, b, c); // 1 2 3
```


----


We can also extract nested values:
```javascript
let arr = [ 1, [ 2, 3 ], 4 ],
    obj = { a: { b: 2 }, c: 3 };
    
let [ first, [ second, third ], fourth ] = arr,
    { a, a: { b }, c } = obj;
    
console.log(first, second, third, fourth); // 1 2 3 4
console.log(a, b, c); // { b: 2 } 2 3
```



----


We can skip over extracting values for each type of extraction

objects: 
```javascript
let { x, z } = { x: 1, y: 2, z: 3}
console.log(x, z); // 1 3
```
arrays:
```javascript
let [ first, , third ] = [ 'a', 'b', 'c' ];
console.log(first, third); // 'a' 'c'

```


----


We can assign to object properties as well:
```javascript
let obj1 = {},
    obj2 = { a: 'a', b: 'b' },
    arr = [ 1, 2, 3 ];

({ a: obj1.a } = obj2);
[ obj1.b ] = arr;

console.log(obj1); // { a: 'a', b: 1 }
```



----


## How it works
* Object destructuring coerces the destructuring source to an object, thus:

```javascript
let { length } = 'string';
console.log(length); // 6
```
and 
```javascript
let { filter: f } = [];
console.log(f); // Array.prototype.filter
f.call([1, 2, 3], num => num % 2 === 0); // returns [ 2 ];
```

are both valid use cases of object destructuring


----


* Array destructuring works with any iterable, thus:

```javascript
let [ first, second ] = 'charlie';
console.log(first, second); // c h

```
and 
```javascript
let [ a, b ] = new Set([ 1, 2, 3, 4 ]);
console.log(a, b); // 1 2
```
and even
```javascript
function* integers() {
    let result = 1;
    while(true) {
        yield result;
        result++;
    }
}

let [ first, second, third ] = integers();
console.log(first, second, third); // 1 2 3

```
are all valid uses of array destructuring.

---


## Rest Operator

All Javascript functions are variadic in nature
  * They can take any number of parameters and the call is still valid
  * Both more or less parameters than are defined in the function signature
 

----


Prior to `ES6`, in order to handle extra arguments:
* Grab the `arguments` object
* Often copy it's contents into an array

```javascript
function build(subject, verb, noun) {
  let adj = Array.prototype.slice.call(arguments, 3);
    
  return `${subject} ${verb}ed the ${adj.join(', ')} ${noun}`;
}

let sentence = build('Charlie', 'punch', 'clown', 'big', 'scary');
console.log(sentence) // Charlie punched the big, scary clown
```


----

In ES6, we can use the rest operator:

```javascript
function build(subject, verb, noun, ...adj) {
  return `${subject} ${verb}ed the ${adj.join(', ') + ' '}${noun}`;
}

let sentence = build('Charlie', 'punch', 'clown', 'big', 'scary');
console.log(sentence) // Charlie punched the big, scary clown
```

* And hopefully never rely on the `arguments` object again
* `NOTE` If no extra arguments are passed `...adj` defaults to an empty array


----


Consider a currying function:
```javascript
function curry(fn) {
    let args = Array.prototype.slice.call(arguments, 1),
        { length }  = fn;

    return function() {
        var newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length === length) {
            return fn.apply(null, newArgs);
        }

        return curry.apply(null, [fn].concat(newArgs));
    }
}
```


----


With the rest parameter we can do away with handling the arguments object
```javascript
function curry(fn, ...args) {
    let { length } = fn;

    return function(...nextArgs) {
        let newArgs = args.concat(nextArgs);
        if (newArgs.length === length) {
            return fn.apply(this, newArgs);
        }
        return curry.apply(this, [fn].concat(newArgs));
    }
}
```


----


And we can use rest parameters with array destructuring!!!
```javascript
 let [ first, ...rest ] = [ 'a', 'b', 'c', 'd', 'e' ],
     obj = {};
     
 [ obj.first, obj.second, ...obj.rest ] = [ 1, 2, 3, 4, 5 ]
 
 console.log(first, rest); // a [ 'b', 'c', 'd', 'e' ]
 console.log(obj); // { first: 1, second: 2, rest: [ 3, 4, 5 ] }
```



---


## Spread Operator

* Has the same `...` syntax as the rest operator.
* Turns the items in an iterable value into argument for function calls
or into array elements


----


We used to have to use `function.prototype.apply` to
use an array as the arguments to a function call:
```javascript
function add(x, y) {
    return x + y;
}

add.apply(null, [1, 2]);
```
now we can use the spread operator:

```javascript
function add(x, y) {
    return x + y;
}
add(...[1, 3]);
```


----


Now rather than being stuck with just concatenating arrays:
```javascript
let arr1 = [ 1, 3, 'green' ],
    arr2 = [ 'blue', 4],
    arr3 = arr1.concat(arr2);

console.log(arr3) // [ 1, 3, 'green', 'blue', 4 ]

```
We can spread an array element at any place in another array:
```javascript
let arr1 = [ 1, 3, 'green' ],
    arr2 = [ 'blue', 4 ],
    arr3 = [ 42, ...arr1, 13 ...arr2 ];
    
console.log(arr3); // [ 42, 1, 3, 'green', 13, 'blue', 4 ]

```



----



This works for any `iterable` object:

```javascript
let arr = [ 1, 2, 3 ],
    s = new Set([ 'blue', 'green' ]),
    arr2 = [...arr, ...s];
    
console.log(arr2); // [ 1, 2, 3, 'blue', 'green' ]

```


----


Back to the curry function:
```javascript
function curry(fn, ...args) {
    let { length } = fn;

    return function(...nextArgs) {
        let newArgs = [ ...args, ...nextArgs ];
        if (newArgs.length === length) {
            return fn(...newArgs);
        }
        return curry(fn, ...newArgs);
    }
}
```


---


## Default Parameters

How default values were handled before ES6:
```javascript
 function doStuffToAnArray(arr, start, end) {
    var arr = arr || [],
        start = start || 0,
        end = end || arr && arr.length || -1;
        
    // do stuff to the array
 }
```
 
And using an options pattern:
```javascript
/*
* Takes options { start, end }
*/
function doStuffToAnArray(arr, options) {
    var options = {},
        start = options.start || 0,
        end = options.end || arr && arr.length || -1;
        
    // do stuff to the array
}
```


----


Now we can set defaults inline in the function signature:
```javascript
function doStuffToAnArray(arr = [], start = 0, end = -1) {

    // do stuff to the array
}
```
And with destructuring!!
```javascript
let { a = 0, b = 1, c = 2 } = { a: 1, c: 3 },
    [ first = 0, second = 1, third = 2 ] = [ 1, 2 ];
    
console.log(a, b, c); // 1 1 3
console.log(first, second, third); // 1 2 2
```


----


Rest parameters are set left to right, so we can reference other rest values:
```javascript
function doStuffToAnArray(arr = [], start = 0, end = arr.length) {
    // do stuff to the array
}
```
We can also reference any values that the function has closure over:
```javascript
let default = 0;
function doStuffToAnArray(arr = [], start = 0, end = default) {
    // do stuff to the array
}
```