import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import React, {useState} from "react";
import { useGetPosts } from "../action";
import Spinner from "./Spinner";
    const About = () => {
        const { data, loading } = useGetPosts();
        const [state, setState] = useState({
            searchText: '',
            searchedColumn: '',
        })
        let searchInput
        const getColumnSearchProps = dataIndex => ({
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => {
                            searchInput = node;
                        }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) =>
                record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                    : '',
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => searchInput.select(), 100);
                }
            },
            render: text =>
                state.searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[state.searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
        });

        const handleSearch = (selectedKeys, confirm, dataIndex) => {
            confirm();
            setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
            });
        };

        const  handleReset = clearFilters => {
            clearFilters();
            setState({ searchText: '' });
        };
            const columns = [
                {
                    title: 'ชื่อ',
                    dataIndex: 'name',
                    key: 'name',
                    width: '30%',
                    ...getColumnSearchProps('name'),
                },
                {
                    title: 'ตำบล',
                    dataIndex: 'sub_district',
                    key: 'sub_district',
                    width: '20%',
                    ...getColumnSearchProps('sub_district'),
                },
                {
                    title: 'อำเภอ',
                    dataIndex: 'district',
                    key: 'district',
                    ...getColumnSearchProps('district'),
                },
                {
                    title: 'จังหวัด',
                    dataIndex: 'province',
                    key: 'province',
                    ...getColumnSearchProps('province'),
                }, {
                    title: "หมวดหมู่",
                    dataIndex: "type",
                    filters: [
                        {
                            text: "บ้านพัก",
                            value: "บ้านพัก",
                        },
                        {
                            text: "อพาร์ทเม้นท์",
                            value: "อพาร์ทเม้นท์",
                        },
                        {
                            text: "คอนโด",
                            value: "คอนโด",
                        },
                    ],
                    // specify the condition of filtering result
                    // here is that finding the name started with `value`
                    onFilter: (value, record) => record.type.indexOf(value) === 0,
                    sorter: (a, b) => a.type.length - b.type.length,
                    sortDirections: ["descend", "ascend"],
                }, {
                    title: "Action",
                    key: "action",
                    render: (text, record) => (
                        <Space size="middle">
                            <a>Edit</a>
                            <a>Delete</a>
                        </Space>
                    ),
                },
            ];

        const dataTable = () => {
            if (data.length !== 0) {
               
                return data.map((d, index) => { {
                    return {
                        key: index,
                        name: d.name,
                        sub_district: d.sub_district,
                        district: d.district,
                        province: d.province,
                        type: d.type,
                    };
                }
                });
            }
        };
            return (
                <>
                    {loading && <Spinner />}
                    {!loading && (
                        <div style={{ width: "100%" }}>
                            <Table
                                columns={columns}
                                dataSource={dataTable()}
                            />
                        </div>
                    )}
                </>
                )
    }
export default About