import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Icon, IconProps } from "./icon";
import { icons } from "./icons-svg";

function IconTest(icon: IconProps["icon"]) {
    const wrapper = render(<Icon icon={icon}></Icon>);
    const path = wrapper.queryByTestId("icon-path");
    expect(path).toHaveAttribute("d", icons[icon]);
    cleanup();
}

describe(" test Icon component", () => {
    it("it should render correct icon ", () => {
        Object.keys(icons).forEach((key) => {
            IconTest(key as IconProps["icon"]);
        });
    });
    it("it should render  block ", () => {
        const wrapper = render(<Icon icon="mobile" block  data-testid="icon-svg"></Icon>);
        const svg = wrapper.getByTestId("icon-svg");
        expect(svg).toHaveStyle("display:block");
    });
    it("it should render correct color ", () => {
        let wrapper = render(<Icon icon="mobile"></Icon>);
        let path = wrapper.queryByTestId("icon-path");
        expect(path).toHaveAttribute("color", "black");
        cleanup();
        wrapper = render(<Icon icon="mobile" color="blue"></Icon>);
        path = wrapper.queryByTestId("icon-path");
        expect(path).toHaveAttribute("color", "blue");
    });
});