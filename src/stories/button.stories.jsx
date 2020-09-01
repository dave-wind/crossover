import React from "react";
import { action } from "@storybook/addon-actions";
// import { storiesOf } from '@storybook/react'
import Button from "../components/Button";
import range from 'lodash/range';
import { number, text, select } from '@storybook/addon-knobs';

export default {
	title: "Button组件",
	component: Button,
	Subcomponents: { // 其他组件
	},
	parameters: {
	},
};


export const 基础 = () => {
	return (
		<>
			<h4>通用样式</h4>
			<Button className="mb-16">default button</Button>
			<h5>禁用</h5>
			<Button className="mb-16" disabled>disabled</Button>
			<h5>a链接</h5>
			<div className="desc mb-16" >a 链接 除了type为link 必须要传 href 否则不生效</div>
			<Button className="mb-16" btnType="link" href="https://www.baidu.com"> link button </Button>
			<h5>禁用</h5>
			<Button btnType="link" href="https://www.baidu.com" disabled>disabled link</Button>
		</>
	)
}

export const 功能 = () => {
	const count = number('数量', 1, { min: 0, max: 50, range: true });
	const label = text('内容', 'button');
	const size = select('尺寸', ['common', 'lg', 'sm'], 'common')
	const btnType = select('类型', ['default', 'primary', 'info', 'danger', 'link'], 'primary')
	console.log('btnType', btnType)
	return (
		<>
			<h4>功能演示</h4>
			<div className="desc mb-16"> 可在下方 Knobs 手动模拟操作</div>
			{range(count).map((i) => (
				<Button
					onClick={action('you can use Knobs')} key={i}
					size={size}
					btnType={btnType}
					className="mr-8 mb-8">{`${label} ${i}`}</Button>
			))}
		</>
	);
}
