import React from "react";
import { Tree } from "../components/Tree/treeTwo";
import { withKnobs, boolean, color } from "@storybook/addon-knobs";

export default {
    title: "Tree",
    component: Tree,
    decorators: [withKnobs],
};

const source = [
    {
        value: "中国",
        children: [
            {
                value: "上海",
                children: [
                    { value: "上海男人" },
                    { value: "上海女人" }
                ]
            },
            { value: "北京" },
            { value: "广州" }
        ]
    },
    {
        value: "美国",
        children: [
            { value: "休斯敦" },
            { value: "费城" },
            { value: "洛杉矶" }
        ]
    },
    {
        value: "日本",
    }
];

export const knobsTree = () => (
    <Tree
        backColor={color("backColor", "#00000030")}
        borderColor={color("borderColor", "#53c94fa8")}
        drag={boolean("drag", true)}
        source={source}
    ></Tree>
);