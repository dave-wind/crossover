
import React from "react";
import Progress from "../components/Progress"

export default {
    title: "Progress",
    component: Progress,
};

export const 基础 = () => {
    return (
        <>
            <h3>进度条组件</h3>
            <Progress percent={80} styles={{ width: 200 }} color="#35b369"></Progress>
        </>
    )
}