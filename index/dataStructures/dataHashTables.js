
        // O(N)
        function hash(key, arrayLen) {
            let total = 0;  
            for (let char of key){  
              let value = char.charCodeAt(0) - 96;
              total = (total + value) % arrayLen;
            }
            return total;
          }
        
        
        
         // O(1)
         function hashPrime(key, arrayLen) {
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
        class HashSeparateChaining {
            constructor(size = 53) {
                this.keyMap = new Array(size);
            }
            _hash(key) {
                let total = 0;
                let PRIME = 31; 
                for (let i = 0; i < Math.min(key.length, 100);i++){
                    let char = key[i];
                    let value = char.charCodeAt(0) - 96
                    total = (total + value + PRIME) % this.keyMap.length
                }
            return total;
            }
        }
        
        // Open Addressing //  linear probing
        /*
        This is because the memory addresses used for the single list are closer together, while separate chaining can have each data structure in different locations 
        far apart from each other. ... 
         linear probing leaves all values in one place in the single list
         
        Advantages:
        Open Addressing	Memory Efficient – stores elements in empty array spaces	
        Disadvantages: Creates Clusters with Linear and Quadratic Probing
        
        */
        
        
        function AuxChatsRevue(size) {
            this.count = 0 // Tracks actual item count in table
            this.size = size // current storage size of table
            this.maxLoadFactor = 0.667 // when table crosses 2/3rds capacity, size will either need to be increased or decreased
            this.increaseBy = 1.5 // x approaches infinity, amortized to O(N)
            this.table = new Array(size) // table holding keys & values
        }  
        // Prototypal method better than pseudo-class b/c faster, except without encapsulation
        phoneBook.prototype.hash = function(x) {
            var a = 113 // random number between 1 and p - 1
            var b = 87 // random number between 1 and p - 1
            var p = 10000019 // prime number - the higher the more unique
            var m = this.size // hash table rows
            return ((a * x + b) % p) % m // return result of hash formula
        }