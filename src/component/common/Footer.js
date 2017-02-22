import React from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';

/**
 * 底部导航菜单
 */
const Footer = ({loginname, MessageCount}) => (
    <footer className="common-footer">
        <div className="zhanwei"></div>
        <ul className="menu" data-flex="box:mean">
            <IndexLink to="/" activeClassName="on">
                <i className="iconfont icon-shouye"></i>首页
            </IndexLink>
            <Link to="/topic/create" activeClassName="on">
                <i className="iconfont icon-fabu"></i>发表
            </Link>

            <Link to="/my/messages" activeClassName="on">
                <i className="iconfont icon-xiaoxi"></i>消息{ MessageCount > 0 ? <em>{ MessageCount }</em> : ''}
            </Link>
            <Link to={ loginname ? '/user/' + loginname : 'siginin'} activeClassName="on">
                <i className="iconfont icon-wode"></i>我的
            </Link>
        </ul>
    </footer>
);


const mapStateToProps = state => ({
    loginname: state.User.loginname,
    MessageCount: state.Message.count
});

export default connect(mapStateToProps)(Footer);