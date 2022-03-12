// A few classes based on grid travel:
 
//    travel(x, y, memo = {}) {
export class Grids {
  constructor() {
    console.log("Grids Init");
    this.visitedGlobal = new Set();
  }

 depthFirstRecursion = (graph, src, print=false) =>{
     let localPrint = print;                    // <== Recursion print
     if (localPrint===true){console.log(src)}; 
     for(let neighbor of graph[src]) {
         this.depthFirstRecursion(graph, neighbor,localPrint);
     }
 }

 depthFirstIteration = (graph,src,print=false) =>{
     const stack = [src];
     while (stack.length>0){
         const current = stack.pop();
         if (print === true) {console.log(current)}

         for (let neighbor of graph[current]) {
            stack.push(neighbor);
         }
     }
 } 

 breadthFirst = (graph, src, print=false) =>{   // pass in 3rd param as boolean true to print
     const queue = [src];
     while (queue.length>0) {
         const current = queue.shift(); 
         if (print === true) {console.log(current)}

         for (let neighbor of graph[current]) {  // cycle through values of obj (@ graph.current)
             queue.push(neighbor);
         }
     }
 }

////////////////////////////////////
// traveling from top coords to 1,1
////////////////////////////////////////////

  travelMemo(x, y, memo = {}) { /// passing these as function objects rather than methods
    const key = `${x},${y}`;

    if (key in memo) {
      return memo[key];
    }
    if (x == 0 || y == 0) {
      return 0;
    }
    if (x == 1 && y == 1) {
      return 1;
    } 
    memo[key] = this.travelMemo(x - 1, y, memo) + this.travelMemo(x, y - 1, memo);
    return memo[key];
  }

  
////////////////////////////////////
// UndirectedPath Graph
////////////////////////////////////////////
undirectedPath = (edges, nodeA, nodeB) => {       /// retrns boolean if node coords are among node edges list
    const graph = this.buildGraph(edges);
    return this.hasPath(graph, nodeA, nodeB, new Set());
};

hasPath = (graph, src, dest, visited) => {  /// put this to GridHelpers
    if (src === dest) return true;
    if (visited.has(src)) return false;
    visited.add(src);

    for (let neighbor of graph[src]) {    /// checking object values
        if (this.hasPath(graph, neighbor, dest, visited) ===true) {
            return true;
        }
    }
    return false;
};

buildGraph = (edges) =>{                     /// put this to GridHelpers
    const graph = {};                      /// make edge list into Adjacency List Object

    for (let edge of edges) {
        const [a,b] = edge;
        if (!(a in graph)) graph[a] = [];
        if (!(b in graph)) graph[b] = [];
        graph[a].push(b);
        graph[b].push(a); 
    }
    return graph;         
}


////////////////////////////////////
// counting connections in grid
////////////////////////////////////////////

  explore = (grid, x, y, visited) =>{ 
    // Base Cases
    const xInBounds = 0 <= x && x < grid.length;
    const yInBounds = 0 <= y && y < grid.length;
    if (!xInBounds || !yInBounds) {return false};

    if (grid[x][y] === 'w') {return false}; // no progress

    const coord = `${x},${y}`;
    if (visited.has(coord)) {return false};  // already been here
    visited.add(coord);
    
    //Go
    this.explore(grid, x-1, y, visited); // gonna go out of bounds first
    this.explore(grid, x+1, y, visited);
    this.explore(grid, x, y-1, visited);
    this.explore(grid, x, y+1, visited);

    return true;                            // true, just explored onward
  }

  islandCount = (grid) => {
      const visited = new Set(); 
      let count = 0;
    
    for (let x = 0; x < grid.length; x += 1) {
      for (let y = 0; y < grid[0].length; y += 1) {
        if (this.explore(grid, x, y, visited)=== true){
            count +=1
        }
      }
    }
    return count;
  };

}


//// CONSOLES
const grids = new Grids();
console.log(grids.travelMemo(18, 18));

const grid30 = [  
    ["w", "l", "w", "w", "w"],     
    ["w", "l", "w", "w", "w"],    
    ["w", "w", "w", "l", "w"],
    ["w", "w", "l", "l", "w"],
    ["l", "w", "w", "l", "l"],
    ["l", "l", "w", "w", "w"],
];
console.log(grids.islandCount(grid30));

const xEdges = [[0,1],[1,0],[1,2],[2,1],[0,2],[2,0]]
const x1 = 2;
const x2 = 1
const x3 = 4
console.log("True: "+grids.undirectedPath(xEdges,x1,x2));
console.log("false: "+grids.undirectedPath(xEdges,x1,x3));


const graph = {
    a:['c','b'],
    b:['d'],
    c:['e'],
    d:['f'],
    e:[],
    f:[]
};
grids.breadthFirst(graph, 'a', true);  //acbedf
console.log("breadthFirst_^^acbedf") 
grids.breadthFirst(graph, 'a', false); // does not print  
console.log("^^nothing")


grids.depthFirstIteration(graph, 'a', true);  //abdfce
console.log("depthFirstIteration_^^abdfce") 
grids.depthFirstIteration(graph, 'a', false); // does not print  
console.log("^^nothing")

grids.depthFirstRecursion(graph, 'a', true) // acebdf
console.log("depthFirstRecursion_^^acebdf")
// Test happyPath
// Grids Init
// 2333606220
// 3