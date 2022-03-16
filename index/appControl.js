
// Default Prototypes
import {ApiWalker} from './dataServices/dataServices.js';

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



import { AppStyle } from "./appStyle.js";
//1:  Auto-load initial D3 visuals and index.html elements
// options arg taking AppStyle's default option object

// const appStyle= new AppStyle()
// appStyle.headline(title.toUpperCase());
//  appStyle.headline( tocTitle)
//     .desc(toc);

//   appStyle.widget.render();
// appStyle.subWidget.render(); 
// appStyle.titleWidget()
// appStyle.elemHeader();


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



// CONTROLS TEMP

 
let possibleChoices = new Array()
possibleChoices = document.getElementsByClassName('button')
console.log("possibleChoices", possibleChoices)
const apiNavChoiceDisplay = document.getElementById('api-nav-choice-display')

 
let apiNavChoice 
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) =>{
  apiNavChoice = e.target.id
  apiNavChoiceDisplay.innerHTML = apiNavChoice
  console.log(apiNavChoice)
  // getResult(apiNavChoice);
}))

function getResult(apiNavChoice) { 
  let path = '';
  //                  // TEMP CASE SWITCH
  switch(apiNavChoice) {
  case 0:
  console.log("0: "+"get-meta-data"+path);
  path = 'get-meta-data'
  break;
  case 1:
  console.log("1 search"+path);
  path = 'coins/search';
  break;
  case 2:
  console.log("2"+"coins/list"+path);
  path = 'coins/list';
  break;
  case 3:
  console.log("3"+"coins/list-pairs"+path);
  path = 'coins/list-pairs';
  break;
  case 4:
  console.log("4"+"get-overview"+path);
  path = 'coins/get-overview'; 
  break;
  case 5:
  console.log("4"+"get-technical"+path);
  path = 'coins/get-technical';
  break;
  case 6:
  console.log("4"+"get-markets"+path);
  path = 'coins/get-markets';
  break;
  case 7:
  console.log("4"+"get-historical-data"+path);
  path = 'coins/get-historical-data';
  break;
  case 8:
  console.log("4"+"get-analysis"+path);
  path = 'coins/get-analysis';
  break;
  case 9:
  console.log("4"+"get-news"+path);
  path = 'coins/get-news';
  break; 
  }
  
}
