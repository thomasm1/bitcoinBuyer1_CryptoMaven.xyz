// d3 TRIE - associative data structures
console.log("%c   TRIE BEGIN: ", "color:white; background-color:purple");

const trieDescription = `
Trie data structure
The word "Trie" is an excerpt from the word "retrieval". Trie is a sorted tree-based data-structure that stores the set of strings. It has the number of pointers equal to the number of characters of the alphabet in each node. It can search a word in the dictionary with the help of the word's prefix. For example, if we assume that all strings are formed from the letters 'a' to 'z' in the English alphabet, each trie node can have a maximum of 26 points.

Trie is also known as the digital tree or prefix tree. The position of a node in the Trie determines the key with which that node is connected.

Properties of the Trie for a set of the string:
The root node of the trie always represents the null node.
Each child of nodes is sorted alphabetically.
Each node can have a maximum of 26 children (A to Z).
Each node (except the root) can store one letter of the alphabet.
`

export function NodeTrie () {
  this.keys = new Map();
  this.end = false;
  this.setEnd = function() {
    this.end = true;
  };
  this.isEnd = function() {
    return this.end;
  };
};

export default function DataTrie() {
  this.root = new NodeTrie();
  this.add = function(input, node = this.root) {
    if (input.length == 0) { // If no input,use this.root for node
      node.setEnd();
      return;
    } else if (!node.keys.has(input[0])) { // input.len > 0, there are more letters, but NOT YET AT END OF WORD
      node.keys.set(input[0], new NodeTrie());// so start input[0] as first letter. 
      return this.add(input.substr(1), node.keys.get(input[0])); // every letter after the first letter, pass in NODE JUST CREATED (node with letter 'B's)
    } else {
      return this.add(input.substr(1), node.keys.get(input[0])); // (for another word of same letter 'B') every letter after first letter, onto EXISTING NODE
    }
  };
  this.isWord = function(word) {// checking if whole word in.. (doesn't check every word, only 1st letter )
    let node = this.root;
    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false;
      } else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      }
    }
    return node.keys.has(word) && node.keys.get(word).isEnd() ? true : false;
  };
  this.print = function() { // helper fx:array of every word and searches 
    let words = new Array();
    let search = function(node = this.root, string) {
      if (node.keys.size != 0) {
        for (let letter of node.keys.keys()) {
          search(node.keys.get(letter), string.concat(letter));
        }
        if (node.isEnd()) {
          words.push(string);
        }
      } else {
        string.length > 0 ? words.push(string) : undefined;
        return;
      }
    };
    search(this.root, new String());
    return words.length > 0 ? words : null;
  };
};

let newTrie = new DataTrie();
newTrie.add("Tom");
newTrie.add("Thomas");
newTrie.add("Tomtom");
newTrie.add("Tom");
newTrie.add("ThomasMilton");
newTrie.add("ball");
newTrie.add("bat");
newTrie.add("sense");
newTrie.add("donut");
newTrie.add("doubleDown");
console.log(newTrie.isWord("Tom"));
console.log(newTrie.isWord("Thxyz"));
console.log(newTrie.isWord("TomXX"));
console.log(newTrie.isWord("ball"));
console.log(newTrie.print());
