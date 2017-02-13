

/**
 * 处理单篇文章的信息reducer
 * 两种方式：
 * 1. 请求过的文章做一个缓存，如果已有缓存就直接返回缓存的结果
 * 2. 每次都当作是新请求，不做缓存
 *
 * 暂时选择第二种，简单一点
 */


const topicInitState = {
    isFetching: true,
    data: {
      /*  一个帖子的数据结构大致如下：
        id: "587f0a395d4612c33919e7db",
        author_id: "580327f4487e1e4578afb55e",
        tab: "ask",
        content: "<div class=\"markdown-text\">.....</div>",
        title: "express中CSS等静态资源取不到",
        last_reply_at: "2017-02-13T13:53:40.281Z",
        good: false,
        top: false,
        reply_count: 5,
        visit_count: 299,
        create_at: "2017-01-18T06:24:57.986Z",
        author: {
            "loginname": "HuKaihe",
            "avatar_url": "https://avatars.githubusercontent.com/u/16102897?v=3&s=120"
        },
        replies: [],
        is_collect: false, */
    }
};

const Topic = (state = topicInitState, action) => {

    switch (action.type) {
        case 'topic/BEGIN_FETCHING_TOPIC':
            return { ...state, isFetching:true };

        case 'topic/DONE_FETCHING_TOPIC':
            console.log('TopicReducer');
            console.log(action);
            return { isFetching:false, data: action.data };

        case 'topic/FAIL_FETCHING_TOPIC':
            return { ...state, isFetching:false };

        default:
            return state;
    }

};



export default Topic;