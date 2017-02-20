import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import starActions from '../../actions/starActions';
import replyActions from '../../actions/replyActions';
import Reply from './Reply';

/**
 * 回复列表
 *
 * @class ReList
 * @extends {Component}
 */
class ReplyList extends Component {

    render() {
        /* todo: isLoader属性的判断方法后面要改成直接能在User中获取 */
        let userProps = {
            userID: this.props.User.id,
            isLoaded: !!this.props.User.id
        };
        let { starReply } = this.props.actions;

        return (
            <ul className="re-list">
                {
                    this.props.replies.map((item, index) => (
                        <Reply key={index} item={item} index={index} {...userProps} starReply={starReply} replyTopic={this.props.actions.replyTopic}/>
                    ))
                }
            </ul>
        );
    }
}

const mapStateToProps = state => ({
    replies: state.Topic.data.replies,
    User: state.User
});

let actions = {...starActions, ...replyActions};  /* 一个是点赞的操作，一个是回复的操作*/
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReplyList);




/**
 * 1. 点赞的显示逻辑 `font font-${upState}` 两种情况
 *    1. font font-false (font-false其实无效) ：表示登陆者没有点赞的情况
 *    2. font font-true :表示登录者点赞的情况
 *  后面用classnames改写一下，增加美观
 *
 * 2. 回复列表的数据结构：
 "replies": [
 {
     "id": "5433d866e737cbe96dcef313",
     "author": {
         "loginname": "leapon",
         "avatar_url": "https://avatars.githubusercontent.com/u/4295945?v=3&s=120"
     },
     "content": "<div class=\"markdown-text\"><p>我喜欢你的写作风格</p>\n</div>",
     "ups": [
         "5404a4120256839f712590f3",
         "50f3b267df9e9fcc58452224",
         "56ce9a441739f76e1a05d3e1",
         "5697a7c169d67aff5a8353db",
         "57bfb35b100afbbc0dcc53c4",
         "5822a40fb71596cc386783e8"
     ],
     "create_at": "2014-10-07T12:11:18.981Z",
     "reply_id": null
 },
 ]
 * **/
