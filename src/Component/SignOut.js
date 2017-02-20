import React, { Component } from 'react';
import { connect } from 'react-redux';
import logoutActions from '../actions/logoutActions';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Header } from './common/index';

/**
 * 退出登录页
 * todo: 如果没有登录则跳转到登录页，这个应该在路由那里处理，权限控制，这里暂时在componentWillMount里处理
 */
class SignOut extends Component {

    /** 如果没有登录则不应该显示退出登录页面，直接跳转到登录页*/
    componentWillMount(){
        let { isLogined } = this.props.User;
        if (!isLogined){
            hashHistory.push({ pathname: '/signin' });
        }
    }

    /** 登出成功后User数据会发生变化，然后根据isLogined选择跳转首页 */
    componentWillReceiveProps(nextProps){
        let { isLogined } = nextProps.User;
        if(!isLogined){
            hashHistory.push({ pathname: '/' });  /* 登出成功跳转首页 */
        }
    }

    render() {
        return (
            <div>
                <Header title="退出" leftIcon="fanhui" />
                <div className="signin" data-flex="dir:top main:center cross:center">
                    <div className="center">
                        <button className="btn btn-red" onClick={this.props.actions.logout}>确认退出登录？</button>
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
    actions: bindActionCreators(logoutActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);