import React, { Component } from 'react';
import { Link } from 'react-router';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, TabIcon, GetData } from '../common/index';
import ReList from './ReList';
import ReplyBox from './ReplyBox';
import { Tool } from '../../Tool';

/**
 * 文章主体部分
 *
 * @class Article
 * @extends {Component}
 */
class Article extends Component {
    constructor(props) {
        super(props);
    }

    /** 获取底部的评论框, 登录了显示评论框, 没登陆显示未登录信息*/
    getBottom(){
        console.log(this.props.User);
        if(this.props.User.accesstoken) {
            let {id} =  this.props.state.data;
            return <ReplyBox reLoadData={this.props.reLoadData} data={{accesstoken: this.props.User.accesstoken, id}}/>;
        } else{
            return  <TipMsgSignin />;
        }
    }


    render() {
        let {id, title, create_at, visit_count, reply_count, content, replies, author} = this.props.state.data;

        return (
            <div className="topic">
                <div className="user" data-flex>
                    <div className="headimg" data-flex-box="0">
                        <UserHeadImg url={author.avatar_url} />
                    </div>
                    <div className="data" data-flex="dir:top" data-flex-box="1">
                        <div data-flex="main:justify">
                            <Link to={'/user/' + author.loginname} className="name">{author.loginname}</Link>
                            <time data-flex-box="1">{Tool.formatDate(create_at)}</time>
                            <div className="lou">#楼主</div>
                            <div className="font" data-flex="main:center cross:center"><TabIcon {...this.props.state.data} /></div>
                        </div>
                        <div className="qt" data-flex>
                            <div>阅读：{visit_count}</div>
                            <div>回复：{reply_count}</div>
                        </div>
                    </div>
                </div>
                <h2 className="tit2">{title}</h2>
                <div className="content markdown-body" dangerouslySetInnerHTML={{__html: content}} ></div>
                <h3 className="tit3">共<em>{replies.length}</em>条回复</h3>

                <ReList reLoadData={this.props.reLoadData} id={id} list={replies} clickZan={this.props.clickZan} showReplyBox={this.props.showReplyBox} User={this.props.User} />

                { this.getBottom() }
            </div>
        );
    }
}

export default Article;