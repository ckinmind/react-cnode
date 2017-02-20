# react-cnode


## 技术栈
- `React` with ES6
- `redux` for predictable state
- `redux-thunk` for middleware
- `fetch` for request

## 项目说明
- 本项为学习项目, 原项目地址：[react-cnode](https://github.com/lzxb/react-cnode)
- 原项目虽然应用了redux, 但是数据似乎没有很好的通过action-reducer进行更新
- 本项目对原项目的数据处理流程进行了基本上全部的改写
- 原项目使用flex布局, 通过`data-`的方式来使样式生效, 这种巧妙的方式可以避免CSS样式污染的问题

## 版本更新(查看Branch / Tags)
- **[v1.1]**:改写所有页面, 数据更新走action-reducer, 详细更新说明 [issue 1](https://github.com/ckinmind/react-cnode/issues/1)
- **[v1.0]**:原始版本(基本同原项目)