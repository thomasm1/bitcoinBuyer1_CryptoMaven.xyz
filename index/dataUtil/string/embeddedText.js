
export function embeddedText(frontText, backText) {
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

console.log(embeddedText("this is in front", "this is both in the front and in the back"))