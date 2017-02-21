import React from 'react';
import { Link, IndexLink } from 'react-router';

const Nav = ()=> (
        <nav className="index-nav">
            <ul data-flex="box:mean">
                <li>
                    <IndexLink to={{ pathname: '/', query: { tab: undefined } }} activeClassName="on">全部</IndexLink>
                </li>
                <li>
                    <Link to="/?tab=good" activeClassName="on">精华</Link>
                </li>
                <li>
                    <Link to="/?tab=share" activeClassName="on">分享</Link>
                </li>
                <li>
                    <Link to="/?tab=ask" activeClassName="on">问答</Link>
                </li>
                <li>
                    <Link to="/?tab=job" activeClassName="on">招聘</Link>
                </li>
            </ul>
            <div className="height"></div>
        </nav>
);

export default Nav;

/**
 *  关于IndexLink高亮的判断：
 *  因为这里的路由变化的只是？后面的参数，所以如果我不多加一个判断的话，[全部]会一直高亮
 *  暂时没找到好的解决方案更优雅的方案解决这个问题
 */

