import React, { Component } from 'react';


class NewTopic extends Component {
    render() {
        return (
            <div className="topic-create">
                <div className="item">
                    <select name="tab" defaultValue={this.props.tab} onInput={this.props.tabInput}>
                        <option value="">请选择发表类型</option>
                        <option value="share">分享</option>
                        <option value="ask">问答</option>
                        <option value="job">招聘</option>
                    </select>
                </div>
                <div className="item">
                    <input type="text" defaultValue={this.props.title} onInput={this.props.titleInput} placeholder="标题字数 10 字以上" />
                </div>
                <div className="item">
                    <textarea defaultValue={this.props.content} onInput={this.props.contentInput} placeholder="内容字数 30 字以上"></textarea>
                </div>
            </div>
        );
    }
}

export default NewTopic;
