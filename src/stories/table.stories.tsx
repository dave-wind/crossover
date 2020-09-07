import React from "react";
import Table, { DataSourceType } from "../components/Table";
import {
    withKnobs,
    boolean,
    number,
} from "@storybook/addon-knobs";

export default {
    title: "Table",
    component: Table,
    decorators: [withKnobs],
};

const data = [
    {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: '2',
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        key: '3',
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
        key: '4',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
];

const columns = [
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Chinese Score",
        dataIndex: "chinese",
        sorter: {
            compare: (a: DataSourceType, b: DataSourceType) =>
                b.chinese - a.chinese,
        },
    },
    {
        title: "Math Score",
        dataIndex: "math",
        sorter: {
            compare: (a: DataSourceType, b: DataSourceType) => b.math - a.math,
        },
    },
    {
        title: "English Score",
        dataIndex: "english",
        sorter: {
            compare: (a: DataSourceType, b: DataSourceType) =>
                b.english - a.english,
        },
    },
];

export const Baisc = () => (
    <Table
        columns={columns}
        data={data}
        sorted={boolean("sorted", true)}
        pagination={boolean("pagination", false)}
        pageSize={number("pageSize", 2)}
    ></Table>
);

export const Pagination = () => (
    <Table columns={columns} data={data} pagination={true} pageSize={2}></Table>
);