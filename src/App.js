import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Table,
  Select,
  Upload,
} from "antd";

import ImgCrop from "antd-img-crop";

const App = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [previewSource, setPreviewSource] = useState()
  const getTable = async () => {
    const result = await axios
      .get("https://line-dukduichat.herokuapp.com/phuket")
      .then((x) => x);
    const resultSongkhla = await axios
      .get("https://line-dukduichat.herokuapp.com/songkhla")
      .then((x) => x);
    setData([...result.data, ...resultSongkhla.data]);
    // console.log("data", data);
    // console.log("result.data", resultSongkhla.data);
  };

  useEffect(() => {
    getTable();
  }, []);

  // if (data.length !== 0) {
  //   data.map((d) => console.log("d", d));
  // }

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  //remove ค่าซ้ำ
  // const beasts = ['ant', 'bison', 'bison', 'duck', 'bison'];
  // expected output: 1
  // let b = beasts.filter((c,i)=>{
  // return beasts.indexOf(c) === i
  // })
  // console.log('beasts', b)

  const columns = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      filters: [
        {
          text: "ภูเก็ต",
          value: "ภูเก็ต",
        },
        {
          text: "สงขลา",
          value: "สงขลา",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.province.indexOf(value) === 0,
      sorter: (a, b) => a.province.length - b.province.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "หมวดหมู่",
      dataIndex: "type",
      filters: [
        {
          text: "ที่กิน",
          value: "ที่กิน",
        },
        {
          text: "ที่เที่ยว",
          value: "ที่เที่ยว",
        },
        {
          text: "ที่พัก",
          value: "ที่พัก",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      sorter: (a, b) => a.type.length - b.type.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  const dataTable = () => {
    if (data.length !== 0) {
      return data.map((d, index) => {
        // console.log('table',d)
        return {
          key: index,
          name: d.name,
          province: d.province,
          type: d.type,
        };
      });
    }
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = async (values) => {
    uploadImage(previewSource)
    console.log("values", values);
    const res = await axios
      .post("https://line-dukduichat.herokuapp.com/user", { data: values })
      .then((x) => x);
    // console.log("res.data", res.data);
    getTable();
  };
  
  const uploadImage = async () => {
    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: FormData(),
        headers: {'content-type': 'application/json'}
      })
    } catch (error) {
      console.log(error)
    }
  }


  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChangeImages = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => setPreviewSource(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div className="form-input">
      <div>
        <Row justify="center">
          <Col span={8}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["user", "type"]}
                label="หมวดหมู่"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select>
                  <Select.Option value="ที่กิน">ที่กิน</Select.Option>
                  <Select.Option value="ที่เที่ยว">ที่เที่ยว</Select.Option>
                  <Select.Option value="ที่พัก">ที่พัก</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={["user", "name"]}
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Central Festival Hatyai" />
              </Form.Item>
              <Form.Item
                name={["user", "coordinates", "latitude"]}
                label="Latitude"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber placeholder="6.992042" />
              </Form.Item>
              <Form.Item
                name={["user", "coordinates", "longitude"]}
                label="Longitude"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber placeholder="100.483066" />
              </Form.Item>
              <Form.Item
                name={["user", "district"]}
                label="อำเภอ"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="เมือง" />
              </Form.Item>
              <Form.Item
                name={["user", "province"]}
                label="จังหวัด"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="สงขลา" />
              </Form.Item>
              {/* <Form.Item
                name={["user", "imageUrl"]}
                label="image link"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="https://res.cloudinary.com/doumyycj0/image/upload/v1597979738/AF1QipOxmSoJzT6dlbFczJCEFuAbGi2jwVUNOIerTFKQ_w408-h306-k-no_sgduoq.jpg" />
              </Form.Item> */}
              <Form.Item
                name={["user", "imageUrl"]}
                label="image link"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <ImgCrop rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChangeImages}
                  onPreview={onPreview}
                >
                  {fileList.length < 2 && "+ Upload"}
                </Upload>
              </ImgCrop>
              </Form.Item>
              <Form.Item name={["user", "description"]} label="Address">
                <Input.TextArea placeholder="รายละเอียดที่ตั้งคร่าว ๆ" />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Table columns={columns} dataSource={dataTable()} onChange={onChange} />
      </div>
    </div>
  );
};

export default App;
