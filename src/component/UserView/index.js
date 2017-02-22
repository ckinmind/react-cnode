import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userViewActions from '../../actions/userViewActions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { DataLoad } from '../common/index';
import Home from './Home.js';

/**
 *  个人中心页面
 */
class UserView extends Component {

    componentDidMount(){
        this.props.actions.getUserView(this.props.params.loginname);
    }


    render() {

        let  userview  = this.props.UserView;
        let { User, params} = this.props;

        let main = Object.keys(userview).length ? <Home data={userview} /> : <DataLoad />;

        /* 只有是登录用户的个人页面才会显示底部导航栏*/
        let footer = params.loginname == User.loginname ? <Footer index="3" /> : null;

        let mode = '';
        let title = '';
        if(params.loginname == User.loginname){
            mode = 'userview-loginuser';
            title = '个人中心';
        }else{
            mode = 'userview-normaluser';
            title = params.loginname + '的个人中心'
        }

        return (
            <div>
                <Header  mode={mode} title={title}/>
                { main }
                { footer }
            </div>
        );
    }
}


const mapStateToProps = state => ({
    User: state.User,
    UserView: state.UserView
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(userViewActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserView);