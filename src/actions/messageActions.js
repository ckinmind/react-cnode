

/**
 *  获取消息和消息未读消息数目的action
 */
let messagesActions = {

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
    })

};

export default messagesActions;
