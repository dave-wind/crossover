import React from "react";
import DatePicker from "../components/Datepicker";
import {
    withKnobs,
    text,
    number,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
    title: "Datepicker",
    component: DatePicker,
    decorators: [withKnobs],
};

export const 日期 = () => (
    <div style={{ height: "500px" }}>
        <DatePicker
            callback={action("callback")}
            delay={number("delay", 200)}
            initDate={text("initDate", "")}
        ></DatePicker>
    </div>
);
