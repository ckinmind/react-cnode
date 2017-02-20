
/**
 * 存储登录的用户信息
 * todo: 本地存储登录信息(只存token还是用户信息也保存)
 */

const uerInitState = {
    isLogined: false,   /* 是否已登陆 */
    accesstoken: '',
    avatar_url: '',
    id: '',
    loginname: '',
    success: false
};



const User = (state = uerInitState, action) => {

    switch (action.type) {

        /*登录成功*/
        case 'login/LOGIN_SUCCESS':
            return action.userdata;
        /*登出*/
        case 'logout/LOGOUT':
            return uerInitState;
        default:
            return state;
    }
};


export default User;