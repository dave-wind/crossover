import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from "react";
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BasicButtonProps {
	className?: string;
	disabled?: boolean;
	size?: ButtonSize;
	btnType?: ButtonType; 	/**设置 Button 的类型 */
	children: React.ReactNode;
	href?: string;
}

type ButtonHTMLProps = ButtonHTMLAttributes<HTMLElement>
type ALinkProps = AnchorHTMLAttributes<HTMLElement>

// 交叉类型 合并属性
type NativeButtonProps = BasicButtonProps & ButtonHTMLProps
type NativeALinkProps = BasicButtonProps & ALinkProps

// Make all properties in T optional
type IPartial<T> = {
	[key in keyof T]?: T[key]
}
export type ButtonProps = IPartial<NativeButtonProps & NativeALinkProps>


const Button: FC<ButtonProps> = (props) => {
	const { btnType, className, disabled, size, children, href, ...restProps } = props
	const classes = classNames('btn', className, {
		[`btn-${btnType}`]: btnType,
		[`btn-${size}`]: size,
		'disabled': disabled
	})
	console.log('classes',classes)
	const buttonElement = btnType === 'link' && href ?
		<a className={classes} href={href} {...restProps}>{children}</a> :
		<button className={classes} disabled={disabled} {...restProps}>{children}</button>
	return buttonElement
}

Button.defaultProps = {
	disabled: false,
	btnType: 'default'
}
export default Button
