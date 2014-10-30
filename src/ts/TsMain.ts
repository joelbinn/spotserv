/// < reference path="./spotserv.d.ts" />
/// < reference path="./lodash/lodash.d.ts" />
import hello = require('spotserv/test/hello');
import _ = require('lodash');

hello.greet('Bulle');

var list:_.LoDashArrayWrapper<number> = _([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(list.filter((e)=>e % 2 == 0).value());
