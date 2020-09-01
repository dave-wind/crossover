import React from "react";
import Radio from "../components/Radio/radio";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { rgbColor } from "../components/shared/style";
import Icon from "../components/Icon/icon";

export default {
    title: "Radio",
    component: Radio,
    decorators: [withKnobs],
};


const onChange = action("change");

export const 基础 = () => (
    <Radio
        appearance={select<keyof typeof rgbColor>(
            "color",
            Object.keys(rgbColor) as Array<keyof typeof rgbColor>,
            "primary"
        )}
        label={text("label", "i am radio")}
        onChange={onChange}
        hideLabel={boolean("hideLabel", false)}
        error={text("error", "")}
        description={text("description", "")}
        disabled={boolean("disabled", false)}
    ></Radio>
);

export const 颜色 = () => (
    <div>
        {Object.keys(rgbColor).map((v, i) => (
            <Radio
                key={i}
                name="group2"
                label={v}
                appearance={v as keyof typeof rgbColor}
            />
        ))}
    </div>
);

export const 禁用 = () => <Radio label="disabled" disabled></Radio>;


export const 图标 = () => (
    <Radio
        label={
            <span>
                <Icon icon="key"></Icon> icon
			</span>
        }
    ></Radio>
);