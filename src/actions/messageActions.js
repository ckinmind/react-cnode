
/**
 *  1. 获取已读消息和未读消息
 *  fetchingMessage:        获取已读消息和未读消息异步操作
 *  beginGFetchingMessage： 请求开始前的操作
 *  doneGFetchingMessage：  请求成功后的操作
 *  failGFetchingMessage：  请求失败的操作
 *
 *  2. 获取未读消息数目
 *  getMessageCount：       获取未读消息数目的异步操作
 *  doneGetMessageCount：   请求成功后的操作
 */
let messagesActions = {

    /******************* 获取已读消息和未读消息 ****************************/

    fetchingMessage: function(){
        return function(dispatch, getState){

            /** 显示加载动画*/
            dispatch(messagesActions.beginGFetchingMessage());

            let { accesstoken } = getState().User;
            fetch(`https://cnodejs.org/api/v1/messages?accesstoken=${accesstoken}`)
            .then(response => response.json())
            .then(json => {
                if(json.success){
                    dispatch(messagesActions.doneGFetchingMessage(json));
                }else{
                    dispatch(messagesActions.failGFetchingMessage());
                }
            });

        }
    },

    beginGFetchingMessage: ()=>({
        type: 'message/BEGIN_FETCHING_MESSAGE'
    }),

    doneGFetchingMessage: (json)=>({
        type: 'message/DONE_FETCHING_MESSAGE',
        data: json.data
    }),

    failGFetchingMessage:()=>({
        type: 'message/FAIL_FETCHING_MESSAGE'
    }),

    /******************* 获取未读写消息数目 ****************************/

    getMessageCount: function(){
        return function(dispatch, getState){

            let { accesstoken } = getState().User;
            fetch(`https://cnodejs.org/api/v1/message/count?accesstoken=${accesstoken}`)
                .then(response => response.json())
                .then(json => {
                    if(json.success){
                        dispatch(messagesActions.doneGetMessageCount(json));
                    }
                });

        }
    },

    doneGetMessageCount: (json)=>({
        type: 'message/DONE_GET_MESSAGE_COUNT',
        count: json.data
    })

};

export default messagesActions;
