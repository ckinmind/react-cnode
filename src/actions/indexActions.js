/**
 *  首页加载的action
 */
let indexActions = {

    /** 加载topic异步操作*/
    fetchingIndex: function(tab = 'all', page = 1){

        return function(dispatch, getState){

            /** 如果上一次加载还未完成则则阻止下一次加载*/
            if(getState().List.isFetching){
                return
            }

            /** 加载开始前，用于显示加载动画*/
            dispatch(indexActions.beginFetchingIndex());

            /** 开始加载数据*/
            fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=10&mdrender=false`)
                .then(response => response.json())
                .then(json => {
                    if (json.success) {
                        /** 数据返回成功后的操作*/
                        dispatch(indexActions.doneFetchingIndex(json, page));
                    } else {
                        /** 数据返回失败后的操作*/
                        dispatch(indexActions.failFetchingIndex());
                    }
                })

        }
    },

    beginFetchingIndex: ()=>({
        type: 'index/BEGIN_FETCHING_INDEX'
    }),
    doneFetchingIndex: (json, page)=>({
        type: 'index/DONE_FETCHING_INDEX',
        data: json.data,
        page: page
    }),
    failFetchingIndex: ()=>({
        type: 'index/FAIL_FETCHING_INDEX'
    })

};

export default indexActions;

