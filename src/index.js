import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import route from './Config/Route'; //路由配置

/** ****************************************************/
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './Reducer/Index';
//import store from './Config/Store';
/** ****************************************************/

//css样式
import 'normalize.css'; //重置浏览器默认样式
import 'flex.css'; //flex布局
import './Style/style.less'; //加载公共样式
import './Iconfont/iconfont.css'; //字体图标
import 'github-markdown-css'; //markdown css

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.getElementById('app')
);
