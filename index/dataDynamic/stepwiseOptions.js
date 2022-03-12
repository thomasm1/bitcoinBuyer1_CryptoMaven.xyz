export class StepWiseOptions {
  constructor(steps, stepSize) {
    this.steps = steps; // n
    this.stepSize = stepSize; // k
  }
  steps = 4;
  stepSize = 3; // i.e., can go 1 or 2 or 3  ... K ways

  arr = new Array(this.steps + 1).fill(-1);
 
  //Recursive    --> n2 !!
  waysRecursive(n, k) {    
    if (n == 0) {
      return 1;
    }
    if (n < 0) {        
    return 0;
    }

    let ans = 0;
    for (let j = 1; j <= k; j++) {
        ans += ans + waysRecursive(n - j, k);
    }
    return ans;
  }

  //Dynamic   w memo
  waysRecMemoize(n, k, arr) {
    if (n == 0) {
      arr[n] = 1;
      return 1;
    }

     if (n < 0) {
      return 0;
    }

    if (arr[n] != -1) {
      return arr[n];
    }
    arr[n] = 0;

    for (let i = 1; i <= k; i++) {
      arr[n] = arr[n] + waysMemoize(n - i, k, arr);
    }
    return arr[n];
  }


  /////////////
// bottom up     ==>>>>>> Iterative 
  waysIterBottomUp(n,k) {
      var arr = new Array(n+1);
      arr[0] = 1;
      
      for (let i = 1; i <=n; i++) {
          arr[i] = 0;

          for (let j = 1;j<=k;j++) {
              if (i -j >=0 ) 
              arr[i] = arr[i] + arr[i-j];
          }
      }
      return arr[n];
  }
}
let s = new StepWiseOptions()
console.log(s.waysRecursive(10, 3))
