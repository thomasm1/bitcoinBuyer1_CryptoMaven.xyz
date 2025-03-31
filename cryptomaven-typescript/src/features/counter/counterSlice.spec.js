"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var counterSlice_1 = require("./counterSlice");
describe('counter reducer', function () {
    var initialState = {
        value: 3,
        status: 'idle',
    };
    it('should handle initial state', function () {
        expect((0, counterSlice_1.default)(undefined, { type: 'unknown' })).toEqual({
            value: 0,
            status: 'idle',
        });
    });
    it('should handle increment', function () {
        var actual = (0, counterSlice_1.default)(initialState, (0, counterSlice_1.increment)());
        expect(actual.value).toEqual(4);
    });
    it('should handle decrement', function () {
        var actual = (0, counterSlice_1.default)(initialState, (0, counterSlice_1.decrement)());
        expect(actual.value).toEqual(2);
    });
    it('should handle incrementByAmount', function () {
        var actual = (0, counterSlice_1.default)(initialState, (0, counterSlice_1.incrementByAmount)(2));
        expect(actual.value).toEqual(5);
    });
});
