import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'
import { Form, Input, InputNumber, Button, Row, Col } from 'antd';





const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const func = async () => {
      const result = await axios.get('https://line-dukduichat.herokuapp.com/').then(x => x)
      setData(result)
    }
    func()
  }, [])

  // if(data !== []){
  //   console.log('data', data)
  //   data.map((e) => {
  //     console.log(e.name)
  //   })
  // }


  
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
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};


  const onFinish = async (values) => {
    console.log('values', values);
    const res = await axios.post('https://line-dukduichat.herokuapp.com/user', {data: values}).then(x => x)
    console.log('res', res)
  };
 console.log('data', data)


  return (
    <div className="form-input">
      <div>
      <Row justify="center">
      <Col span={8}>
   
       <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
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
        name={['user', 'coordinates', 'latitude']}
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
        name={['user', 'coordinates','longitude']}
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
      name={['user', 'province']} 
      label="จังหวัด"
      rules={[
        {
          required: true,
        },
      ]}
      >
        <Input placeholder="หาดใหญ่, สงขลา" />
      </Form.Item>
      <Form.Item
        name={['user', 'imageUrl']}
        label="image link"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="https://res.cloudinary.com/doumyycj0/image/upload/v1597979738/AF1QipOxmSoJzT6dlbFczJCEFuAbGi2jwVUNOIerTFKQ_w408-h306-k-no_sgduoq.jpg" />
      </Form.Item>
      <Form.Item name={['user', 'description']} label="Address">
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
    </div>
    </div>
  );
}

export default App;
