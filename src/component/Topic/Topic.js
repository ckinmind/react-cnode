import React, { Component } from 'react';
import { DataLoad, Header } from '../common/index';

import Article from './Article';
import { connect } from 'react-redux'
import topicActions from '../../actions/topicActions';
import replyActions from '../../actions/replyActions';
import { bindActionCreators } from 'redux';

/**
 * 模块入口
 * @class Main
 * @extends {Component}
 */
class Topic extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        /** this.props.params.id 是帖子的id，可以通过路由获得*/
        this.props.actions.fetchingTopic(this.props.params.id);
    }

   /**
    * 根据isFetching的值显示来决定显示加载动画还是文章数据
    */
    getLoadingState(){
        let { isFetching } = this.props.topic;
        return isFetching ?  <DataLoad /> : <Article data={this.props.topic.data} replyTopic={this.props.actions.replyTopic} User={this.props.User}/>;
    }

    render() {
        return (
            <div>
                <Header title="详情" leftIcon="fanhui" />
                { this.getLoadingState() }
            </div>
        );
    }
}


const mapStateToProps = state => ({
    topic: state.Topic,
    User: state.User
});

let actions = {...topicActions, ...replyActions};
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Topic);