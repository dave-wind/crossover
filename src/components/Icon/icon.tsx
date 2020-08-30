import React from "react";
import styled from "styled-components";

import { icons } from "./icons-svg";


export interface IconProps {
    /** 图标名*/
    icon: keyof typeof icons;
    /** 是否块级元素 */
    block?: boolean;
    /** 主题 */
    theme?: string;
    /** 颜色 */
    color?: string;
    width?: string | number;
    height?: string | number;
}


const Svg = styled.svg<IconProps>`
	display: ${(props) => (props.block ? "block" : "inline-block")};
	vertical-align: middle;
	shape-rendering: inherit;
    transform: translate3d(0, 0, 0);
`;

const Path = styled.path`
    fill: ${(props) => props.color};
`;

export function Icon(props: IconProps) {
    const { block, icon, color, width, height } = props;
    return (
        <Svg
            viewBox="0 0 1024 1024"
            block={block}
            width={width + 'px'}
            height={height + 'px'}
            {...props}
        >
            <Path d={icons[icon]} color={color}
                data-testid="icon-path" />
        </Svg>
    );
}

Icon.defaultProps = {
    block: false,
    color: "black",
    width: '22',
    height: '20'
};