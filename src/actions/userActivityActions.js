
let actions = {
    /** 点赞或消赞操作*/
    star: function(accesstoken,reply_id){

        return function(dispatch, getState){

            fetch(`https://cnodejs.org/api/v1/reply/${reply_id}/ups`, {
                    method: 'POST',
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    body: `accesstoken=${accessToken}`
                })
                .then(response => response.json())
                .then(json => {

                    if (json.success) {
                        json.accesstoken = accessToken;
                        dispatch(actions.signinSuccess(json));
                    } else {
                        // todo: 失败处理
                        //dispatch(loginFailed(json.error_msg));
                    }
                })
        }
    }



};

export default actions;