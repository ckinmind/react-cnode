import React, { Component } from 'react';
import ReplyBox from './ReplyBox';
import { Link } from 'react-router';
import { Tool } from '../../Tool';
import { UserHeadImg } from '../common/index';

/**
 * 回复列表
 *
 * @class ReList
 * @extends {Component}
 */
class ReList extends Component {
    constructor(props) {
        super(props);

        /**
         * 验证回复项目是否点赞
         *
         * @param {Array} arr
         * @returns
         */
        this.isUp = (arr) => {
            var id = this.props.User ? this.props.User.id : '';
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === id) return true;
            }
            return false;
        }

    }
    render() {
        let accesstoken = this.props.User ? this.props.User.accesstoken : '';

        return (
            <ul className="re-list">
                {
                    this.props.list.map((item, index) => {
                        let {id, content, author, ups, create_at, display = 'none'} = item;
                        let at = new Date(create_at);
                        let upState = this.isUp(ups);


                        return (
                            <li key={index} data-flex>
                                <div className="headimg" data-flex-box="0">
                                    <UserHeadImg url={author.avatar_url} />
                                </div>
                                <div className="main" data-flex-box="1">
                                    <div data-flex="main:justify">
                                        <Link to={'/user/' + author.loginname} className="name">{author.loginname}</Link>
                                        <time data-flex-box="1">{Tool.formatDate(create_at)}</time>
                                        <div className="lou">#{++index}</div>
                                    </div>
                                    <div className="content markdown-body" dangerouslySetInnerHTML={{  __html: content }}></div>
                                    <div className="bottom" data-flex="main:right">
                                        <div className={`font font-${upState}`} onClick={() => { this.props.clickZan(id, index, author.loginname); } }>
                                            <i className="iconfont icon-dianzan "></i>
                                            <em>{ups.length ? ups.length : ''}</em>
                                        </div>
                                        <div className="font" onClick={() => { this.props.showReplyBox(index) } }>
                                            <i className="iconfont icon-huifu"></i>
                                        </div>
                                    </div>
                                    <ReplyBox placeholder={`@${author.loginname}`} reLoadData={this.props.reLoadData} display={display} loginname={author.loginname} data={{ accesstoken, id: this.props.id, reply_id: id }} />
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

export default ReList;