import React from "react";
// import { action } from "@storybook/addon-actions";
import Swiper from "../components/Swiper";

export default {
    title: "Swiper组件",
    component: Swiper,
};

export const 基础 = () => {
    return (
        <>
            <div style={{ width: 200, height: 200 }}>
                <Swiper
                    imgList={['https://avatars1.githubusercontent.com/u/8186664?s=460&v=4', 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4']}
                    imgWidth="200">
                </Swiper>
            </div>
        </>
    )
}