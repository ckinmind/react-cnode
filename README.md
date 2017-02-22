# react-cnode
![](https://raw.githubusercontent.com/ckinmind/react-cnode/master/src/styles/images/screenshot.gif)

react构建的cnode社区, 在线访问：[https://ckinmind.github.io/react-cnode](https://ckinmind.github.io/react-cnode)

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
- **[v1.2]**:优化结构, 函数式组件, 设置定时器更新数据, 详细更新说明 [issue 19](https://github.com/ckinmind/react-cnode/issues/19)
- **[v1.1]**:改写所有页面, 数据更新走action-reducer, 详细更新说明 [issue 1](https://github.com/ckinmind/react-cnode/issues/1)
- **[v1.0]**:原始版本(基本同原项目)

## 如何开始
```js
> git clone https://github.com/ckinmind/react-cnode.git
> cd react-cnode
> npm install
> npm start
```

## 问题收录
- 关于componentWillReceiveProps的触发的问题(redux中) ,查看 [issue 22](https://github.com/ckinmind/react-cnode/issues/22)
- 如何判断一个空对象, 查看 [issue 15](https://github.com/ckinmind/react-cnode/issues/15)
- 关于设置定时器定时去获取数据,  查看 [issue 14](https://github.com/ckinmind/react-cnode/issues/14)
- 关于在一个异步action中无法调用另一个异步action的问题(同步action可以), 查看 [issue 12](https://github.com/ckinmind/react-cnode/issues/12)
- 关于在removeEventListener时候遇到的问题, 查看 [issue 11](https://github.com/ckinmind/react-cnode/issues/11)
- 关于导航的高亮以及类似(/?tab=a)这样的链接高亮问题, 查看 [issue 9](https://github.com/ckinmind/react-cnode/issues/9)
- 关于dangerouslySetInnerHTML的问题(直接显示html),  查看 [issue 7](https://github.com/ckinmind/react-cnode/issues/7)
- 关于原应用和改写后应用存在的问题, 查看 [issue 6](https://github.com/ckinmind/react-cnode/issues/6)
- 关于路由跳转(在组件和异步action中), 查看 [issue 5](https://github.com/ckinmind/react-cnode/issues/5)
- 关于PureComponet使用问题, 查看 [issue 3](https://github.com/ckinmind/react-cnode/issues/3)