import React, { Component  } from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';

/**
 * 公共头部
 */
class Header extends Component {
    render() {
        let { mode, handleClick, title=''} = this.props;
        let left = null;
        let right = null;

        switch (mode) {
            case 'signin':
                left = <Link onClick={hashHistory.goBack}><i className="iconfont icon-fanhui"></i></Link>;
                title = '登录';

                break;
            case 'signout':
                left = <Link onClick={hashHistory.goBack}><i className="iconfont icon-fanhui"></i></Link>;
                title = '退出';

                break;
            case 'topic-create-nologin':
                title = '发表话题';

                break;
            case 'topic-create-login':
                title = '发表话题';
                right = <Link onClick={handleClick}><i className="iconfont icon-fabu"></i></Link>;

                break;
            case 'mymessage':
                title = '消息';

                break;
            case 'userview-loginuser':
                /* 备注：title值为传入值 */
                right = <Link to='signout'><i className="iconfont icon-tuichu"></i></Link>;

                break;
            case 'userview-normaluser':
                /* 备注：title值为传入值 */
                left = <Link onClick={hashHistory.goBack}><i className="iconfont icon-fanhui"></i></Link>;

                break;
            case 'topic':
                title = '详情';
                left = <Link onClick={hashHistory.goBack}><i className="iconfont icon-fanhui"></i></Link>;

                break;
            default:
        }

        return (
            <header className="common-header" data-flex>
                <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
                    {left}
                </div>
                <h2 className="title" data-flex-box="1">{title}</h2>
                <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
                    {right}
                </div>
            </header>
        );
    }
}

export default Header;