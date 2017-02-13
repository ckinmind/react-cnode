import React, { Component } from 'react';
import { Tool } from '../../Tool';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, TabIcon, GetData } from '../common/index';

import Article from './Article';


/**
 * 模块入口
 * 
 * @class Main
 * @extends {Component}
 */
class Topic extends Component {
    constructor(props) {
        super(props);

        /**
         * 点赞或取消赞
         * 
         * @param {String} id
         * @param {Number} index
         * @param {String} loginname
         */
        this.clickZan = (id, index, loginname) => {
            var accesstoken = this.props.User ? this.props.User.accesstoken : '';
            var uid = this.props.User ? this.props.User.id : '';
            if (!accesstoken) {
                return this.context.router.push({ pathname: '/signin' }); //跳转到登录
            } else if (this.props.User.loginname === loginname) {
                return alert('你不能给自己点赞');
            }

            Tool.post(`/api/v1/reply/${id}/ups`, { accesstoken }, (res) => {
                var ups = this.props.state.data.replies[index - 1].ups;
                if (res.action == 'down') { //取消点赞
                    for (let i = 0; i < ups.length; i++) {
                        if (ups[i] === uid) {
                            ups.splice(i, 1);
                        };
                    }
                } else {
                    ups.push(uid);
                }
                this.props.setState(this.props.state);
            });
        }

        /**
         * 显示回复框
         * 
         * @param {String} index
         */
        this.showReplyBox = (index) => {
            var accesstoken = this.props.User ? this.props.User.accesstoken : '';
            if (!accesstoken) {
                return this.context.router.push({ pathname: '/signin' }); //跳转到登录
            }
            --index;
            if (this.props.state.data.replies[index].display === 'block') {
                this.props.state.data.replies[index].display = 'none';
            } else {
                this.props.state.data.replies[index].display = 'block';
            }

            this.props.setState(this.props.state);
        }
        /**
         * 回复成功后，重新加载数据
         * 
         * @param {Object} data
         */
        this.reLoadData = (data) => {
            this.props.state.data = data;
            this.props.setState(this.props.state);
        }

    }
    render() {
        var {data, loadAnimation, loadMsg, id} = this.props.state;
        var main = data ? <Article {...this.props} reLoadData={this.reLoadData} clickZan={this.clickZan} showReplyBox={this.showReplyBox} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return (
            <div>
                <Header title="详情" leftIcon="fanhui" />
                {main}
            </div>
        );
    }
}
Topic.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export default GetData({
    id: 'Topic',  //应用关联使用的redux
    component: Topic, //接收数据的组件入口
    url: (props, state) => {
        return '/api/v1/topic/' + (props.params.id || '');
    },
    data: (props, state) => { //发送给服务器的数据
        var accesstoken = props.User ? props.User.accesstoken : '';
        return { mdrender: state.mdrender, accesstoken }
    },
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});