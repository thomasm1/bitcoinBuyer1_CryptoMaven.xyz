//var decodedData = scope.atob(encodedData);

const encodedData = window.btoa('Hello, world'); // encode a string
const decodedData = window.atob(encodedData); // decode the string