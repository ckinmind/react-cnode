import React, {Component} from 'react';
import { Link } from 'react-router';
import { Tool } from '../../Tool';
import { UserHeadImg } from '../common/index';
import {  hashHistory } from 'react-router';
import ReplyBox2 from './ReplyBox2';

class Reply extends Component {

    constructor(props){
        super(props);
        this.state = {
            isShowReplyBox: false,
            ups: this.props.item.ups
        };
        this.isUp = this.isUp.bind(this);
    }

    /**
     * 验证当前回复，登陆用户是否点赞
     * 即检查用户id是否在这条回复的ups数组中
     */
    isUp() {
        if(!this.props.isLoaded){
            return 'false';
        }
        let id = this.props.userID;
        return this.state.ups.indexOf(id) != '-1'
    }

    /***
     * 处理点击回复按钮的操作
     */
    handleClick() {
        let {isLoaded} = this.props;
        /** 如果没有登录则跳转登录页面*/
        if (!isLoaded) {
            hashHistory.push({pathname: '/signin',});
        }
        /** 更新ReplyBox的显示状态*/
        this.setState({
            isShowReplyBox: !this.state.isShowReplyBox
        });
    }

    /**
     * 点赞操作，最后采用手动setState的方式来更新upState，这种方式简单点，否则走store的话复杂了一点
     * replyId: 当条reply的id
     * replyLoginname: 评论者的Loginname(用于判断不是自己点赞自己)
     * upState：当前的reply的点赞状态(登录者有没有点赞这条评论，注意如果为false有两种情况，一种是未登录，一种是未点赞，但是如果未登录点赞是会跳到登录页面)
     */
    handleStarReply(replyId, replyLoginname, upState){

        this.props.starReply(replyId, replyLoginname); /* 执行点赞操作*/

        if(this.props.isLoaded){
            let newUps = '';
            if(upState){
                /** 如果已点赞，则取消赞userID*/
                newUps = this.state.ups.filter(id => id!=this.props.userID); /* 过滤当前登录用户id*/
                console.log('已点赞: '+newUps);
                this.setState({ups: newUps});
            }else{
                /** 如果未点赞，则ups中增加userID*/
                newUps = this.state.ups.slice();
                newUps.push(this.props.userID); /* 注意不要再原state上直接修改，先浅拷贝*/
                console.log('未点赞: '+newUps);
                this.setState({ ups: newUps });
            }
        }
    }


    render() {

        let {id, content, author, create_at} = this.props.item;
        let upState = this.isUp();
        let upsCount = this.state.ups.length || '';

        return (
                <li data-flex>
                    <div className="headimg" data-flex-box="0">
                        <UserHeadImg url={author.avatar_url}/>
                    </div>
                    <div className="main" data-flex-box="1">
                        <div data-flex="main:justify">
                            <Link to={'/user/' + author.loginname} className="name">{author.loginname}</Link>
                            <time data-flex-box="1">{Tool.formatDate(create_at)}</time>
                            <div className="lou">#{this.props.index + 1}</div>
                        </div>
                        <div className="content markdown-body" dangerouslySetInnerHTML={{__html: content}}></div>
                        <div className="bottom" data-flex="main:right">
                            <div className={`font font-${upState}`} onClick={this.handleStarReply.bind(this, id, author.loginname, upState) }>
                                <i className="iconfont icon-dianzan "></i>
                                <em>{ upsCount }</em>
                            </div>
                            {/*<div className="font" onClick={() => {this.props.showReplyBox(index)} }>*/}
                            <div className="font" onClick={ this.handleClick.bind(this) }>
                                <i className="iconfont icon-huifu"></i>
                            </div>
                        </div>
                        {/*<ReplyBox placeholder={`@${author.loginname}`} reLoadData={this.props.reLoadData} display={display}*/}
                        {/*loginname={author.loginname} data={{accesstoken, id: this.props.id, reply_id: id}}/>*/}
                        <ReplyBox2 display={this.state.isShowReplyBox ? 'block' : 'none' } placeholder={`@${author.loginname}`} />
                    </div>
                </li>
        );
    }

}

export default Reply;

/**
 "replies": [
 {
     "id": "5433d866e737cbe96dcef313",
     "author": {
         "loginname": "leapon",
         "avatar_url": "https://avatars.githubusercontent.com/u/4295945?v=3&s=120"
     },
     "content": "<div class=\"markdown-text\"><p>我喜欢你的写作风格</p>\n</div>",
     "ups": [
         "5404a4120256839f712590f3",
         "50f3b267df9e9fcc58452224",
         "56ce9a441739f76e1a05d3e1",
         "5697a7c169d67aff5a8353db",
         "57bfb35b100afbbc0dcc53c4",
         "5822a40fb71596cc386783e8"
     ],
     "create_at": "2014-10-07T12:11:18.981Z",
     "reply_id": null
 },
 ]
 *
 *
 * */
