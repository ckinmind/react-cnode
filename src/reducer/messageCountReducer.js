

/**
 * 存储未读消息数目的reducer
 */

const messageCountInitState = {
    count: 0
};

const MessageCount = (state = messageCountInitState, action) => {

    switch (action.type) {
        case 'messageCount/DONE_GET_MESSAGECOUNT':
            return { count: action.count };

        default:
            return state;
    }

};



export default MessageCount;
