//export const target = process.env.NODE_ENV !== 'production' ? '' : 'https://cnodejs.org'; //目标网站

// 改成这样，否则api地址不对
export const target = process.env.NODE_ENV !== 'production' ? 'https://cnodejs.org' : 'https://cnodejs.org'; //目标网站