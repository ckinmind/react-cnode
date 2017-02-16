import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DataLoad, Footer, UserHeadImg, TabIcon, GetNextPage } from '../common/index';
import Nav from './Nav';
import ListItem from './ListItem';
import indexActions from '../../actions/indexActions';


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
        console.log('componentWillReceiveProps');

        let { tab = 'all' } = nextProps.location.query;

        console.log('this.tab: '+this.tab);
        console.log('nextProps.tab: '+ tab);

        if(tab != this.tab){
            console.log('tab not same');
            this.tab = tab;
            this.page = 1; /* 将当前page重置为1, 因为切换到了新的栏目，todo: 后期如果做了缓存，这块处理逻辑要变 */
            this.props.actions.fetchingIndex(this.tab, this.page);
        }
    }

    _handleScroll(){
        // console.log('一屏高度 clientHeight: '+ document.documentElement.clientHeight); //一屏高度
        // console.log('滚动的高度 scrollTop: '+ document.body.scrollTop);    // 滚动的距离
        // console.log('文档总高度 scrollHeight: '+ document.body.scrollHeight);    // 文档总高度

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


    /**
     * 获取列表数据
     */
    getList(){
        let { data } = this.props.List;
        if( data.length){
            return  data.map((item, index) => <ListItem key={item.id} {...item} />)
        }else{
            return null;
        }
    }


    render() {
        console.log('indexlist render');
        let { isFetching } = this.props.List;
        console.log('isFetching: '+isFetching);

        return (
            <div>
                <div className="index-list-box">
                    <Nav />
                    <ul className="index-list">
                        { this.getList() }
                    </ul>
                    <Footer index="0" />
                </div>

                <div style={{display: isFetching ? 'block' : 'block'}}>
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
 *
 * */