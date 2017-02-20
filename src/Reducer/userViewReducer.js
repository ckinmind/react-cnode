
/**
 * 个人中心的数据
 */

const userviewInitState = {};

const UserView = (state = userviewInitState, action) => {

    switch (action.type) {

        case 'userview/DONE_GET_USERVIEW':
            return  action.data;

        default:
            return state;
    }
};

export default UserView;
