
import React from "react";
import Button from "../components/Button"
import Icon from "../components/Icon"
export default {
    title: "Upload",
    component: '',
};

export const 基础 = () => {
    return (
        <>
            <h3>上传组件</h3>
            <Button><Icon icon="outbox" color="#35b369" /> 上传图片 </Button>
        </>
    )
}