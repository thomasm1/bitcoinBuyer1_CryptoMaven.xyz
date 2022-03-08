// A few classes based on grid travel:
//    travel(x, y, memo = {}) {
export class Grids {
  constructor() {
    console.log("Grids Init");
    this.visitedGlobal = new Set();
  }

  travelMemo(x, y, memo = {}) {
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
////////////////////////////////////////////////////////////////////////////////

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
console.log(grids.travelMemo(10, 5));

const grid30 = [  
    ["w", "l", "w", "w", "w"],     
    ["w", "l", "w", "w", "w"],    
    ["w", "w", "w", "l", "w"],
    ["w", "w", "l", "l", "w"],
    ["l", "w", "w", "l", "l"],
    ["l", "l", "w", "w", "w"],
];
console.log(grids.islandCount(grid30));
