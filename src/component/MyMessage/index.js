import React, {Component} from 'react';
import messageAction from '../../actions/messageActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DataLoad, Header, TipMsgSignin, Footer} from '../common/index';
import MessageList from './MessageList';


/**
 * 个人消息页
 */
class MyMessages extends Component {

    /** todo: 流程需要优化一下，两边都要判断是否已登录这不太合理*/
    componentWillMount() {
        if (this.props.User.isLogined) {
            this.props.actions.fetchingMessage();
        }
    }

    render() {

        let {User, Message} = this.props;
        let {data, isFetching} = Message;

        let main = '';

        /** 未登录显示提示页面； 已登录加载中，显示加载动画；已登录且加载结束显示数据页面(数据可为空) */
        if (!User.isLogined) {
            main = <TipMsgSignin />
        } else if (isFetching) {
            main = <DataLoad />;
        } else {
            let {hasnot_read_messages, has_read_messages} = data;
            let messageList = [];
            if (Object.keys(data).length) {
                /** 当data非空的时候才进行合并操作*/
                messageList = [...hasnot_read_messages, ...has_read_messages];
            }
            main = <MessageList list={messageList}/>;
        }

        return (
            <div>
                <Header title="消息"/>
                {main}
                <Footer index="2"/>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    Message: state.Message,
    User: state.User
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(messageAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyMessages);
