import React, { Component } from 'react';
import { Link } from 'react-router';
// import { connect } from 'react-redux';
// import action from '../../Action/Index';
// import { Tool, merged } from '../../Tool';
// import GetData from './GetData';
// import GetNextPage from './GetNextPage';
import Footer from './Footer';
import Header from './Header';

// export { GetData, GetNextPage }
export { Footer, Header }
/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
export class DataLoad extends Component {
    render() {
        let {loadAnimation, loadMsg} = this.props;
        return (
            <div className={'data-load data-load-' + loadAnimation}>
                <div className="msg">{loadMsg}</div>
            </div>
        );
    }
}

DataLoad.defaultProps = {
    loadAnimation: true, //默认显示加载动画
    loadMsg: '正在加载中'
};


/**
 * 暂无记录
 *
 * @export
 * @class DataNull
 * @extends {Component}
 */
export class DataNull extends Component {
    render() {
        return (
            <div>暂无记录</div>
        );
    }
}


/**
 * 提示登录
 *
 * @export
 * @class TipMsgSignin
 * @extends {Component}
 */
export class TipMsgSignin extends Component {
    render() {
        return (
            <div className="tip-msg-signin">
                你还未登录，请先<Link to="/signin">登录</Link>
            </div>
        );
    }
}

/**
 * 用户头像
 *
 * @export
 * @class UserHeadImg
 * @extends {Component}
 */
export class UserHeadImg extends Component {
    render() {
        return (<div className="user-headimg" style={{ backgroundImage: 'url(' + this.props.url + ')' }}></div>)
    }
}

/**
 * 生成主题类型小图标
 *
 * 显示右侧的icon信息：
 *  tab： job, ask, share, good
 *  good: 是否是精华
 *  top:  是否指定
 *
 *  优先显示top(指定)，good(精华)，其他tab
 */
export const TabIcon = ({icon})=> (
    <i className={'iconfont icon-' + (icon.top ? 'top' : ( icon.good ? 'good' : icon.tab))}></i>
);
