import {Button, Col, Form, Input, InputNumber, notification, Row, Select, Upload, message} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import axios from "axios";
import ConfirmData from "./comfirmData";
const InputForm = () => {
 const [form] = Form.useForm()
 const [imageUrl, setImageUrl] = useState('');
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
  //เรียกคีย์ imageUrl อยู่ใน user ตัวสุดท้ายจะเป็นคีย์ใหม่ที่เราสร้างขึ้น
  values['user']['imageUrl'] = imageUrl
  const res = await axios
      .post("https://baan-racadee.herokuapp.com/user", { data: values })
      .then((x) => x);
  if(!res){
   openNotificationWithIcon('error', 'เพิ่มข้อมูลไม่สำเร็จ')
  }
  openNotificationWithIcon('success', 'เพิ่มข้อมูลสำเร็จ')
  form.resetFields()
  // getTable();
 };

 const props = {
  name: 'imageUrl',
  action: 'https://baan-racadee.herokuapp.com/upload',
  headers: {
   authorization: 'authorization-text',
  },
  onChange(info) {
   if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
    let url = info.file.response.result.secure_url
    setImageUrl(url)
   } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
   }
  },
  beforeUpload(file) {
   if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
    message.error(`${file.name} file upload failed.`);
    return false
   }
   if(file.size > 1000000){
    message.error(`${file.name} file must be < 1 MB.`);
    return false
   }
 }
 };

 const openNotificationWithIcon = (type, message) => {
  notification[type]({
   message,
  });
 };



 // const onChangeImage = (info) => {
 //  const { file } = info;
 //  console.log('file',file)
 //  if (file.status === "done") {
 //   getBase64Value(file.originFileObj, async (imageBase64Value) => {
 //    const res = await axios.post(
 //        "https://line-dukduichat.herokuapp.com/upload",
 //        { body: imageBase64Value }
 //    );
 //    setImageUrl(res.data)
 //   });
 //  }
 // };
 // const dummyRequest = ({ file, onSuccess}) => {
 //  setTimeout(() => {
 //   onSuccess("ok");
 //  }, 0);
 // };

 // const getBase64Value = (img, callback) => {
 //  const reader = new FileReader();
 //  reader.readAsDataURL(img);
 //  reader.onload = () => {
 //   callback(reader.result);
 //  };
 // };

 return (
     <>
     <h1 style={{textAlign: "center", padding:10}}>Admin Page</h1>
     <div className="form-input">
      <Row justify="center">
        <Form
            form={form}
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
           <Select.Option value="บ้านพัก">บ้านพัก</Select.Option>
           <Select.Option value="อาร์ทเม้นท์">อพาร์ทเท้นท์</Select.Option>
           <Select.Option value="คอนโด">คอนโด</Select.Option>
          </Select>
         </Form.Item>
         <Form.Item
             name={["user", "name"]}
             label="ชื่อสถานที่"
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
             name={["user", "sub_district"]}
             label="ตำบล"
             rules={[
              {
               required: true,
              },
             ]}
         >
          <Input placeholder="คอหงส์" />
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
          <Input placeholder="หาดใหญ่" />
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
         <Form.Item
             name={["user", "imageUrl"]}
             label="รูปภาพ"
             rules={[
              {
               required: true,
              },
             ]}
         >
          <Upload {...props}>
           <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
         </Form.Item>
         <Form.Item
             name={["user", "price"]}
             label="ราคา"
             rules={[
              {
               required: true,
              },
             ]}
         >
          <InputNumber placeholder="9000000" />
         </Form.Item>
         <Form.Item name={["user", "description"]} label="รายละเอียด">
          <Input.TextArea placeholder="รายละเอียดที่ตั้งคร่าว ๆ" />
         </Form.Item>
         <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" >
           Submit
          </Button>
         </Form.Item>
        </Form>
      </Row>
     </div>
      <div>
      </div>
     </>
 )
}
export default  InputForm