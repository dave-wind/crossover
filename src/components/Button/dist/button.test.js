"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var button_1 = require("./button");
var defaultProps = {
    onClick: jest.fn()
};
var testProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'btn'
};
var disabledProps = {
    disabled: true,
    onClick: jest.fn()
};
describe('test Button component', function () {
    it('should render the correct default button', function () {
        var wrapper = react_2.render(react_1["default"].createElement(button_1.Button, __assign({}, defaultProps), "Hello"));
        var element = wrapper.getByText('Hello');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        expect(element.disabled).toBeFalsy();
        react_2.fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });
    it('should render the correct component based on different props', function () {
        var wrapper = react_2.render(react_1["default"].createElement(button_1.Button, __assign({}, testProps), "Hello"));
        var element = wrapper.getByText('Hello');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg klass');
    });
    it('should render a link when btnType equals link and href is provided', function () {
        var wrapper = react_2.render(react_1["default"].createElement(button_1.Button, { btnType: 'link', href: "http://dummyurl" }, "Link"));
        var element = wrapper.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    });
    it('should render disabled button when disabled set to true', function () {
        var wrapper = react_2.render(react_1["default"].createElement(button_1.Button, __assign({}, disabledProps), "Hello"));
        var element = wrapper.getByText('Hello');
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        react_2.fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    });
});
