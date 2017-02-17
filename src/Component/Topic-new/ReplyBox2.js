import React, { Component } from 'react';
import { Tool } from '../../Tool';

/**
 * 回复框
 *
 * @class ReplyBox
 * @extends {Component}
 */
class ReplyBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            btnname: '回复',
            display: this.props.display
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.display != this.state.display){
            this.setState({
                display: nextProps.display
            });
        }
    }

    handleReply(){
        let content = this.refs.textarea.value;
        /** 有@符号表示是对别人的回复，则最终内容需要加上@用户名*/
        if(this.props.placeholder.indexOf('@') != -1){
            content = `${this.props.placeholder} `+ content;
        }
        let replyId = this.props.replyId;
        this.props.replyTopic(content, replyId);

        /** todo: 这里回复成功后需要做一些清理工作，比如清除原来的输入内容，然后如果不是底部的回复框还需要收起来，这里需要注意display的来源*/

        this.refs.textarea.value = '';
        if(!this.props.isBottom){
            this.setState({
                display: 'none'
            });
        }

    }


    render() {
        return (
            <div className="reply-box" style={{ display: this.state.display }}>
                <div className="text">
                    <textarea ref="textarea" placeholder={this.props.placeholder}></textarea>
                </div>
                <div data-flex="main:right">
                    <button className="btn" onClick={ this.handleReply.bind(this) }>{this.state.btnname}</button>
                </div>
            </div>
        );
    }
}

ReplyBox.defaultProps = {
    isBottom: false,  /* 是否是底部的回复框*/
    replyId: '',
    display: 'block',
    placeholder: '回复支持Markdown语法,请注意标记代码'
};
ReplyBox.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ReplyBox;