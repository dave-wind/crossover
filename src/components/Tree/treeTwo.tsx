import React, {
    CSSProperties,
    useMemo,
    useState,
    useRef,
    useEffect,
} from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const originPadding = 24; //原始间距

interface DragControlData {
    drag: boolean;
    x: number;
    itemkey: string;
}

interface DragHighlight {
    drag: boolean;
    itemkey: string;
}

interface TreeItemType {
    level: number;
    itemkey: string;
    highlight: DragHighlight;
    borderColor?: string;
}

type TreeGragType = {
    gkey: string,
    backColor?: string,
} & DragControlData;

const TreeGrag = styled.div<TreeGragType>`
    position: absolute;
    width: 100%;
    height: 90%;
    ${(props) => {
        switch (props.x) {
            case 1:
                return `margin-left:${-levelSpace}px ;`;
            case 2:
                return '';
            case 3:
                return `margin-left:${levelSpace}px  ;`;
            default:
                return '';
        }
    }};
    ${(props) => {
        if (props.itemkey === props.gkey) {
            return `background: ${props.backColor};`;
        }
    }}
`;

const TreeItem = styled.div<TreeItemType>`
    padding-left: ${(props) => originPadding * props.level}px;
    padding-top: 2px;
    padding-bottom: 2px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    ${(props) => {
        if (props.highlight.drag && props.highlight.itemkey === props.itemkey) {
            return `border: 1px dashed ${props.borderColor};`;
        } else {
            return '';
        }
    }}
`;

const TreeIcon = styled.span<{ g: itemPropsRequired }>`
    & > svg {
        transition: linear 0.2s;
        height: 10px;
        margin-bottom: 5px;
        ${(props) => {
        if (props.g.children && props.g.children.length !== 0) {
            if (props.g.children[0] && props.g.children[0]['visible']) {
                return 'display:inline-block;transform: rotate(-90deg);';
            } else {
                return 'display:inline-block;';
            }
        } else {
            return 'opacity:0';
        }
    }};
    }
`;

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

const flatten = function (
    list: Array<itemProps>,
    level = 1,
    parent: itemProps,
    defaultExpand = true
): itemPropsRequired[] {
    let arr: itemPropsRequired[] = []; //收集所有子项
    list.forEach((item) => {
        item.level = level;
        if (item.expand === undefined) {
            item.expand = defaultExpand;
        }
        if (item.visible === undefined) {
            item.visible = true;
        }
        if (!parent.visible || !parent.expand) {
            item.visible = false;
        }
        if (item.key === undefined) {
            item.key = item.value + Math.random();
        }

        item.parent = parent;
        arr.push(item as itemPropsRequired);
        if (item['children']) {
            arr.push(...flatten(item['children'], level + 1, item, defaultExpand));
        }
    });
    return arr;
};

interface itemProps {
    value: string;
    level?: number;
    expand?: boolean;
    visible?: boolean;
    parent?: itemProps;
    children?: Array<itemProps>;
    key?: string;
}

interface itemPropsRequired
    extends Omit<Required<itemProps>, 'children' | 'parent'> {
    children?: itemPropsRequired[];
    parent: itemPropsRequired;
}

const checkParent = function (g: itemPropsRequired) {
    return g.level === 1;
};

const levelSpace = 20; //同级生效间距
///1插上级 2插同级 3插下级 0不插
const switchInsert = function (diff: number, g: itemPropsRequired) {
    if (!isNaN(diff)) {
        const origin = g.level * 10; //目标原本padding
        if (diff < origin) {
            //移动到padding前全部算上级
            if (checkParent(g)) {
                //排除最顶级
                return 2;
            } else {
                return 1;
            }
        } else if (diff < origin + levelSpace) {
            return 2;
        } else {
            return 3;
        }
    } else {
        return 0;
    }
};

const findOrigin = function (key: string, data: itemPropsRequired[]) {
    const res = data.filter((v) => v.key === key);
    if (res.length > 0) {
        return res[0];
    } else {
        return null;
    }
};

const getParent = function (g: itemPropsRequired) {
    if (g.parent && g.parent.parent) {
        return g.parent.parent;
    } else {
        return g.parent;
    }
};

const judgeChildren = function (
    origin: itemPropsRequired,
    target: itemPropsRequired
) {
    let sign = true; //如果有孩子就是false
    const fn = (child: itemPropsRequired) => {
        if (child.children) {
            child.children.forEach((v) => {
                if (v === target) {
                    sign = false;
                    return;
                }
                fn(v);
            });
        }
    };
    fn(origin);
    return sign;
};

const changeOriginParent = function (origin: itemPropsRequired) {
    const parent = origin.parent;
    if (parent.children) {
        const index = parent.children.indexOf(origin);
        if (index > -1) {
            parent.children.splice(index, 1);
        }
        //下面这个方法会产生bug
        //parent.children = parent.children.filter((v) => v !== origin);
    }
};

const changeTargetParent = function (
    parent: itemPropsRequired,
    origin: itemPropsRequired,
    g: itemPropsRequired
) {
    origin.parent = parent;
    if (parent.children) {
        //判断应该插入父级节点哪里
        if (g.parent.children) {
            const index = g.parent.children.indexOf(g);
            if (index > -1) {
                parent.children.splice(index + 1, 0, origin);
            } else {
                //parent传递g会进来
                parent.children.push(origin);
            }
        } else {
            parent.children.push(origin);
        }
    } else {
        parent.children = [origin];
    }
};

const checkTargetOrigin = function (
    g: itemPropsRequired,
    origin: itemPropsRequired
) {
    return g !== origin;
};

