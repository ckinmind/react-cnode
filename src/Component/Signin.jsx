import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool } from '../Tool';
import { Header } from './common/index';
import { bindActionCreators } from 'redux';

import userActions from '../actions/userActions';


/**
 * 登录模块
 *
 */
/* todo: 已经登录后再手动键入/signin网址，应该要自动跳转到个人首页，不应该还能看到登录页，原来的逻辑这里不对 */

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: '登录'
        };
    }

    /**
     * 新增逻辑，解决登录成功后再次访问登录页时没有跳转的问题（还是显示登录页）
     */
    componentWillMount() {
        let {loginname} = this.props.User;
        if (loginname) {
            this.context.router.push({
                pathname: '/user/' + loginname
            });
        }
    }

    signin() {
        // var accesstoken = this.refs.accesstoken.value;
        let accesstoken = '4ea2fd7c-e4be-47c7-903f-3a23d914ef45'; //测试

        if (!accesstoken) return alert('不能为空！');
        this.setState({button: '登录中...'});
        Tool.post('/api/v1/accesstoken', {accesstoken}, (res) => {
            if (res.success) {
                alert('登录成功');
                res.accesstoken = accesstoken;
                this.props.signinSuccess(res);
                this.context.router.push({
                    pathname: '/user/' + res.loginname
                });
            } else {
                alert('登录失败');
                this.setState({button: '登录'});
            }

        }, () => {
            alert('登录失败！');
            this.setState({button: '登录'});
        });
    }


    render() {
       // console.log(this.props);

        let test = this.signin.bind(this);
        //let test = this.props.actions.sign.bind(this, '4ea2fd7c-e4be-47c7-903f-3a23d914ef45');

        return (
            <div>
                <Header title="登录" leftIcon="fanhui" />
                <div className="signin" data-flex="dir:top main:center cross:center">
                    <div className="center">
                        <div className="text"><input ref="accesstoken" type="text" placeholder="Access Token" /></div>
                        <button className="btn" onClick={test}>{this.state.button}</button>
                    </div>
                </div>
            </div>
        );
    }
}
Signin.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    User: state.User
});


// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(userActions, dispatch)
// });


 export default connect(mapStateToProps, action('User'))(Signin); //连接redux
//export default connect(mapStateToProps, mapDispatchToProps)(Signin); //连接redux