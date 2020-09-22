import React from 'react'
import {Alert, Spin} from "antd";

const Spinner = () => {
    return (
        <Spin tip="Loading..." spinning={loading}>
    <Alert
        message="กำลังโหลดข้อมูล"
        description="กำลังประมวลผล โปรดรอซักครู่."
        type="info"
    />
        </Spin>
    )
}

export  default  Spinner