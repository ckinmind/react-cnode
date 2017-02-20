import { combineReducers } from 'redux';
import User from './userReducer';
import Topic from './topicReducer';
import List from './listReducer';
import Message from './messageReducer';
import UserView from './userViewReducer';
import MessageCount from './messageCountReducer';


const rootReducer = combineReducers({
    User, Topic, List, Message, UserView, MessageCount
});

export default rootReducer