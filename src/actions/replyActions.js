
/** 回复的action */

let replyActions = {

    /** 加载topic异步操作*/
    replyTopic: function(content, reply_id = ''){

        return function(dispatch, getState){

            /** 正在提交中*/

            /** 发送评论请求*/
            let topicId = getState().Topic.data.id;
            let accesstoken = getState().User.accesstoken;
            content += `——来自[react-cnode](https://github.com/ckinmind/react-cnode)`;

            fetch(`https://cnodejs.org/api/v1/topic/${topicId}/replies`, {
                method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: `accesstoken=${accesstoken}&content=${content}&reply_id=${reply_id}`
            })
            .then(response => response.json())
            .then(json => {
                if (json.success) {

                    /** 构建一条reply回复数据*/
                    let reply = {
                        id: json.reply_id,
                        author: {
                            loginname: getState().User.loginname,
                            avatar_url: getState().User.avatar_url
                        },
                        content: content,
                        ups: [],
                        create_at: Date(),
                        reply_id: null
                    };

                    dispatch(replyActions.doneReplyTopic(reply))
                }
            });

        }
    },

    doneReplyTopic: (reply)=>({
        type: 'topic/ADD_NEW_REPLY',
        reply: reply
    })

};

export default replyActions;
