function random(min, max){
    if(isNumber(min) && isNumber(max))
        return Math.round( Math.random()*(max-min) + min); 
    else {
        console.log("Incorect parameters");
        return NaN;
    }
}
function minIntegerFromArray(array) {
    let min = Infinity;
    for(var x in array){
        if(!isNumber(array[x])){
            console.log("Array must only contain numbers");
            return 0;
        }
            
        if(array[x] < min)
            min = array[x];
    }  
    return min;
}
function isNumber(num){
    return (typeof num) === "number" ? true : false;
}
function minIntegerFromString(string) {
    var broj = "";
    var niz = [];
    for (let i = 0; i < string.length; i++) {
        const element = string[i];
        if(!isNaN(Number.parseInt(element)))
            broj+=element;
            
        else{
            if(broj==="") continue;
            niz.push(Number.parseInt(broj));
            broj="";
        }
    } 
    if(broj !== "") niz.push(Number.parseInt(broj)); //in case number is at the end of the string
    
    if(niz.length == 0) console.log("No whole numbers in this string");
    return minIntegerFromArray(niz);
}

function concatStringsByLength(arrayOfStrings, type) {
    var compare = type === 0 ? (a, b)=> a < b : (a, b)=> a > b;
   
    for (let i = 0; i < arrayOfStrings.length-1; i++) {
        let index = i;
        for (let j = i+1; j < arrayOfStrings.length; j++) {
            if(compare(arrayOfStrings[j].length,arrayOfStrings[index].length)){
                index = j;
            }
        }
        //swap
        let t = arrayOfStrings[i];
        arrayOfStrings[i] = arrayOfStrings[index];
        arrayOfStrings[index] = t;
        
    }
    return arrayOfStrings.join("");
}
module.exports = {
    random : random,
    minIntegerFromArray: minIntegerFromArray,
    minIntegerFromString: minIntegerFromString,
    concatStringsByLength: concatStringsByLength,
}