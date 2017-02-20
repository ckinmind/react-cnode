import {  hashHistory } from 'react-router';

/** 加载topic的action*/
let userViewActions = {

    /** 加载topic异步操作*/
    getUserView: function(loginname){
        return function(dispatch, getState){

            fetch(`https://cnodejs.org/api/v1/user/${loginname}`)
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    /** 数据返回成功后的操作*/
                    dispatch(userViewActions.doneGetUserView(json));
                } else {
                    /** 数据返回失败后的操作*/
                    alert('用户不存在');
                    hashHistory.push({pathname: '/',});
                }
            })
        }
    },

    doneGetUserView: (json)=>({
        type: 'userview/DONE_GET_USERVIEW',
        data: json.data
    }),
};

export default userViewActions;
