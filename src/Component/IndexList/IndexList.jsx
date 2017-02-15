import React, { Component } from 'react';
import { Link } from 'react-router';
//import { connect } from 'react-redux';
//import action from '../Action/Index';
import { Tool, merged } from '../../Tool';
import { DataLoad, Footer, UserHeadImg, TabIcon, GetNextPage } from '../common/index';
import Nav from './Nav';



/**
 * (循环列表)
 * 
 * @class List
 * @extends {Component}
 */
class List extends Component {
    render() {
        return (
            <ul className="index-list">
                {
                    this.props.list.map((item, index) => {
                        return <ListItem key={item.id} {...item} />
                    })
                }
            </ul>
        );
    }
}

/**
 * =============================================================
 *  @todo:
 *  1. 这里可以改成函数值组件，shouldComponentUpdate不需要加
 *  2. 尝试将这些组件独立出去复用，优化结构，增强可读性
 * =============================================================
 */
class ListItem extends Component {
    render() {
        let {id, title, author, visit_count, reply_count, create_at, last_reply_at} = this.props;
        return (
            <li>
                <Link to={`/topic/${id}`}>
                    <div data-flex="box:first">
                        <div className="font" data-flex="cross:center">
                            <TabIcon {...this.props} />
                        </div>
                        <h3 className="tit">{title}</h3>
                    </div>
                    <div className="bottom" data-flex="box:first">
                        <div className="author" data-flex="cross:center">
                            <UserHeadImg url={author.avatar_url} />
                        </div>
                        <div className="con" data-flex="dir:top main:center">
                            <p data-flex="cross:center box:last">
                                <span className="name">{author.loginname}</span>
                                <span className="count">{reply_count}/{visit_count}</span>
                            </p>
                            <p data-flex="cross:center box:last">
                                <time className="create">{Tool.formatDate(create_at)}</time>
                                <time className="re">{Tool.formatDate(last_reply_at)}</time>
                            </p>
                        </div>
                    </div>
                </Link>
            </li>
        );
    }
    shouldComponentUpdate(nextProps) {
        return false;
    }
}

/**
 * (导出组件)
 * 
 * @export
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var {data, loadAnimation, loadMsg} = this.props.state;
        var tab = this.props.location.query.tab || 'all';
        return (
            <div className="index-list-box">
                <Nav tab={tab} />
                {
                    data.length > 0 ? <List list={data} /> : null
                }
                <Footer index="0" />
            </div>
        );
    }
}


export default GetNextPage({
    id: 'IndexList',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/api/v1/topics',
    data: (props, state) => { //发送给服务器的数据
        var {page, limit, mdrender} = state;
        return {
            tab: props.location.query.tab || 'all',
            page,
            limit,
            mdrender
        }
    },
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});
