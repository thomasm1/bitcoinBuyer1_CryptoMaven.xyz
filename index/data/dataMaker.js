
export default function dataMaker(len) {
    var data = Array.apply(null, {length:len} ).map(Function.call, Math.random)
    console.log(data);
    return data;
}
// when called direclty
dataMaker(5);