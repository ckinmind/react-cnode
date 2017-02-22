import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createTopicAction from '../../actions/createTopicAction';
import { TipMsgSignin } from '../common/index';
import Header from '../common/Header';
import Footer from '../common/Footer';
import TopicForm from './TopicForm';

/**
 * 模块入口
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
            isSubmitting: false ,
            title: '',
            tab: '',
            content: ''
        };

        this.handleInput = {
            tabInput: (e)=> this.state.tab = e.target.value,  /** 监听用户选择发表类型 */
            titleInput: (e)=> this.state.title = e.target.value, /** 监听用户输入标题*/
            contentInput: (e)=>   this.state.content = e.target.value  /** 监听用户输入内容 */
        };

        this.submitTopic = this.submitTopic.bind(this);
    }

    /** 发表主题*/
    submitTopic() {
        /* 注意这里的写法*/
        this.props.createTopic(this.state);
    }

    render() {
        let { isLogined} = this.props.User;
        let main = null;
        if (!isLogined) {
            main = <TipMsgSignin />
        } else {
            main = <TopicForm {...this.state} { ...this.handleInput } />;
        }
        return (
            <div>
                <Header mode={ isLogined ? 'topic-create-login' : 'topic-create-nologin'} handleClick={this.submitTopic} />
                {main}
                <Footer index="1" />
            </div>
        );
    }

}

const mapStateToProps = state => ({
    User: state.User
});

const mapDispatchToProps = dispatch => ({
    createTopic: bindActionCreators(createTopicAction, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TopicCreate);