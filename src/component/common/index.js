import React from 'react';
import {Link} from 'react-router';

/** 加载动画*/
const DataLoad = () => (
    <div className="data-load data-load-true">
        <div className="msg">正在加载中</div>
    </div>
);

/** 暂无记录 */
const DataNull = () => (
    <div>暂无记录</div>
);


/** 提示登录 */
const TipMsgSignin = () => (
    <div className="tip-msg-signin">
        你还未登录，请先<Link to="/signin">登录</Link>
    </div>
);


/** 用户头像*/
const UserHeadImg = ({url}) => (
    <div className="user-headimg" style={{backgroundImage: `url(${url})`}}></div>
);


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
const TabIcon = ({icon}) => (
    <i className={'iconfont icon-' + (icon.top ? 'top' : ( icon.good ? 'good' : icon.tab))}></i>
);

export {DataLoad, DataNull, TipMsgSignin, UserHeadImg, TabIcon};