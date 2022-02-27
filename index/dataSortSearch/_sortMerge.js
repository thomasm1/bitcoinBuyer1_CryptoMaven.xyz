

export function merge(arr1, arr2) {
    let results = [];
    let i = 0;
    let j = 0;
    while(i < arr1.length && j < arr2.length){
        if(arr2[j] >  arr1[i]) {
            results.push(arr1[i]);
            i++;
        } else {  // ======== includes > & equality
            results.push(arr2[j]);
            j++;
        } 
    }  
        
    //     Any remainders from one or the other
    while( i < arr1.length ) {
        results.push(arr1[i]);
        i++;
    }
    while( j < arr2.length ) {
        results.push(arr2[j]);
        j++;
    }   
    
    return results;
}
//console for node.js; not included in export
// console.log("merge: ",merge([1,10,50],[2,14,99,100]));


export function mergeSort(arr){
    if(arr.length <= 1) {
        return arr;
    }
    let half = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0, half));
    let right = mergeSort(arr.slice(half));
    console.log(merge(left,right))
    return merge(left,right);
} 
console.log("mergeSort: ", mergeSort([10,1,24,9,76,73,72]));
