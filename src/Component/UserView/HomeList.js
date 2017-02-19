import React, { Component } from 'react';
import { Link } from 'react-router';
import { Tool } from '../../Tool';

/**
 * 发布的主题和回复的主题列表
 *
 * @class HomeList
 * @extends {Component}
 */

const HomeList = ({list, display})=>(
    <ul className="list" style={{ display: display }}>
        {
            list.map((item, index) => {
                let {id, title, last_reply_at} = item;
                return (
                    <li key={index}>
                        <Link data-flex="box:last" to={`/topic/${id}`}>
                            <div className="tit">{title}</div>
                            <time className>{Tool.formatDate(last_reply_at)}</time>
                        </Link>
                    </li>
                );
            })
        }
    </ul>
);


export default HomeList;
