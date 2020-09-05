const source = [
	{
		value: "中国",
		children: [
			{
				value: "上海",
				children: [
					{ value: "上海男人" },
					{ value: "上海女人" }
				]
			},
			{ value: "北京" },
			{ value: "广州" }
		]
	},
	{
		value: "美国",
		children: [
			{ value: "休斯敦" },
			{ value: "费城" },
			{ value: "洛杉矶" }
		]
	},
	{
		value: "日本",
	}
];

// 一层
// function flatten(arr) {
// 	let list = []
// 	arr.forEach(ele => {
// 		if (ele.children && ele.children.length > 0) {
// 			list = list.concat(ele.children)
// 		} else {
// 			list.push(ele)
// 		}
// 	});
// 	return list
// }
// const result = flatten(source)

function demo(arr) {
	let list = []
	for (let item of arr) {
		list.push(item)
		/// 递归条件
		if (item.children && item.children.length > 0) {
			list = list.concat(demo(item.children))
		}
	}
	return list
}
// console.log('result', demo(source))


// Tree

// 伸缩 是否展开
function flatten(arr, spacing = 1, expand = true, parent = null) {
	let list = []
	console.log('parent', parent)
	for (let item of arr) {
		if (!item.expand) {
			item.expand = true
		}
		item.spacing = spacing
		
		// item.parent = parent
		list.push(item)
		if (item.children && item.children.length > 0) {
			list = list.concat(flatten(item.children, spacing + 1, expand))
		}
	}
	return list
}
console.log('result', flatten(source))