import React, {Component} from 'react';
import {Link} from 'react-router';
import {Tool} from '../../Tool';
import {UserHeadImg} from '../common/index';

class Reply extends Component {


    /**
     * 验证当前回复，登陆用户是否点赞
     * 即检查用户id是否在这条回复的ups数组中
     */
    isUp() {
        if(this.props.isLoaded){
            return 'false';
        }
        let { ups } = this.props.item;
        let id = this.props.userID;
        return ups.indexOf(id) != '-1'
    }

    handleClick(){
        console.log('handleClick');
    }

    render() {

        let {id, content, author, ups, create_at} = this.props.item;
        let upState = this.isUp();
        let upsCount = ups.length ? ups.length : '';

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
                            <div className={`font font-${upState}`} onClick={this.props.starReply.bind(this,id) }>
                                <i className="iconfont icon-dianzan "></i>
                                <em>{ upsCount }</em>
                            </div>
                            <div className="font" onClick={() => {
                                this.props.showReplyBox(index)
                            } }>
                                <i className="iconfont icon-huifu"></i>
                            </div>
                        </div>
                        {/*<ReplyBox placeholder={`@${author.loginname}`} reLoadData={this.props.reLoadData} display={display}*/}
                        {/*loginname={author.loginname} data={{accesstoken, id: this.props.id, reply_id: id}}/>*/}
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
