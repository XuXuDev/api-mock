/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-25 16:28:49
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: index.jsx
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 19:10:33
 */

'use strict'

import React, {Component} from "react";
import './index.css';

import {Layout, Menu, Icon, Breadcrumb, Dropdown} from 'antd';
const {Header, Sider, Content} = Layout;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
        this.toggle = this.toggle.bind(this);
        this.render = this.render.bind(this);
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        const userMenu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="#login">个人信息</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.taobao.com/">修改密码</a>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="2">退出</Menu.Item>
            </Menu>
        );
        return (
            <Layout>
                <Header style={{
                    padding: 0
                }}>
                    <span className="welcome">
                        <Icon style={{
                            paddingRight: "5px",
                            fontSize: "20px",
                            color: '#fff'
                        }} type="global"/>
                        欢迎使用API MOCK 系统
                    </span>
                    <div className="logout-div">
                        <Dropdown overlay={userMenu} trigger={['click']}>
                            <a style={{
                                paddingRight: "5px",
                                fontSize: "20px",
                                color: '#fff'
                            }} className="ant-dropdown-link" href="#">
                                ceekey
                                <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo">
                            <Icon className="trigger" type={this.state.collapsed
                                ? 'menu-unfold'
                                : 'menu-fold'} onClick={this.toggle}/>
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Icon type="user"/>
                                <span className="nav-text">nav 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="video-camera"/>
                                <span className="nav-text">nav 2</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload"/>
                                <span className="nav-text">nav 3</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{
                            margin: '0',
                            paddingLeft: "25px",
                            background: '#fff'
                        }}>
                            <Breadcrumb>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>An Application</Breadcrumb.Item>
                            </Breadcrumb>
                        </Header>
                        <Content style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280
                        }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
