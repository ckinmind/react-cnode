import React, { Component } from 'react';
import { DataLoad, Header, Footer, GetData } from '../common/index';
import Home from './Home.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userViewActions from '../../actions/userViewActions';

/**
 *  个人中心
 *  todo: tab组件需要改写
 */
class UserView extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.state;

        // this.tab = (tabIndex) => {
        //     this.state.tabIndex = tabIndex;
        //     this.props.setState(this.state);
        // }
    }

    componentDidMount(){
        console.log('componentDidMount');
        this.props.actions.getUserView(this.props.params.loginname);
    }



    render() {
        console.log('userview');
        console.log(this.props);

        // let {data} = this.props.state;
        let  userview  = this.props.UserView;
        let { User, params} = this.props;

        // let main = data ? <Home data={data} /> : <DataLoad />;
        let main = Object.keys(userview).length ? <Home data={userview} /> : <DataLoad />;

        /* 顶部文字也不一样*/
        let title = params.loginname == User.loginname ? '个人中心' : params.loginname + '的个人中心';

        /* 只有是登录用户的个人页面才会显示底部导航栏*/
        let footer = params.loginname == User.loginname ? <Footer index="3" /> : null;

        /* 登录用户的个人中心的头部icon和普通用户的个人中心不一样*/
        let leftIcon = params.loginname == User.loginname ? null : 'fanhui';
        let rightIcon = params.loginname == User.loginname ? 'tuichu' : null;

        return (
            <div>
                <Header title={title} leftIcon={leftIcon} rightIcon={rightIcon} rightTo="/signout" />
                { main }
                { footer }
            </div>
        );
    }
}



// export default GetData({
//     id: 'UserView',  //应用关联使用的redux
//     component: UserView, //接收数据的组件入口
//     url: (props, state) => {
//         return '/api/v1/user/' + props.params.loginname;
//     },
//     data: {},
//     success: (state) => { return state; }, //请求成功后执行的方法
//     error: (state) => { return state } //请求失败后执行的方法
// });


const mapStateToProps = state => ({
    User: state.User,
    UserView: state.UserView
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(userViewActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserView);