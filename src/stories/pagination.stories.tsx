import React from "react";
import Pagination from "../components/Pagination";
import {
    withKnobs,
    number,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
    title: "Pagination",
    component: Pagination,
    decorators: [withKnobs],
};

export const Basic = () => (
    <Pagination
        defaultCurrent={number("defualtCurrent", 1)}
        total={number("total", 100)}
        barMaxSize={number("barMaxSize", 5)}
        pageSize={number("pageSize", 5)}
        callback={action("callback")}
    ></Pagination>
);
