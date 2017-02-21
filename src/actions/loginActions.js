

/***
 * 处理登录相关的action
 */
let loginActions = {

    login: function(accessToken){
        return function(dispatch, getState){

            /** 防止多次触发登录请求*/
            if(getState().User.onLogining){
                return
            }

            /** 显示加载状态(登录按钮文字变成登陆中) */
            dispatch(loginActions.beginLogin());

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
                    json.onLogining = false;
                    dispatch(loginActions.success(json));
                } else {
                    dispatch(loginActions.fail(json));
                }
            })
        }

    },

    beginLogin:()=>({
        type: 'login/BEGIN_LOGIN',
    }),

    success: (json) => ({
        type: 'login/LOGIN_SUCCESS',
        userdata: json
    }),

    fail: ()=>({
        type: 'login/LOGIN_FAIL'
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