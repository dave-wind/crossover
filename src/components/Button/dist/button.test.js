"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var _1 = require(".");
describe('test Button Component', function () {
    it('render default button', function () {
        var wrapper = react_2.render(react_1["default"].createElement(_1["default"], null, "Test"));
        var element = wrapper.getByText('Test');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
    });
});
