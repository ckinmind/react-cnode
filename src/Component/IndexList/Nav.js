import React, { Component } from 'react';
import { Link } from 'react-router';

/**
 * (导航分类)
 *
 * @class Nav
 * @extends {Component}
 *
 * =============================================================
 *  @todo:
 *  1. 这里的高亮方式需要优化，根据route中的属性
 *  2. 高亮的样式应该用active去展示，不要用li中的class on, 这样代码就简化很多了
 *  =============================================================
 */
class Nav extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.tab !== nextProps.tab; //tab和之前的不一致，组件才需要更新，否则不更新，提升性能
    }

    render() {
        var setCur = {};
        setCur[this.props.tab] = 'on';
        return (
            <nav className="index-nav">
                <ul data-flex="box:mean">
                    <li className={setCur.all}>
                        <Link to="/" activeClassName="active">全部</Link>
                    </li>
                    <li className={setCur.good}>
                        <Link to="/?tab=good" activeClassName="active">精华</Link>
                    </li>
                    <li className={setCur.share}>
                        <Link to="/?tab=share" activeClassName="active">分享</Link>
                    </li>
                    <li className={setCur.ask}>
                        <Link to="/?tab=ask" activeClassName="active">问答</Link>
                    </li>
                    <li className={setCur.job}>
                        <Link to="/?tab=job" activeClassName="active">招聘</Link>
                    </li>
                </ul>
                <div className="height"></div>
            </nav>
        );
    }
}


export default Nav;