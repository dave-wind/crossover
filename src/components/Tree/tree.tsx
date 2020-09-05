import React, { FC, HTMLAttributes, useState } from 'react'

interface ItemProps {
    key?: string;
    value: string
    spacing?: number
    expand?: boolean;
    visible?: boolean;
    parent?: ItemProps;
    children?: Array<ItemProps>;
}

// Exclude chidren | parent; all is required
interface ItemPropsRequired extends Omit<Required<ItemProps>, "children" | "parent"> {
    children?: ItemPropsRequired[];
    parent: ItemPropsRequired;
}

function flatten(arr: Array<ItemProps>, spacing = 1, parent: ItemProps, defaultExpand = true) {
    let list: ItemPropsRequired[] = []
    for (let item of arr) {
        item.spacing = spacing;

        if (!item.expand) {
            item.expand = defaultExpand;
        }
        if (!item.visible) {
            item.visible = true;
        }
        if (!parent.visible || !parent.expand) {
            item.visible = false;
        }
        if (!item.key) {
            item.key = item.value + Math.random();
        }

        item.parent = parent;

        // 断言
        list.push(item as ItemPropsRequired)

        if (item.children) {
            // list = list.concat(flatten(item.children, spacing + 1, item, defaultExpand))
            list.push(...flatten(item.children, spacing + 1, item, defaultExpand))
        }
    }
    return list
}

interface TreeProps extends HTMLAttributes<HTMLDivElement> {
    // className?: string
    // source: any
}

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

const root = {
    spacing: 0,
    visible: true,
    expand: true,
    children: source,
    value: "root",
};


const changeVisible = (item: ItemPropsRequired, callback: Function) => {
    //给点击的children设置visible
    if (item.children) {
        //避免children有显示不一行为
        let visible: boolean;
        const depth = (item: ItemPropsRequired[]) => {
            item.forEach((v) => {
                if (visible === undefined) {
                    visible = !v.visible;
                }
                v.visible = visible;
                if (v.children) {
                    //把孩子全部改掉
                    depth(v.children);
                }
            });
        };
        depth(item.children);
        callback(); //改完后更新页面
    }
};

export const Tree: FC<TreeProps> = (props) => {
    const data = flatten(source, 1, root);
    const forceUpdate = useState(0)[1];

    console.log('data', data)

    const callback = () => {
        forceUpdate((state) => state + 1);
    };

    return (
        <div>
            {
                data.filter((v) => v.visible === true).map(g => (
                    <div
                        onClick={() => changeVisible(g, callback)}
                        key={g.key}
                        style={{
                            paddingLeft: `${10 * g.spacing}px`,
                            cursor: "pointer",
                        }}>
                        {g.value}
                    </div>
                ))
            }
        </div>
    )
}