const insertTop = function (
    key: string,
    g: itemPropsRequired,
    data: itemPropsRequired[],
    callback: Function
) {
    const origin = findOrigin(key, data);
    //origin插入target上级
    const parent = getParent(g);
    if (
        g.level !== 1 &&
        origin &&
        checkTargetOrigin(g, origin) &&
        judgeChildren(origin, g)
    ) {
        //修改以前父节点
        changeOriginParent(origin);
        //修改目标父节点的父节点（与父节点同级）
        changeTargetParent(parent, origin, g);
        callback();
    }
};

const insertMiddle = function (
    key: string,
    g: itemPropsRequired,
    data: itemPropsRequired[],
    callback: Function
) {
    const origin = findOrigin(key, data);
    //origin插入target同级
    const parent = g.parent;
    if (
        g.level !== 0 &&
        origin &&
        checkTargetOrigin(g, origin) &&
        judgeChildren(origin, g)
    ) {
        changeOriginParent(origin);
        changeTargetParent(parent, origin, g);
        callback();
    }
};

const insertLower = function (
    key: string,
    g: itemPropsRequired,
    data: itemPropsRequired[],
    callback: Function
) {
    const origin = findOrigin(key, data);
    const parent = g;
    if (origin && checkTargetOrigin(g, origin) && judgeChildren(origin, g)) {
        changeOriginParent(origin);
        changeTargetParent(parent, origin, g);
        callback();
    }
};

export function throttle(fn: Function, delay: number = 300) {
    let flag = true;
    return function (...args: any) {
        if (flag) {
            flag = false;
            fn(...args);
            setTimeout(() => {
                flag = true;
            }, delay);
        }
    };
}

export type TreeProps = {
    /** 数据源*/
    source: itemProps[];
    /** 是否可以拖拽 */
    drag?: boolean;
    /** 高亮边框颜色 */
    borderColor?: string;
    /** 拖拽提示色 */
    backColor?: string;
    /**外层样式*/
    style?: CSSProperties;
    /**外层类名*/
    classname?: string;
};

const changeVisible = (item: itemPropsRequired, callback: Function) => {
    //给点击的children设置visible
    if (item.children) {
        //避免children有显示不一行为
        let visible: boolean;
        const depth = (item: itemPropsRequired[]) => {
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

export function Tree(props: TreeProps) {
    const img = new Image();
    img.src = 'https://www.easyicon.net/api/resizeApi.php?id=1200841&size=32';

    const { backColor, borderColor, drag } = props;

    const root = {
        level: 0,
        visible: true,
        expand: true,
        children: source,
        value: 'root',
    };
    const [dragUpdate, setDragUpdate] = useState(0);
    const data = useMemo(() => {
        return flatten(root.children, 1, root);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [root, dragUpdate]);
    const [start, setStart] = useState(0);
    const forceUpdate = useState(0)[1];
    const ref = useRef<HTMLDivElement>(null);

    const [highlight, setHighlight] = useState({
        drag: true,
        itemkey: '',
    });

    useEffect(() => {
        if (ref.current) {
            setStart(ref.current.getBoundingClientRect().left); //为了找到起始
        }
    }, []);

    useEffect(() => {
        const handler = () => {
            setDragOver((prev) => ({ ...prev, drag: false }));
            setHighlight({
                drag: false,
                itemkey: '',
            });
        };
        window.addEventListener('dragend', handler);
        return () => {
            window.removeEventListener('dragend', handler);
        };
    }, []);

    const [dragOver, setDragOver] = useState<DragControlData>({
        drag: false,
        x: 0,
        itemkey: '',
    });

    const dragHandler = (
        clientX: number,
        itemkey: string,
        g: itemPropsRequired
    ) => {
        const diff = clientX - start;
        const x = switchInsert(diff, g);
        setDragOver({
            drag: true,
            x,
            itemkey,
        });
    };

    const callback = () => {
        forceUpdate((state) => state + 1);
    };

    const dragCallback = () => {
        setDragUpdate((state) => state + 1);
    };

    return (
        <div ref={ref}>
            {data
                .filter((v) => v.visible === true)
                .map((g) => {
                    return (
                        <TreeItem
                            itemkey={g.key}
                            highlight={highlight}
                            level={g.level}
                            borderColor={borderColor}
                            draggable={drag}
                            onClick={() => changeVisible(g, callback)}
                            key={g.key}
                            onDragStart={(e) => {
                                e.dataTransfer.setData('atomkey', `${g.key}`);
                                e.dataTransfer.setDragImage(img, 29, 29);
                                setHighlight({
                                    drag: true,
                                    itemkey: g.key,
                                });
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                                throttle(dragHandler)(e.clientX, g.key, g);
                            }}
                            onDrop={(e) => {
                                const key = e.dataTransfer.getData('atomkey');
                                const left = e.clientX;
                                const diff = left - start; //离顶部差值
                                const res = switchInsert(diff, g);
                                switch (res) {
                                    case 1:
                                        insertTop(key, g, data, dragCallback);
                                        break;
                                    case 2:
                                        insertMiddle(key, g, data, dragCallback);
                                        break;
                                    case 3:
                                        insertLower(key, g, data, dragCallback);
                                        break;
                                    default:
                                        break;
                                }
                            }}
                        >
                            {dragOver.drag && (
                                <TreeGrag
                                    gkey={g.key}
                                    backColor={backColor}
                                    drag={dragOver.drag}
                                    x={dragOver.x}
                                    itemkey={dragOver.itemkey}
                                ></TreeGrag>
                            )}
                            <TreeIcon g={g}>
                                <Icon icon="arrowdown"></Icon>
                            </TreeIcon>
                            <span>{g.value}</span>
                        </TreeItem>
                    );
                })}
        </div>
    );
}

Tree.defaultProps = {
    source: [],
    drag: true,
    borderColor: '#53c94fa8',
    backColor: '#00000030',
};