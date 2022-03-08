
// class IterFilters   methods: 
//   fibonacci(num); fizBuzz(num);  
// export class NumFilters {
//     constructor(){ 
// class ArrayFilters methods:
//

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
}
const numFilters = new NumFilters();
const testInt = 40      //
console.log(numFilters.fibonacci(testInt ));
console.log(numFilters.fibonacciMemo(testInt )); 
// console.log(numFilters.iterFibonacci(testInt ));
console.log(numFilters.fizzBuzz(testInt ));



// class ArrayFilters methods:
//

// class ObjectFilters methods:
//