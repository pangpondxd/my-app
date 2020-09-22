import React from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, PlusOutlined, FormOutlined, BookOutlined } from '@ant-design/icons';
import './BaseLayout.css'
import About from "../../pages/About";
import Admin from "../../pages/Admin";
import ManageTable from '../../pages/manageTables'
import Login from '../login'
const BaseLayout = () => {
    const { Header, Content, Footer } = Layout;

    const breadcrumbNameMap = {
        '/about': 'About',
        '/manage': 'Manage Table',
    };

    const Home = withRouter(props => {
        const { location } = props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <span>{breadcrumbNameMap[url]}</span>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [
            <Breadcrumb.Item key="home">
               <span>Home</span>
            </Breadcrumb.Item>,
        ].concat(extraBreadcrumbItems);
        return (
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        );
    });

    return (
        <Router>
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><PlusOutlined /><span>เพิ่มข้อมูลใหม่</span><Link to="/" /></Menu.Item>
                    <Menu.Item key="2"><FormOutlined /><span>จัดการข้อมูล</span><Link to="/manage" /></Menu.Item>
                    <Menu.Item key="3"><BookOutlined /><span>คู่มือการใช้งาน</span><Link to="/about" /></Menu.Item>
                    <Menu.Item key="4"><UserOutlined /><span>เข้าสู่ระบบ</span><Link to="/login" /></Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 40px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Home />
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 820 }}>
                    <Route exact path="/" component={Admin} />
                    <Route path="/manage" component={ManageTable} />
                    <Route path="/about" component={About} />
                    <Route path="/login" component={Login} />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center'}}>Map Finder ©2018 Created by Tanawat Wirattangsakul</Footer>
        </Layout>
        </Router>
    )
}

export default BaseLayout