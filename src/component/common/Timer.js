import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import messagesActions from '../../actions/messageActions';

class Timer extends Component {

    /** setInterval返回一个整数，表示定时器的编号，以后可以用来取消这个定时器*/
    componentDidMount() {
        /** 已登录才发送获取消息数目请求*/
        if(this.props.isLogined){
            this.props.getMessageCount(); /* 一开始发起一次请求*/
            this.interval = setInterval(() =>  this.props.getMessageCount(), 30000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="timer" style={{display:'none'}}></div>
        );
    }
}

const mapStateToProps = state => ({
    isLogined: state.User.isLogined
});

const mapDispatchToProps = dispatch => ({
    getMessageCount: bindActionCreators(messagesActions.getMessageCount, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
