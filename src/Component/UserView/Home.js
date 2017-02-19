import React, { Component } from 'react';
import { UserHeadImg } from '../common/index';
import HomeList from './HomeList';
import { Tool } from '../../Tool';
import { Link } from 'react-router';

/**
 * 个人主页
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
    render() {
        let { avatar_url, loginname, score, recent_topics, recent_replies, create_at } = this.props.data;
        let { tabIndex } = this.props;
        let arrDisplay = [];
        arrDisplay[tabIndex] = 'block';
        return (
            <div className="user-index">
                <div className="headimg" data-flex="dir:top main:center cross:center">
                    <UserHeadImg url={avatar_url} />
                    <div className="name">{loginname}</div>
                    <div className="score">积分：{score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册于：{Tool.formatDate(create_at)}</div>
                </div>
                <ul className="tab-nav" data-flex="box:mean">
                    <li><Link onClick={() => { this.props.tab(0) } } activeClassName="on">主题</Link></li>
                    <li><Link onClick={() => { this.props.tab(1) } } activeClassName="on">回复</Link></li>
                </ul>
                <HomeList list={recent_topics} display={arrDisplay[0]} />
                <HomeList list={recent_replies} display={arrDisplay[1]} />
            </div>
        );
    }
}

export default Home;