/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-26 11:15:45
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: router.jsx
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 17:59:57
 */

import React from 'react';

import {Router, Route, Link, hashHistory} from 'react-router';

import Login from '../pages/user/login.jsx';
import Register from '../pages/user/register.jsx';
import HomeBody from '../pages/home/index.jsx';
import App from '../component/app/index.jsx';
import Demo from '../pages/demo.jsx';

export default class Routers extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/" component={App}>
                    <Route path="/home" component={HomeBody}/>
                </Route>
                <Route path="/home" component={HomeBody}/>
                <Route path="/add" component={Demo}/>
            </Router>
        )
    }
}
