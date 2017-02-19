import { Tool } from '../Tool';


/**
 * 存储登录的用户信息
 *
 * @param {string} [state=JSON.parse(Tool.localItem('User'))]
 * @param {Object} action
 * @returns Object
 */

// const uerInitState =  JSON.parse(Tool.localItem('User'));

// const uerInitState = {
//     isLogined: false,   /* 是否已登陆 */
//     accesstoken: '',
//     avatar_url: '',
//     id: '',
//     loginname: '',
//     success: false,
// };

const uerInitState = {
    isLogined: true,
    accesstoken:  "4ea2fd7c-e4be-47c7-903f-3a23d914ef45",
    avatar_url:   "https://avatars.githubusercontent.com/u/8199343?v=3&s=120",
    id:  "589e03df5c8036f7019e7a7e",
    loginname: "ckinmind",
    success:  true,
};

const User = (state = uerInitState, action) => {

    switch (action.type) {

        /* 登录成功*/
        case 'login/LOGIN_SUCCESS':
            return action.userdata;
        case 'logout/LOGOUT':
            return uerInitState;

        default:
            return state;
    }
};


// const uerInitState = {
//     isloaded: false,
//     data: {
//         accesstoken: '',
//         avatar_url: '',
//         id: '',
//         loginname: '',
//         success: true
//     }
// };
//
// const User = (state = uerInitState, action) => {
//     switch (action.type) {
//         case 'signinSuccess': //登录成功
//             console.log('aciton')
//             console.log(action);
//             Tool.localItem('User', JSON.stringify(action.target));
//             return action.target;
//         case 'signin': //退出
//             Tool.removeLocalItem('User');
//             return null;
//         default:
//             return state;
//     }
// };


export default User;