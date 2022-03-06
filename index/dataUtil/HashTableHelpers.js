export default class {
    
        // O(N)
       export function hash(key, arrayLen) {
            let total = 0;  
            for (let char of key){  
              let value = char.charCodeAt(0) - 96;
              total = (total + value) % arrayLen;
            }
            return total;
          }
        
        
        
         // O(1)
         export  function hashPrime(key, arrayLen) {
            let total = 0;
            let PRIME = 31;
            for(let i = 0; i < Math.min(key.length, 100); i++){  
              let value = char.charCodeAt(0) - 96;
              total = (total + PRIME + value) % arrayLen;
            }
            return total;
          }
        // separate chaining => 
                // Can store more keys than size of array....
                // Separate Chaining	Very Easy to implement	
                // Memory Inefficient – requires a secondary data structure to store collisions Long Chains will produce Linear search times

}