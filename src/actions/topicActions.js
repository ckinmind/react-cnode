
/** 加载topic的action*/
let topicActions = {

        /** 加载topic异步操作*/
        fetchingTopic: function(topicId){

            return function(dispatch){
                /** 开始加载*/
                dispatch(topicActions.beginFetchingTopic());

                fetch(`https://cnodejs.org/api/v1/topic/${topicId}`)
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) {
                            dispatch(topicActions.doneFetchingTopic(json));
                        } else {
                            dispatch(topicActions.FailFetchingTopic());
                        }
                    })
            }
        },

        /** 开始：请求单篇文章信息；用于显示正在加载的状态,修改isFetching为true*/
        beginFetchingTopic: ()=>({
            type: 'topic/BEGIN_FETCHING_TOPIC'
        }),

        /** 成功：请求单篇文章信息；更新文章信息，修改isFetching为false*/
        doneFetchingTopic: (json)=>({
            type: 'topic/DONE_FETCHING_TOPIC',
            data: json.data
        }),

        /** 失败：请求单篇文章信息；修改isFetching为false*/
        FailFetchingTopic: ()=>({
            type: 'topic/FAIL_FETCHING_TOPIC'
        })

};

export default topicActions;