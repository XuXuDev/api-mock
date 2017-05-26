/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-05 14:09:01
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: register.jsx
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-26 01:44:03
 */

import React, {Component, PropTypes} from 'react';
import "../../css/antd.min.css";

import fetch from 'isomorphic-fetch'

import {bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
import * as actionCreators from '../../redux/action/action.js';

import {hashHistory} from 'react-router';

import '../../css/user/register.css';

const common = require('../../../common/common');

import ParticlesBackground from '../../component/particles/index.jsx';

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    notification
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkConfirm = this.checkConfirm.bind(this);
        this.checkPhone = this.checkPhone.bind(this);
        this.render = this.render.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.password = common.encryptPassword(values.password);
                let url = '/api/user/register';
                fetch(url, {
                    credentials: 'same-origin',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then(response => {
                    return response.json()
                }).then(json => {
                    if (json.status === 200 && json.data === true && json.err === null) {
                        let args = {
                            message: '通知',
                            description: '恭喜您注册成功！',
                            duration: 0
                        };
                        notification.open(args);
                        hashHistory.push("/login");
                    } else {
                        let args = {
                            message: '通知',
                            description: json.message,
                            duration: 3
                        };
                        notification.open(args);
                    }

                }).catch(error => {
                    let args = {
                        message: '通知',
                        description: '注册失败！请重试！',
                        duration: 3
                    };
                    notification.open(args);
                })
            }
        });
    }
    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }
    checkPhone(rule, value, callback) {
        const form = this.props.form;
        var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
        if (value) {
            if (regex.test(value)) {
                callback();
            } else {
                callback('请输入正确的手机号码！');
            }
        } else {
            callback();
        }
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 14,
                    offset: 6
                }
            }
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label={(
                    <span>
                        Username&nbsp;
                        <Tooltip title="Username为登录账号">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                    </span>
                )} hasFeedback>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your username!',
                                whitespace: true
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!'
                            }, {
                                validator: this.checkConfirm
                            }
                        ]
                    })(<Input type="password"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!'
                            }, {
                                validator: this.checkPassword
                            }
                        ]
                    })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="E-mail" hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!'
                            }, {
                                required: true,
                                message: 'Please input your E-mail!'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Nickname" hasFeedback>
                    {getFieldDecorator('nickname', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Phone Number" hasFeedback>
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                type: 'string',
                                required: true,
                                message: 'Please input your phone number!'
                            }, {
                                validator: this.checkPhone
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">Register</Button>
                </FormItem>
            </Form>
        );
    }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default class RegisterBody extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }
    render() {
        return (
            <div>
                <ParticlesBackground/>
                <div className="register-info">
                    <WrappedRegistrationForm/>
                </div>
            </div>
        )
    }
}
