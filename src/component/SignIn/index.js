import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import loginActions from '../../actions/loginActions';

import { Header } from '../common/index';


/**
 * 登录模块
 * todo: 1. 处理快速点击登陆框导致重复请求的问题 2. 登陆失败清空输入框的操作
 */
class SignIn extends Component {

    /** 登录成功后再次访问登录页时跳转到个人中心）*/
    componentWillMount() {
        let { isLogined, loginname } = this.props.User;
        if (isLogined){
            hashHistory.push({ pathname: '/user/' + loginname });
        }
    }

    /** 当登录成功，SignIn组件或接受到新的User数据，然后根据isLogined来决定跳转到个人中心还是清空输入框 */
    componentWillReceiveProps(nextProps){
        let { isLogined, loginname } = nextProps.User;
        if(isLogined){
            /* 登录成功跳转 */
            hashHistory.push({ pathname: '/user/' + loginname });
        }else{
            /* 登录失败清空输入框 todo: 这里清空操作不对，留待以后改写 */
           // this.tokenInput.value = '';
        }
    }

    /** 处理登录的请求*/
    handleClick(){
        let accesstoken = this.tokenInput.value;
        this.props.action.login(accesstoken);
    }

    render() {
        return (
            <div>
                <Header title="登录" leftIcon="fanhui" />
                <div className="signin" data-flex="dir:top main:center cross:center">
                    <div className="center">
                        <div className="text">
                            <input ref={input => {this.tokenInput = input}} type="text" placeholder="Access Token" />
                        </div>
                        <button className="btn" onClick={this.handleClick.bind(this)}>登录</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    User: state.User
});

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(loginActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);