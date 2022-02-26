import  {SortingTools}   from "./SortingTools.js";
let tool = new SortingTools();
const adjacencyMatrix = tool.adjacencyMatrix;

dijkstra(adjacencyMatrix)

function dijkstra(Matrix){
    var v = Matrix.length;
    var visited = new Array(v);
    var distance = new Array(v).fill(Number.MAX_SAFE_INTEGER);

    //start 
    distance[0] = 0;

    for (let i=0;i < v-1; i++){                                  // 1 less not including start
        let minVertex = findMinVertex(distance, visited);
        visited[minVertex]  = true;

        for(let j=0; j<v ; j++){
            if(Matrix[minVertex][j] !=0 && !visited[j]){
                let newDist = distance[minVertex]+ Matrix[minVertex][j]

                if (newDist<distance[j]){
                    distance[j] = newDist;
                }
            }
        } 
    } 
    for(let i=0; i<v ;i++){
        console.log(i+""+distance[i])
    }
} 
function findMinVertex(distance, visited){
    let minVertex = -1;
    for (let i=0; i<distance.length; i++){
        if(!visited[i] && (minVertex == -1 || distance[i] < distance[minVertex] )){
            minVertex=i;
        }
    }
    return minVertex;
}