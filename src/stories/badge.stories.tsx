import React from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Icon } from "../components/Icon/icon";
import Badge, { BadgeProps, TypeProps } from '../components/Badge/badge';

export default {
    title: "Badge",
    component: Badge,
    decorators: [withKnobs],
};

const list = ['primary', 'info', 'error', 'warning', 'gray']
export const 基础 = () => {
    // 断言
    const typeList = select<BadgeProps['theme']>('类型', list as TypeProps[], 'primary')
    return (
        <Badge
        theme={typeList}
        >
            {text("文案", "badge")}
        </Badge>
    )
};

export const 全部 = () => (
    <div>
        <Badge className="mr-8">Default</Badge>
        <Badge className="mr-8" theme="info">Info</Badge>
        <Badge className="mr-8" theme="warning">Warning</Badge>
        <Badge className="mr-8" theme="error">Error</Badge>
    </div>
);

export const 图标 = () => (
    <Badge theme="warning">
        <Icon icon="check" color="#fff"/>
        with icon
    </Badge>
);