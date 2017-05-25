/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-27 17:13:37
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: login.jsx
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 16:04:42
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import "../../css/antd.min.css";
import "../../css/user/login.css";
import {Form, Icon, Input, Button, Checkbox} from 'antd';

import ParticlesBackground from '../../component/particles/index.jsx';

import * as actionCreators from '../../redux/action/action.js';
import {bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
const common = require('../../../common/common');

const FormItem = Form.Item;

const propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

class NormalLoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.password = common.encryptPassword(values.password);
                this.props.actions.login(values);
            }
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {actions, state} = this.props;
        return (
            <Form id="components-form-demo-normal-login" onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]
                    })(
                        <Input prefix={< Icon type = "user" style = {{ fontSize: 13 }}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!'
                            }
                        ]
                    })(
                        <Input prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>} type="password" placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="#register">Register</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const NormalLoginFormWithProps = connect(state => ({state}), dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
}))(NormalLoginForm);

const WrappedNormalLoginForm = Form.create()(NormalLoginFormWithProps);

export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="user-content">
                <ParticlesBackground/>
                <div className="user-info">
                    <WrappedNormalLoginForm/>
                </div>
            </div>
        );
    }
}
