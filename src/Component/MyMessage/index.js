import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import action from '../../Action/Index';

import { DataLoad, DataNull, Header, TipMsgSignin, Footer, GetData, UserHeadImg } from '../common/index';
import MessageList from './MessageList';


/**
 * 模块入口
 * 
 * @class Main
 * @extends {Component}
 */
class MyMessages extends Component {


    render() {
        var {data, loadAnimation, loadMsg, id, tabIndex} = this.props.state;
        var {User, params} = this.props;

        let main = null;

        if (!User) {
            main = <TipMsgSignin />
        } else if (!data) {
            main = <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        } else {
            let {hasnot_read_messages, has_read_messages} = data;
            /** 原数组这里有问题，这样合并会改变原来的hasnot_read_messages，导致每次点击数据都会变动，然后来回点击的时候，显示的消息会有跳动*/
            Array.prototype.push.apply(hasnot_read_messages, has_read_messages);
            main = <MessageList list={hasnot_read_messages} />;

            console.log('hasnot_read_messages');
            console.log(data);
            console.log(hasnot_read_messages);
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



export default GetData({
    id: 'MyMessages',  //应用关联使用的redux
    component: MyMessages, //接收数据的组件入口
    url: '/api/v1/messages', //服务器请求的地址
    stop: (props, state) => {
        return !Boolean(props.User); //true 拦截请求，false不拦截请求
    },
    data: (props, state) => { //发送给服务器的数据
        return { accesstoken: props.User.accesstoken }
    },
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});

// export default MyMessages;



/**
 * 1. 之前的bug
 * 不断点击消息，会有不断增加消息，很奇怪的问题
 *
 * */
