import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import indexActions from '../../actions/indexActions';
import { DataLoad} from '../common/index';
import Footer from '../common/Footer';
import ListItem from './ListItem';
import Nav from './Nav';


/**
 *  首页
 */
class IndexList extends Component {
    constructor(props) {
        super(props);
        this.tab = props.location.query.tab || 'all'; /* 获取初始化的当前tab */
        this.page = 1 ;
        this._handleScroll = this._handleScroll.bind(this);
    }

    componentWillMount(){
        /** 根据tab加载第一页的数据，todo: 后期考虑做缓存，不需要每次都要请求新数据，可以在action中处理，在state树中存储页码*/
        this.props.actions.fetchingIndex(this.tab, 1);
    }

    /** 在切换tab的时候加载新数据*/
    componentWillReceiveProps(nextProps){

        let { tab = 'all' } = nextProps.location.query;

        if(tab != this.tab){
            this.tab = tab;
            this.page = 1; /* 将当前page重置为1, 因为切换到了新的栏目，todo: 后期如果做了缓存，这块处理逻辑要变 */
            this.props.actions.fetchingIndex(this.tab, this.page);
        }
    }

    _handleScroll(){
        const screenHeight = document.documentElement.clientHeight; //一屏高度
        let scrollTop =  document.body.scrollTop; // 滚动的距离
        let documentHeight = document.body.scrollHeight;  // 文档总高度
        if( documentHeight == screenHeight + scrollTop){
            this.page++;
            this.props.actions.fetchingIndex(this.tab, this.page);
        }
    }

    componentDidMount(){
        window.addEventListener('scroll', this._handleScroll);
    }

    /** 组件销毁后必要的清理*/
    componentWillUnmount(){
        window.removeEventListener('scroll', this._handleScroll)
    }

    render() {
        let { isFetching, data } = this.props.List;

        return (
            <div>
                <div className="index-list-box">
                    <Nav />
                    <ul className="index-list">
                        { data.map(item => <ListItem key={item.id} {...item} />) }
                    </ul>
                    <Footer index="0" />
                </div>

                <div style={{display: isFetching ? 'block' : 'none'}}>
                    <DataLoad />
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => ({
    List: state.List,
    User: state.User
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(indexActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexList);


/**
 * 1. 关于加载
 *    在tab切换的时候没有加载动画，如果需要有加载动画，则需要两个<DataLoad />组件，一个上部用于tab切换时的加载动画，一个下部用于加载更多当前tab内容
 *    可以查看hackernews-raect中也是两个加载动画
 *
 * */