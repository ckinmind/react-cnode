

/**
 *  获取未读消息数目
 */
let messagesCountActions = {

    getMessageCount: function(){
        return function(dispatch, getState){

            let { accesstoken } = getState().User;
            fetch(`https://cnodejs.org/api/v1/message/count?accesstoken=${accesstoken}`)
            .then(response => response.json())
            .then(json => {
                if(json.success){
                    dispatch(messagesCountActions.doneGetMessageCount(json));
                }
            });

        }
    },

    doneGetMessageCount: (json)=>({
        type: 'messageCount/DONE_GET_MESSAGECOUNT',
        count: json.data
    })

};

export default messagesCountActions;
