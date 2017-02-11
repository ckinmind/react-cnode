import { Tool } from '../Tool';


/**
 * 存储登录的用户信息
 *
 * @param {string} [state=JSON.parse(Tool.localItem('User'))]
 * @param {Object} action
 * @returns Object
 */

const User = (state = JSON.parse(Tool.localItem('User')), action) => {

    switch (action.type) {
        case 'signinSuccess': //登录成功
            console.log('aciton')
            console.log(action);
            Tool.localItem('User', JSON.stringify(action.target));
            return action.target;
        case 'signin': //退出
            Tool.removeLocalItem('User');
            return null;
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