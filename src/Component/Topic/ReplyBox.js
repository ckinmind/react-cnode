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
        this.state = { btnname: '回复' };

        /**
         * 提交回复
         *
         * @returns
         */
        this.submit = () => {
            this.state = { btnname: '提交中...' };
            var data = this.props.data;
            if (data.reply_id) {
                data.content = `[@${this.props.loginname}](/user/${this.props.loginname}) ${this.refs.content.value}`;
            } else {
                data.content = this.refs.content.value;
            }
            if (data.content == '') {
                return alert('回复内容不能为空！');
            }
            data.content += '\n\r<br><br>来自<a href="https://lzxb.github.io/react-cnode/" target="_blank">react-cnode手机版</a>';
            Tool.post(`/api/v1//topic/${data.id}/replies`, data, (res) => {
                this.setState({ btnname: '回复成功，刷新页面中..' });
                this.refs.content.value = '';
                Tool.get(`/api/v1//topic/${data.id}`, {}, (res) => {
                    this.props.reLoadData(res.data); //刷新页面
                    this.setState({ btnname: '回复' });
                }, () => {
                    this.state = { btnname: '刷新失败，请手动刷新试试' }
                });

            }, (res) => {
                this.setState({ btnname: '回复失败' });
            });
        }

    }
    render() {
        return (
            <div className="reply-box" style={{ display: this.props.display }}>
                <div className="text">
                    <textarea ref="content" placeholder={this.props.placeholder}></textarea>
                </div>
                <div data-flex="main:right">
                    <button className="btn" onClick={this.submit}>{this.state.btnname}</button>
                </div>
            </div>
        );
    }
}

ReplyBox.defaultProps = {
    display: 'block',
    placeholder: '回复支持Markdown语法,请注意标记代码'
};
ReplyBox.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ReplyBox;