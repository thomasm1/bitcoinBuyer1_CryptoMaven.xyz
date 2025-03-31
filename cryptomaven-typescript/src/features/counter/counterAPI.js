"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCount = fetchCount;
// A mock function to mimic making an async request for data
function fetchCount(amount) {
    if (amount === void 0) { amount = 1; }
    return new Promise(function (resolve) {
        return setTimeout(function () { return resolve({ data: amount }); }, 500);
    });
}
