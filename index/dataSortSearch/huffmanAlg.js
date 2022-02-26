
// 1 2 3 4 5 5 6
// F E D C A B G

// A | 0 => 
// B | ~
// C | ~ 
// D | ~
// E | ~ 
// F | ~
// G | ~ 
export class HuffmanNode{
    constructor(freq, data, left, right){
        this.freq = freq
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

/// mapping object
const charBinaryMapping = {};
const str = "ABBCCCCGGGGGDEAAAEDBBBDFAGG"
const code = encode(str)
console.log("final coded string : "+ code);

function encode(str) {
    let mapping = {}
    for(let i = 0; i<str.length;i++){
        if ((!str.charAt(i) in mapping)){
            mapping[str.charAt(i)] = 1;
        } else{
            mapping[str.charAt(i)] = mapping [str.charAt(i)] + 1;
        }
    }
   const root =  generateTree(mapping);
    setBinaryCode(root, "");
    // generate the binary coded string : 
    console.log(charBinaryMapping);
let s = "";
    for (let i = 0; i < str.length; i++){
         s += charBinaryMapping[str.charAt(i)]  // <== keep concatenating until complete coded string!!
        }
        return s;
}
 function setBinaryCode(node,str){
     if(node != null) { 
         
        if(node.left == null && node.right == null){     
                                                                    // mapping charBinaryMapping { node.data : str}
        charBinaryMapping[node.data] = str;
        }
                 // generating binary, only left or right
         //left
         str += '0';
         setBinaryCode(node.left, str);
        str = str.slice(0, str.length - 1);
        //right
         str += '1';
         str = str.slice(0, str.length - 1);
    }
 }
 
 function generateTree(mapping){
    let keySet = Object.keys(mapping);
    const priorityQ = [];
    keySet.forEach(character => {
        let node = new HuffmanNode(mapping[character], character, null, null);
        priorityQ.push(node);
        priorityQ.sort((a,b) => {a.freq - b.freq});
    });
    while(priorityQ > 1 && typeof priorityQ !== 'undefined') {
        const first = priorityQ.shift();
        const second = priorityQ.shift();
        let mergeNode = new HuffmanNode((first.freq + second.freq), '_', first, second )
        
        root = mergeNode; 
        priorityQ.push(mergeNode);
        priorityQ.sort((a,b) >a.freq - b.freq);
    
    }
    return priorityQ.shift();

}
