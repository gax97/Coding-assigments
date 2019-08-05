const functions = require("./function.js")
const data = require("./config.js")


//test random
console.log(functions.random(data.min, data.max))
//test minIntegerFromArray
console.log(functions.minIntegerFromArray(data.arrayOfInts))
console.log(functions.minIntegerFromArray(data.arrayOfBadInts))
//test minIntegerFromString
console.log(functions.minIntegerFromString(data.testString))
//test concatStringsByLength
console.log(functions.concatStringsByLength(data.arrayOfStrings, data.type))

