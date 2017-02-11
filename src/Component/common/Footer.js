import React, { Component, PureComponent  } from 'react';
import { Tool } from '../../Tool';
import { connect } from 'react-redux';
import action from '../../Action/Index';
import { Link, IndexLink } from 'react-router';

/**
 * 底部导航菜单
 *
 * 更改记录
 * 1. 修改高亮的方式，使用Link和IndexLink来简化
 * 2. 试用了PureComponent, 去掉了shouldComponentUpdate
 * 3. 去掉了connect里的action('User')，没有用处
 */
class Footer extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            messageCount: 0
        };
    }

    /**
     * 获取用户消息数据，只有用户登录后有accesstoken才发送该请求
     * todo: 每次切换底部tab都要发送请求（登录后），这不是很合理需要优化
     * 优化：看能不能将Footer组件变成函数式组件，这样就能共享一个实例(函数式组件不能有state, 这个要考虑)
     */
    getMessageCount() {
        let accesstoken = this.props.User ? this.props.User.accesstoken : '';
        if (accesstoken) {
            Tool.get('/api/v1/message/count', {accesstoken}, (res) => {
                this.setState({
                    messageCount: res.data
                });
            });
        }
    }

    componentDidMount() {
        this.getMessageCount();
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
                        <i className="iconfont icon-xiaoxi"></i>消息{this.state.messageCount > 0 ? <em>{this.state.messageCount}</em> : ''}
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
    User: state.User
});


export default connect(mapStateToProps)(Footer);


/**
 用了PureComponent，去掉了下面这段
 shouldComponentUpdate(np, ns) {
       //防止组件不必要的更新
        return this.props.index !== np.index || this.state.messageCount !== ns.messageCount;
    }
 */