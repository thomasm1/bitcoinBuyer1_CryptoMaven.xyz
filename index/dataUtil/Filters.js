
// class rFilters   methods: 

// export class NumFilters {
//   //   fibonacci(num); fibonacciMemo(num) fizBuzz(num);  
// class ArrayFilters methods:
//  hashMapper(array, target)

// class ObjectFilters methods:
//


export class NumFilters {
    constructor(){
        console.log("Iteration SundryFilters init"); 
    }

    factorial(num) {
        if (num < 2) return 1;
        
        return this.factorial(num-1 * n);
    }

    fibonacci(num) { 
            if (num <=0) {return 0};
            if (num ==1) {return 1};
            return this.fibonacci(num-2)+this.fibonacci(num-1);
 
    }
    fibonacciMemo(num, memo ={}){
        if (num in memo) {return memo[num]}
        if (num <=0) {return 0};
        if (num ==1) {return 1};

        memo[num] = this.fibonacciMemo(num-1,memo)+ this.fibonacciMemo(num-2,memo);
        return memo[num]
    }
    // fibonacciIteration(num) { 
    // }


    fizzBuzz(num) { 
 
        for (let i=1;i<=num;i++){

            if ((i % 3)===0) {console.log("fizz")};
            if ((i % 5)===0) {console.log("buzz");}
            console.log(i);
        }
    }

    findPrimes(num){
        let primes = [];
        for (let i=0;i<=num;i++){
            primes[i] = true;
        }
        primes[0] = false;
        primes[1] = false;
        for (let i = 2;i<=Math.sqrt(num);i++){
            for (let j = 2;i*j<=num;j++){
                primes[i*j] = false;                
            }
        }
        let resultArr = []; 
        for (let i=0;i<primes.length;i++){
            if (primes[i]===true){  resultArr.push(i)         }
        }
        return resultArr;
    }
}
 
const numFilters = new NumFilters();
const testInt = 40      //
console.log("findPrimes: "+ numFilters.findPrimes(testInt));
// console.log(numFilters.fibonacci(testInt ));
console.log("fibonacciMemo: "+numFilters.fibonacciMemo(testInt )); 
// console.log(numFilters.iterFibonacci(testInt ));
numFilters.fizzBuzz(testInt);


////// ////// ////// ////// ////// ////// ////// ////// ////// ////// ////// ////// 
// class ArrayFilters methods:
//
export class ArrayFilters {
    constructor(){
        console.log("ArrayFilters init"); 
    }
  inPlaceReverse(arr) {
        for (let i =0;i<arr.length/2;i++) {
            let temp = arr[i];
            arr[i] = arr[arr.length-1-i]; //swap first & last
            arr[arr.length - 1 - i] = temp;
        }
        return arr;
    } 
    
 hashArrayMapper(intArray, targetSum){
    let pairs =[];
    let hashArrayTable = [];

    for(let i = 0; i<intArray.length; i++){
        let current = intArray[i];
        let targetPart = targetSum - current;   // Calculations to get to target here
        
        if (hashArrayTable.indexOf(targetPart) !== -1){  // if not empty
            pairs.push([current, targetPart]);
        }
        hashArrayTable.push(current);
    }
    return pairs;
}
}

let arrayFilters = new ArrayFilters(); 
const orderedArray = [1,2,3,4,5]
console.log(arrayFilters.inPlaceReverse(orderedArray)) 

console.log(arrayFilters.hashArrayMapper([1,5,3,2,2],7));

// class ObjectFilters methods:
//