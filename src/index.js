import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import route from './Route'; //路由配置
import reducer from './Reducer/rootReducer';


import 'normalize.css';                    /* 重置浏览器默认样式 */
import 'flex.css';                         /* flex布局 */
import './styles/style.less';              /* 加载公共样式 */
import './styles/Iconfont/iconfont.css';   /* 字体图标 */
import 'github-markdown-css';              /* markdown css */


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
