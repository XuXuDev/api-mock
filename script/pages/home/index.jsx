/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-25 17:06:52
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: index.jsx
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 17:15:08
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import "../../css/antd.min.css";

import fetch from 'isomorphic-fetch'

import {bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
import * as actionCreators from '../../redux/action/action.js';

import {hashHistory} from 'react-router';

import '../../css/home/index.css';

import OwnMenu from '../../component/menu/index.jsx'

const common = require('../../../common/common');

export default class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }
    render() {
        return (
            <div>
                <OwnMenu/>
            </div>
        )
    }
}
