import {  hashHistory } from 'react-router';
// import topicActions from './topicActions';

let starActions = {

    starReply: function(replyId, replyLoginname){

        return function (dispatch, getState) {

            let loginname = getState().User.loginname;/* 当前登录用户的登录名*/

            /** 如果没登录则跳转登录页*/
            if (!loginname) {
                return hashHistory.push({pathname: '/signin',});
            } else if (loginname == replyLoginname) {
                return alert('你不能给自己点赞');
            }

            // let accessToken = getState().User.accessToken;
            let accessToken = '4ea2fd7c-e4be-47c7-903f-3a23d914ef45';
            fetch(`https://cnodejs.org/api/v1/reply/${replyId}/ups`, {
                method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: `accesstoken=${accessToken}`
            })
                .then(response => response.json())
                .then(json => {
                    if (json.success) {
                        /** 点赞成功后的操作，失败不做任何操作*/
                        dispatch(starActions.doneStarReply(replyId, json.action));
                    }
                })
        }
    },

    doneStarReply: (replyId, action)=>({
        type: 'star/DONE_STAR_REPLY',
        replyId: replyId,
        action: action
    })

};

export default starActions;