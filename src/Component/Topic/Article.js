import React, { Component } from 'react';
import { Link } from 'react-router';
import { TipMsgSignin, UserHeadImg, TabIcon } from '../common/index';
import ReplyList from './ReplyList';
import ReplyBox from './ReplyBox';
import { Tool } from '../../Tool';

/**
 * 文章主体部分
 *
 * todo: 可以取消Topic外边包的容器组件，改为在Article外边设置容器组件，这样取数据方便，但是Topic中判断用户登录怎么办
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
        if(this.props.User.accesstoken) {
            return <ReplyBox replyTopic={this.props.replyTopic} isBottom={true} />;
        } else{
            return  <TipMsgSignin />;
        }
    }


    render() {
        let { title, create_at, visit_count, reply_count, content, replies, author} = this.props.data;
        let { tab, good, top } = this.props.data;

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
                            <div className="font" data-flex="main:center cross:center">
                                <TabIcon icon = {{tab, good, top}} />
                            </div>
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

                <ReplyList />
                { this.getBottom() }
            </div>
        );
    }
}

export default Article;

/**
 * data的结构类似这样
 * "data": {
        "id": "587f0a395d4612c33919e7db",
        "author_id": "580327f4487e1e4578afb55e",
        "tab": "ask",
        "content": "<div class=\"markdown-text\">......</div>",
        "title": "express中CSS等静态资源取不到",
        "last_reply_at": "2017-02-13T13:53:40.281Z",
        "good": false,
        "top": false,
        "reply_count": 5,
        "visit_count": 388,
        "create_at": "2017-01-18T06:24:57.986Z",
        "author": {
            "loginname": "HuKaihe",
            "avatar_url": "https://avatars.githubusercontent.com/u/16102897?v=3&s=120"
        },
        "replies": [
            {
                "id": "587f0ef35d4612c33919e7dd",
                "author": {
                    "loginname": "fengzq3",
                    "avatar_url": "https://avatars.githubusercontent.com/u/16486200?v=3&s=120"
                },
                "content": "<div class=\"markdown-text\"><p>如果app.js里面没有static配置的话，访问这个路径需要配置路由的（router），你可以试试path</p>\n</div>",
                "ups": [],
                "create_at": "2017-01-18T06:45:07.244Z",
                "reply_id": null
            },
          ......
        ],
        "is_collect": false
    }
 *
 *
 * **/