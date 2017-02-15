
let indexActions = {

    /** 加载topic异步操作*/
    fetchingIndex: function(){

        return function(dispatch, getState){
            dispatch(indexActions.beginFetchingIndex());
        }
    },

    beginFetchingIndex: ()=>({
        type: 'index/BEGIN_FETCHING_INDEX'
    }),

};

export default indexActions;

