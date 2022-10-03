// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require("./4-names");
const sayhi = require("./5-utils");
const data = require("./6-alternative_export");
require("./7-export_function_called");

console.log(data);
sayhi(names.jhon);
sayhi(names.rose);
sayhi("Troll");
