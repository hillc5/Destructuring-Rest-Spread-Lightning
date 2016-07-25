## Default Parameters, Rest and Spread Operators, Destructuring

* ES6 in Depth: 
  * https://hacks.mozilla.org/category/es6-in-depth/
* Exploring ES6 (book): 
  * http://exploringjs.com/es6/


----


## Default Parameters

How default values were handled in ES5 using an options pattern

```javascript
/*
* Takes options { start, end, iterations }
*
*/
function doStuffToAnArray(arr, options) {
    var start = options.start || 0,
        end = options.end || arr && arr.length || -1,
        iterations = options.iterations || 1;
        
    // Do stuff to arr now
}

```