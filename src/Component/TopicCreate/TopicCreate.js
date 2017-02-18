import React, { Component } from 'react';
import { connect } from 'react-redux';
import createTopicAction from '../../actions/createTopicAction';
import { bindActionCreators } from 'redux';
import { Tool } from '../../Tool';
import { DataLoad, DataNull, Header, TipMsgSignin, Footer, GetData } from '../common/index';
import NewTopic from './NewTopic';

/**
 * 模块入口
 * 
 * @class Main
 * @extends {Component}
 */
class TopicCreate extends Component {

    constructor(props) {
        super(props);

        /**
         * 初始化组件状态
         */
        this.state = {
            title: '',
            tab: '',
            content: '',
            accesstoken: this.props.User ? this.props.User.accesstoken : ''
        };

        this.postState = false;

        this.handleInput = {
            tabInput: (e)=> this.state.tab = e.target.value,  /** 监听用户选择发表类型 */
            titleInput: (e)=> this.state.title = e.target.value, /** 监听用户输入标题*/
            contentInput: (e)=>   this.state.content = e.target.value  /** 监听用户输入内容 */
        };

        this.submitTopic = this.submitTopic.bind(this);
    }


    /** 发表主题*/
    submitTopic() {
        var {state} = this;
        if (this.postState) return false;

        console.log(this.state);
        if (!state.tab) {
            return alert('请选择发表类型');
        } else if (state.title.length < 10) {
            return alert('标题字数10字以上');
        } else if (state.content.length < 30) {
            return alert('内容字数30字以上');
        }
        this.postState = true;

        console.log(this.state);
        // Tool.post('/api/v1/topics', this.state, (res) => {
        //     if (res.success) {
        //         this.context.router.push({
        //             pathname: '/topic/' + res.topic_id
        //         });
        //     } else {
        //         alert('发表失败');
        //         this.postState = false;
        //     }
        // }, () => {
        //     alert('发表失败');
        //     this.postState = false;
        // });

    }

    render() {
        let { User} = this.props;
        let headerSet = {};
        let main = null;
        if (!User) {
            main = <TipMsgSignin />
        } else {
            main = <NewTopic {...this.state} { ...this.handleInput } />
            headerSet = {
                rightIcon: 'fabu',
                submitTopic: this.submitTopic
            };
        }
        return (
            <div>
                <Header title="发表话题" {...headerSet} />
                {main}
                <Footer index="1" />
            </div>
        );
    }

}

TopicCreate.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    User: state.User
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(createTopicAction, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TopicCreate); //连接redux