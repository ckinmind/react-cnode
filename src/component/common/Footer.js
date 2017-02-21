import React, { PureComponent  } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import messageCountActions from '../../actions/messageCountActions';
import { bindActionCreators } from 'redux';

/**
 * 底部导航菜单
 *
 * 更改记录
 * 1. 修改高亮的方式，使用Link和IndexLink来简化
 * 2. 试用了PureComponent, 去掉了shouldComponentUpdate
 * 3. 去掉了connect里的action('User')，没有用处
 *
 */
class Footer extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            messageCount: 0
        };
    }

    componentDidMount() {
        let { isLogined } = this.props.User;
        /** 登录状态下才能发送请求获取未读消息数目 */
        if(isLogined){
            this.props.actions.getMessageCount();
        }
    }

    render() {
        let myUrl = this.props.User && this.props.User.loginname ? '/user/' + this.props.User.loginname : '/signin';
        return (
            <footer className="common-footer">
                <div className="zhanwei"></div>
                <ul className="menu" data-flex="box:mean">
                    <IndexLink to="/" activeClassName="on">
                        <i className="iconfont icon-shouye"></i>首页
                    </IndexLink>
                    <Link to="/topic/create" activeClassName="on">
                        <i className="iconfont icon-fabu"></i>发表
                    </Link>

                    <Link to="/my/messages" activeClassName="on">
                        <i className="iconfont icon-xiaoxi"></i>消息{this.props.MessageCount.count > 0 ? <em>{this.props.MessageCount.count}</em> : ''}
                    </Link>
                    <Link to={myUrl} activeClassName="on">
                        <i className="iconfont icon-wode"></i>我的
                    </Link>
                </ul>
            </footer>
        );
    }
}

const mapStateToProps = state => ({
    User: state.User,
    MessageCount:state.MessageCount
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(messageCountActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);


/**
 用了PureComponent，去掉了下面这段
 shouldComponentUpdate(np, ns) {
       //防止组件不必要的更新
        return this.props.index !== np.index || this.state.messageCount !== ns.messageCount;
    }
 */

/**
 * 获取用户消息数据，只有用户登录后有accesstoken才发送该请求
 * todo: 每次切换底部tab都要发送请求（登录后），这不是很合理需要优化
 * 优化：看能不能将Footer组件变成函数式组件，这样就能共享一个实例(函数式组件不能有state, 这个要考虑)
 *
 * todo: 可以设置一个定时器组件，定时去获取消息数目，将这个定时器放在所有页面中
 */