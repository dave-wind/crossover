// import { css } from "styled-components";

import { rgb } from "polished";

export const color = {
	primary: '#35b369',
	secondary: '#e8e8e8',
	green: '#00824B',
	orange: '#e6c481',
	blue: '#1890ff',
	yellow: '#FFC300',
	red: '#F56C6C',
	lightGreen: '#edf8f3',
	fontColor: '#33433d',
	light: '#f5f5f5',
	dark: '#4f4f4f',
	success: '#238c52',
	info: '#1890ff',
	warning: '#FFC300',
	danger: '#F56C6C',
};
export const rgbColor = {
	primary: rgb(53,179,105),
	info: rgb(24,144,255),
	warning: rgb(255,195,0),
	danger: rgb(245,108,108),
}
// Palette
export const monoChrome = [
	'#000000',
	'#4f4f4f',
	'#757575',
	'#9c9c9c',
	'#c2c2c2',
	'#e8e8e8',
	'#f5f5f5',
	'#fdfdfd',
	'#ffffff'
]

export const baseColor = [
	'#041a10',
	'#0a4026',
	'#14663c',
	'#238c52',
	'#35b369',
	'#58bf80',
	'#7ecc9a',
	'#a9d9b8',
	'#d8e6dc',
	'#e4f2e7'
]
export const background = {
	app: "#F6F9FC",
	appInverse: "#7A8997",
	positive: "#E1FFD4",
	negative: "#FEDED2",
	warning: "#FFF5CF",
};

export const typography = {
	type: {
		primary:
			'"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
		code://书写字体
			'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
	},
	weight: {
		regular: "400",
		bold: "700",
		extrabold: "800",
		black: "900",
	},
	size: {
		s1: "12",
		s2: "14",
		s3: "16",
		m1: "20",
		m2: "24",
		m3: "28",
		l1: "32",
		l2: "40",
		l3: "48",
	},
};

export const spacing = {
	padding: {
		small: 10,
		medium: 20,
		large: 30,
	},
	borderRadius: {
		small: 5,
		default: 10,
	},
};

export const breakpoint = 600;
export const pageMargin = 5;