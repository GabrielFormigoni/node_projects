const _ = require("lodash");

let items = [1, [2, [3, [4, [5]]]]];

let newItems = _.flattenDeep(items);

console.log(newItems);
console.log("Hello people!!!");
