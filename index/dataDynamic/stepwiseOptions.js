export class StepWiseOptions {
  constructor(steps, stepSize) {
    this.steps = steps; // n
    this.stepSize = stepSize; // k
  }
  steps = 4;
  stepSize = 3; // i.e., can go 1 or 2 or 3  ... K ways

  arr = new Array(steps + 1).fill(-1);
  ways = ways(steps, stepSize, arr);

  //Recursive    --> n2 !!
  ways(n, k) {
    if (n == 0) {
      return 1;
    }
    if (n < 0) return 0;

    let ans = 0;
    for (let j = 1; j <= k; j++) ans += ways(n - j, k);
    return ans;
  }

  //Dynamic   w memo
  noOfWays(n, k, arr) {
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
      arr[n] = arr[n] + noOfWays(n - i, k, arr);
    }
    return arr[n];
  }
}
