import React, { Component } from 'react';
import messageAction from '../../actions/messageActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DataLoad, Header, TipMsgSignin, Footer } from '../common/index';
import MessageList from './MessageList';


/**
 * 模块入口
 * @class Main
 * @extends {Component}
 */
class MyMessages extends Component {

    /** todo: 流程需要优化一下，两边都要判断是否已登录这不太合理*/
    componentDidMount(){
        if(this.props.User.accesstoken){
            this.props.actions.fetchingMessage();
        }
    }

    render() {

        let { User, Message } = this.props;
        let { data } = Message;

        let main = '';

        /** 这里判断条件要改，User最后要加isLoaded属性*/
         if (!User.accesstoken) {
             main = <TipMsgSignin />
         } else if (Object.keys(data).length === 0) {   /* 注意判断空对象的方法*/
             main = <DataLoad />;
         } else {
            let {hasnot_read_messages, has_read_messages} = data;
            let messageList = [...hasnot_read_messages, ...has_read_messages];
            main = <MessageList list={messageList} />;
        }

        return (
            <div>
                <Header title="消息" />
                {main}
                <Footer index="2" />
            </div>
        );
    }
}



// export default GetData({
//     id: 'MyMessages',  //应用关联使用的redux
//     component: MyMessages, //接收数据的组件入口
//     url: '/api/v1/messages', //服务器请求的地址
//     stop: (props, state) => {
//         return !Boolean(props.User); //true 拦截请求，false不拦截请求
//     },
//     data: (props, state) => { //发送给服务器的数据
//         return { accesstoken: props.User.accesstoken }
//     },
//     success: (state) => { return state; }, //请求成功后执行的方法
//     error: (state) => { return state } //请求失败后执行的方法
// });


const mapStateToProps = state => ({
    Message: state.Message,
    User: state.User
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(messageAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyMessages);
