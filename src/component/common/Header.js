import React, { Component  } from 'react';
import { Link } from 'react-router';

/**
 * 公共头部
 *
 * @export
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
    render() {
        let {title, leftTo, leftIcon, rightTo, rightIcon, rightClick } = this.props;
        let left = null;

        if (leftTo && leftIcon) {
            left = (
                <Link to={leftTo}>
                    <i className={'iconfont icon-' + leftIcon}></i>
                </Link>
            );
        } else if (leftIcon === 'fanhui') { //返回上一页
            left = (
                <a onClick={this.context.router.goBack}>
                    <i className={'iconfont icon-' + leftIcon}></i>
                </a>
            );
        }

        let right = null;
        if (rightTo && rightIcon) {
            right = (
                <Link to={rightTo}>
                    <i className={'iconfont icon-' + rightIcon}></i>
                </Link>
            );
        } else if (rightClick && rightIcon) {
            right = (
                <div onClick={rightClick}>
                    <i className={'iconfont icon-' + rightIcon}></i>
                </div>
            );
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

Header.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Header;