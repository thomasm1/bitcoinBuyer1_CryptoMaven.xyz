// HashTable
console.log("%c HASH TABLE: ", "color:white; background-color:orange");


export function hashMethods(storageLimit = 10) { 
    this.keyMapArray = [];
  this.storageLimit = storageLimit; // i.e. maxLength if not specified as arg
}; // END Hash fx

hashMethods.prototype.hash = function (string, maxLength) {
  let hashResult = 0;
  for (var i = 0; i < string.length; i++) {
    hashResult += string.charCodeAt(i)-96;
  }
  return hashResult % maxLength;
};

  hashMethods.prototype.print = function() {
    console.log(this.keyMapArray);
  };

  hashMethods.prototype.add = function(key, value) {
    let index = this.hash(key, this.storageLimit);
    if (this.keyMapArray[index] === undefined) {
      this.keyMapArray[index] = [[key, value]];
    } else {
      var inserted = false;
      for (var i = 0; i < this.keyMapArray[index].length; i++) {
        if (this.keyMapArray[index][i][0] === key) {
          this.keyMapArray[index][i][1] = value;
          inserted = true;
        }
      }
      if (inserted === false) {
        this.keyMapArray[index].push([key, value]);
      }
    }
  }; // end add fx

  hashMethods.prototype.remove = function(key) {
    var index = this.hash(key, this.storageLimit);
    if (this.keyMapArray[index].length === 1 && this.keyMapArray[index][0][0] === key) {
      delete this.keyMapArray[index];
    } else {
      for (var i = 0; i < this.keyMapArray[index]; i++) {
        if (this.keyMapArray[index][i][0] === key) {
          delete this.keyMapArray[index][i];
        }
      }
    }
  }; // end remove fx

  hashMethods.prototype.lookup = function(key) {
    var index = this.hash(key, this.storageLimit);
    if (this.keyMapArray[index] === undefined) {
      return undefined;
    } else {
      for (var i = 0; i < this.keyMapArray[index].length; i++) {
        if (this.keyMapArray[index][i][0] === key) {
          return this.keyMapArray[index][i][1];
        }
      }
    }
  }; //end lookup fx

  hashMethods.prototype.printCheck = function(){

  console.log(this.hash("thomas", 10));
  let ht = new hashMethods();
  ht.add("alpha", "one");
  ht.add("beta", "two");
  ht.add("gamma", "three");
  ht.add("delta", "four");
  ht.add("epsilon", "five");
  console.log(ht.lookup("gamma"));
  ht.print();

  }
let check = new hashMethods();
check.printCheck();