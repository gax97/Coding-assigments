data = require("./config.js")

const SIZEX = 10
const SIZEY = 10

const BLOCKED = 1
const FREE = 2

data.blocks = randomizeBlocks({start: {x: data.start[0], y:data.start[1]}, end: {x:data.end[0], y:data.end[1]}}, 20)
console.log("blocked cells", data.blocks)
const matrix = initializeMatrix(data.blocks)

initializeNeighbours(matrix)

const startNode = matrix[data.start[0]][data.start[1]];
const endNode = matrix[data.end[0]][data.end[1]];

let result = findShortestPath(startNode, endNode)
console.log(`Shortest path between (${startNode.x}, ${startNode.y}) and (${endNode.x}, ${endNode.y}) is`)
console.log(result)


function findShortestPath(startNode, endNode){
    var closedSet = new Set();
    var openSet = new Set();

    startNode.gscore = 0;
    startNode.fscore = heuristicCostFunction(startNode, endNode)
    openSet.add(startNode)
    while(openSet.size > 0){
        let current = lowestFScore(openSet)
        
        if(current.x == endNode.x && current.y==endNode.y){
            endNode.cameFrom = current.cameFrom
            break;
        }
        
        openSet.delete(current)
        closedSet.add(current)
        
        for(let i=0;i<current.neighbours.length;i++){
            let neighbour = current.neighbours[i]
            if(closedSet.has(neighbour))
                continue;
            tempG_score = current.gscore + 1
    
            if(!openSet.has(neighbour)){
                //change the score if it is better
                if(tempG_score < neighbour.gscore){
                    
                    neighbour.gscore = tempG_score
                    neighbour.fscore = neighbour.gscore + heuristicCostFunction(neighbour, endNode)
                       
                }
                neighbour.cameFrom = current
                openSet.add(neighbour)
            }
            
                
        }
        
    }
    //check if it found path
    let end = endNode.cameFrom

    let finalPath = []
    while(end){
        finalPath.unshift({x:end.x, y:end.y})
        end = end.cameFrom
    }
    return finalPath
}
function initializeMatrix(blocks){
    var matrix = new Array(SIZEX).fill().map(()=> new Array(SIZEY).fill())
    var i = 0, j =0;
     for(i=0;i<SIZEX;i++){
         for(j =0;j<SIZEY;j++){
            matrix[i][j] = new Node(i, j)
         }
     }
    
    blocks.forEach(element => {
        matrix[element[0]][element[1]].type = BLOCKED
    });
    return matrix;
}
function initializeNeighbours(matrix){
    var i = 0, j =0;
     for(i=0;i<SIZEX;i++){
         for(j =0;j<SIZEY;j++){
            if(matrix[i][j].type === BLOCKED)
                continue;
            if(i>0){
                if(matrix[i-1][j].type === FREE){
                    matrix[i][j].neighbours.push(matrix[i-1][j])
                }
            }
            if(i < SIZEX -1 ){
                if(matrix[i+1][j].type === FREE){
                    matrix[i][j].neighbours.push(matrix[i+1][j])
                }
            }
            if(j >  0 ){
                if(matrix[i][j-1].type === FREE){
                    matrix[i][j].neighbours.push(matrix[i][j-1])
                }
            }
            if(j < SIZEY -1 ){
                if(matrix[i][j+1].type === FREE){
                    matrix[i][j].neighbours.push(matrix[i][j+1])
                }
            }
         }
     }
}
function Node(x, y){
    this.x = x;
    this.y = y;
    this.type = FREE;
    this.gscore = Infinity;
    this.fscore = Infinity;
    this.neighbours = [];
}
//Manhattan distance
function heuristicCostFunction(start, end){
    return Math.abs(start.x - end.x) + Math.abs(start.y - end.y) 
}
function lowestFScore(set){
    var min  = {fscore:Infinity}
    set.forEach((el)=>{
        if(el.fscore < min.fscore)
            min = el  
    });
    return min;
}
function randomizeBlocks(position, numberOfBlocks){
    let start = position.start
    let end = position.end
    let blocks = []
    
    while(numberOfBlocks--){
        let array = []
        let num1 = Math.round(Math.random()*(SIZEX-1))
        let num2 = Math.round(Math.random()*(SIZEY-1))
        //can't initialize blocks on start and end nodes and can't have two same blocks
        if((num1 == start.x && num2 == start.y) || (num1 == end.x && num2 == end.y) || blocks.find((element)=> element[0]===num1 && element[1]===num2)){
            numberOfBlocks++
            continue
        }
        
        array.push(num1, num2)
        blocks.push(array)

        //run algorithm on test matrix
        let testMatrix = initializeMatrix(blocks)
        initializeNeighbours(testMatrix)
        if(!findShortestPath(testMatrix[start.x][start.y], testMatrix[end.x][end.y]).length)
            blocks.pop()
        
    }
    return blocks
}