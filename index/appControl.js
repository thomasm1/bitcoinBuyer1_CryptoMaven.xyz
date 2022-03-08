import { appTitle } from "./appTitle.js";
//1:  Auto-load initial D3 visuals and index.html elements
appTitle();

// import tools
import  BST  from './dataStructures/DataBinaryTree.js'; 
// imports check
const bst= new BST();
for (let i=0;i<10;i++){
bst.add(i);
}
console.log("bst true = "+bst.isPresent(3));
console.log("bst false = "+bst.isPresent(33));



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
