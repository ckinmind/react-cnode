import React, { Component } from 'react';
import { Link } from 'react-router';
import { Tool } from '../../Tool';
import { UserHeadImg } from '../common/index';

/**
 * 消息内容
 *
 * @class Content
 * @extends {Component}
 */
class MessageList extends Component {

    render() {
        var list = this.props.list;
        return (
            <div className="msg-box">
                <ul className="list">
                    {
                        list.map((item, index) => {
                            var {type, author, topic, reply, has_read} = item;
                            var content = null;

                            if (type == 'at') {
                                content = <div>在话题<Link to={`/topic/${topic.id}`}>{topic.title}</Link>中 @了你</div>;
                            } else {
                                content = <div>回复你了的话题<Link to={`/topic/${topic.id}`}>{topic.title}</Link></div>
                            }
                            return (
                                <li data-flex="box:first" key={index}>
                                    <Link className="user" to={`/user/${author.loginname}`}>
                                        <UserHeadImg url={author.avatar_url} />
                                    </Link>
                                    <div>
                                        <div className="name">{author.loginname}<time>{Tool.formatDate(reply.create_at)}</time></div>
                                        <div data-flex="box:first">
                                            <div data-flex="cross:center"><div className={`dian-${has_read}`}></div></div>
                                            {content}
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}


export default MessageList;