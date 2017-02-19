import React, { Component } from 'react';
import { UserHeadImg } from '../common/index';
import HomeList from './HomeList';
import { Tool } from '../../Tool';
import { Link, IndexLink } from 'react-router';

/**
 * 个人主页
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            tabIndex: 0
        };
    }

    render() {
        let { avatar_url, loginname, score, recent_topics, recent_replies, create_at } = this.props.data;
        let arrOn = [];
        let arrDisplay = [];
        arrOn[this.state.tabIndex] = 'on';
        arrDisplay[this.state.tabIndex] = 'block';
        return (
            <div className="user-index">
                <div className="headimg" data-flex="dir:top main:center cross:center">
                    <UserHeadImg url={avatar_url} />
                    <div className="name">{loginname}</div>
                    <div className="score">积分：{score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册于：{Tool.formatDate(create_at)}</div>
                </div>
                <ul className="tab-nav" data-flex="box:mean">
                    <li onClick={ ()=>{this.setState({tabIndex:0})} } className={arrOn[0]}>主题</li>
                    <li onClick={ ()=>{this.setState({tabIndex:1})} } className={arrOn[1]}>回复</li>
                </ul>
                <HomeList list={recent_topics} display={arrDisplay[0]} />
                <HomeList list={recent_replies} display={arrDisplay[1]} />
            </div>
        );
    }
}

export default Home;