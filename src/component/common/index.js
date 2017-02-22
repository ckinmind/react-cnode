import React, { Component } from 'react';
import { Link } from 'react-router';

/**
 * (加载动画)
 */
const DataLoad = ()=> (
        <div className="data-load data-load-true">
            <div className="msg">正在加载中</div>
        </div>
);

export { DataLoad };

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
