import React, { Component } from 'react';
import { UserHeadImg } from '../common/index';
import TabList from './TabList';
import { Tool } from '../../Tool';


import './test.css';

import TabsControl from './TabsControl';





/**
 * 个人主页
 *  todo: 第一次进个人中心是没有数据的，加载过一次之后有数据了，但是如果点击别人的个人空间，会有一个短暂的从之前的个人中心切换到
 *  新的个人中心的过程，加载动画没有了，只是因为reducer中保存了上一次的数据，这个地方不太合理
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

                <TabsControl tabs={['主题','回复']}>
                    <TabList list={recent_topics} />
                    <TabList list={recent_replies} />
                </TabsControl>

                {/*<ul className="tab-nav" data-flex="box:mean">*/}
                    {/*<li onClick={ ()=>{this.setState({tabIndex:0})} } className={arrOn[0]}>主题</li>*/}
                    {/*<li onClick={ ()=>{this.setState({tabIndex:1})} } className={arrOn[1]}>回复</li>*/}
                {/*</ul>*/}
                {/*<HomeList list={recent_topics} display={arrDisplay[0]} />*/}
                {/*<HomeList list={recent_replies} display={arrDisplay[1]} />*/}

                {/*<TabsControl>*/}
                    {/*<Tab title="主题" list={ recent_topics } />*/}
                    {/*<Tab title="回复" list={ recent_replies } />*/}
                {/*</TabsControl>*/}



            </div>
        );
    }
}

export default Home;