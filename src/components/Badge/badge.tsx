import React, { HTMLAttributes, PropsWithChildren } from "react";
import classNames from 'classnames';

export type TypeProps = 'primary' | 'info' | 'error' | 'warning' | 'gray';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    /** 状态色*/
    theme?: TypeProps;
    size?: 'lg' | 'sm';
}

export function Badge(props: PropsWithChildren<BadgeProps>) {
    const { className,theme, size, ...resetProps } = props;
    const classes = classNames('badge', className, {
        [`badge-${theme}`]: theme,
        [`badge-${size}`]: size,
    })
    return <div {...resetProps} className={classes} ></div>;
}

export default Badge;