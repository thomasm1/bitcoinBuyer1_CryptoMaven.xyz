
export function isEmbeddable(frontText, backText) {
    const frontArray = frontText.split(' ');
    const backArray = backText.split(' ');
    const backObject = {};

    backArray.forEach(word => {
        if (!backObject[word]) { backObject[word] = 0; }
        backObject[word]++; 
    });

    let isEmbeddable = true;
    frontArray.forEach(word => {
        if (backObject[word]) {              /// check if backArray has word we need in its storage bank.
            backObject[word]--;
            if (backObject[word] < 0) { isEmbeddable = false; }
        }
        // process of only eliminate 
        else { isEmbeddable = false; }
    });
    return isEmbeddable;
}
// Validate JSON with quoted keys 
export function validateJSONwithQuotedKeys() {
json_string.replace(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g, '$1"$3":');
eval('var json = new Object(' + json_string + ')');
}
console.log(embeddedText("this is in front", "this is both in the front and in the back"))