const howSum = (targetSum, numbers, memo = {} ) => {
    if(targetSum===0) return [];
    if(targetSum < 0) return null;

    for (let num of numbers){
        const remainder = targetSum - num;
        const remainderResult = howSum(remainder, numbers, memo);
        if(remainderResult  !== null) {
           memo[targetSum] = [...remainderResult, num];
           return memo[targetSum];
        }
    }
    return memo[targetSum]
    return null;
}