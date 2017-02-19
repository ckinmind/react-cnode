

/***
 * 处理登录相关的action
 */
let loginActions = {

    login: function(accessToken){
        return function(dispatch, getState){

            fetch('https://cnodejs.org/api/v1/accesstoken', {
                    method: 'POST',
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    body: `accesstoken=${accessToken}`
                })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    json.accesstoken = accessToken;
                    json.isLogined = true;
                    dispatch(loginActions.success(json));
                } else {
                    alert('登录失败'); /* 简化处理，直接弹出登陆失败提示框*/
                }
            })
        }

    },

    success: (json) => ({
        type: 'login/LOGIN_SUCCESS',
        userdata: json
    })

};

export default loginActions;


/**
 1. 登录成功后返回的数据结构如下：
 Object {
        accesstoken: '....',
        avatar_url: '....',
        id: '...',
        loginname: '...',
        success: true,
   }

 2. 登录失败返回的数据结构如下：
 Object {
     "success":false,
     "error_msg":"错误的accessToken"
 }

 */