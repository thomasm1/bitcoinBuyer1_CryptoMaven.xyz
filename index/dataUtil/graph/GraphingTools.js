

export class GraphingTools {

    constructor(adjacencyMatrix, array1d,array2d, array3d, dataObject) {

        this.dataObj = dataObject || {};
        this.array1d = array1d || [0,3,5,6,0,8,0];
        this.array2d = array2d || [
                                    [0, 3, 5, 6, 0, 8, 0],
                                    [3, 0, 0, 4, 2, 0, 5],
                                    [5, 0, 0, 0, 0, 4, 0],
                                    [6, 4, 0, 0, 0, 1, 6],
                                    [0, 2, 0, 0, 0, 0, 10],
                                    [8, 0, 6, 1, 0, 0, 8],
                                    [0, 8, 0, 6, 10, 8, 0]
                                ];


        this.array3d = array3d || [
            [
                [0, 3, 5, 6, 0, 8, 0],
                [3, 0, 0, 4, 2, 0, 5],
                [5, 0, 0, 0, 0, 4, 0],
                [6, 4, 0, 0, 0, 1, 6],
                [0, 2, 0, 0, 0, 0, 10],
                [8, 0, 6, 1, 0, 0, 8],
                [0, 8, 0, 6, 10, 8, 0]
                                    ],[
                                        [0, 3, 5, 6, 0, 8, 0],
                                        [3, 0, 0, 4, 2, 0, 5],
                                        [5, 0, 0, 0, 0, 4, 0],
                                        [6, 4, 0, 0, 0, 1, 6],
                                        [0, 2, 0, 0, 0, 0, 10],
                                        [8, 0, 6, 1, 0, 0, 8],
                                        [0, 8, 0, 6, 10, 8, 0]
                                    ]
        ]
                                        
        this.adjacencyMatrix = adjacencyMatrix  || this.array2d 
    } 
}
const graphingTools = new GraphingTools();

console.log(graphingTools)
console.log(graphingTools.dataArray)
console.log(graphingTools)