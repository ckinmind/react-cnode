import {  hashHistory } from 'react-router';

let starActions = {

    starReply: function(replyId){

        return function(dispatch, getState){

          if(!getState().User.id){
              hashHistory.push({
                  pathname: '/signin',
              });
          }

        }

    }

};

export default starActions;