

// Triage for imports

{/* <script src="dataGetters/dataStreamsRxJS.js"></script>
<script src="dataUtil/csvJson.js"></script> 
<script src="dataVisuals/dataQueues_D3.js"></script> 
<script src="dataPerformance/bigO.js"></script> 
<script src="dataPerformance/arrays/orderedSearch.js"></script>
<script src="dataCalculators/consecDays.js"></script>
<script src="dataCalculators/searchDays.js"></script> */}

// Default Prototypes

// // Default Class helpers 
// import {HashSeparateChaining} from './index/dataStructures/DataHashTables.js';
 

// import tools [used]
import  BST  from './dataStructures/DataBinaryTree.js';   

// tools [not [yet] in use]
import NBST from './dataStructures/dataBinaryTreePrototype.js';
import BinarySearchGroot  from './dataSortSearch/BinarySearchGroot.js';
import  StepWiseOptions  from './dataDynamic/StepWiseOptions.js';
import DataBinaryHeap from './dataStructures/DataBinaryHeap.js';

import DataStack from './dataStructures/dataStack.js';
import DataLinkedList from './dataStructures/DataLinkedList.js';

import DataSet from './dataStructures/dataSet.js';
import DataQueue from './dataStructures/dataQueue.js';

import DataTrie from './dataStructures/dataTrie.js';
import { breadthSearch,testUndirectedGraph, testBreadthGraph, testUndirectedGraphArray} from './dataStructures/dataGraph.js';

 
// imports check
const bst= new BST();
for (let i=0;i<10;i++){
bst.add(i);
}
console.log("bst true = "+bst.isPresent(3));
console.log("bst false = "+bst.isPresent(33));
///

const nbst= new NBST();
///
const bsBinarySearchGroot= new BinarySearchGroot();
///
const stepWise = new StepWiseOptions();

const dataHeap = new DataBinaryHeap();
///
const dataStack = new DataStack();
///
const dataLinkedList = new DataLinkedList();
///
const dataSet = new DataSet();
///
const dataQueue = new DataQueue();

const dataTrie = new DataTrie();
dataTrie.add("Tom");
dataTrie.add("Thomas");
dataTrie.add("Tomtom");
dataTrie.add("Tom");
dataTrie.add("ThomasMilton");
dataTrie.add("ball");
dataTrie.add("bat");
dataTrie.add("sense");
dataTrie.add("donut");
dataTrie.add("doubleDown");
console.log(dataTrie.isWord("Tom"));
console.log(dataTrie.isWord("Thxyz"));
console.log(dataTrie.isWord("TomXX"));
console.log(dataTrie.isWord("ball"));
console.log(dataTrie.printIterative());
 
//2:  Dynamically loaded on button-click
document.getElementById("appVisualsBtn").addEventListener(
  "click",
  async () => {
    const { appVisuals } = await import("./appVisuals.js");
    appVisuals();
  },
  true // event capture
);

//3:  Visual Options opened
document.getElementById("launchMoreBtn").addEventListener("click", async () => {
  // radio buttons  ->>> TMP
  const num = 3;

  let modulePath = "";
  switch (num) {
    case 1:
      modulePath = "./dataUtil/dynamic.js";
      break;
    case 2:
      modulePath = "./dataDynamic/fibonacci_Memo.js";
      break;
    case 3:
      modulePath =
        num < 10 ? "./dataDynamic/fractionalKnap.js" : "./dataUtil/dynamic.js"; // ternary based on
      console.log("numbe " + num + " choice " + modulePath);
      break;
    default:
      alert("nothing chosen");
  }
  const launchMore = await import(modulePath);
});


