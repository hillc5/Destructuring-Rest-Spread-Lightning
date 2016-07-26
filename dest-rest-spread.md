## Rest and Spread Operators, Destructuring, Default Parameters

* ES6 in Depth (blog posts): 
  * https://hacks.mozilla.org/category/es6-in-depth/
* Exploring ES6 (book): 
  * http://exploringjs.com/es6/


---


## Destructuring

* A convenient way of extracting values from data stored in objects or arrays

consider:

```javascript
let a = [1, 2, 3];
    
let first = a[0];
let second = a[1];
let third = a[2];
```

destructuring allows us to do:

```javascript
let a = [1, 2, 3];

let [ first, second, third ] = a;
```


---


## Rest Operator

All Javascript functions are variadic in nature
  * They can take any number of parameters and the call is still valid
  * Both more or less parameters than are defined in the function signature
 

----


In ES5, in order to handle extra arguments:
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


----


* If no extra arguments are passed `...adj` defaults to an empty array
* Will wrap up a comma delimited list of params or an extra array of parameters

---


## Default Parameters

How default values were handled in ES5 using an options pattern

```javascript
/*
* Takes options { start, end, iterations }
*
*/
function doStuffToAnArray(arr, options) {
    var options = {},
        start = options.start || 0,
        end = options.end || arr && arr.length || 0,
        iterations = options.iterations || 1;
        
    // Do stuff to arr now
}

```