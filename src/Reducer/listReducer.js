



/**
 *  首页数据
 */


const listInitState = {
    isFetching: false,
    data: [
        {
            "id": "5886482f250bf4e2390e9f0d",
            "author_id": "5886479c171f3bc843f60185",
            "tab": "share",
            "content": "<div class=\"markdown-text\"><p>支持我，支持Node.js Foundation透明化</p>\n<p>我参与竞选Node.js董事会的独立董事席位。</p>\n<blockquote>\n<p>请登录https://identity.linuxfoundation.org/pid/99 注册成为会员为我投上您宝贵的一票，感谢您的信任与支持！</p>\n</blockquote>\n<p><a href=\"https://medium.com/@indexzero/æ¯ææ-æ¯ænode-js-foundationéæå-f3ba2dbaa23b#.ur6mjxic6\">https://medium.com/@indexzero/支持我-支持node-js-foundation透明化-f3ba2dbaa23b#.ur6mjxic6</a></p>\n</div>",
            "title": "支持我，支持Node.js Foundation透明化",
            "last_reply_at": "2017-02-15T14:35:27.213Z",
            "good": false,
            "top": true,
            "reply_count": 23,
            "visit_count": 4453,
            "create_at": "2017-01-23T18:15:11.123Z",
            "author": {
                "loginname": "indexzero",
                "avatar_url": "https://avatars.githubusercontent.com/u/4624?v=3&s=120"
            }
        }
    ]
};

const List = (state = listInitState, action) => {

    switch (action.type) {
        case 'index/BEGIN_FETCHING_INDEX':
            return { ...state, isFetching:true };

        case 'index/DONE_FETCHING_TOPIC':
            return { isFetching:false, data: action.data };

        case 'index/FAIL_FETCHING_TOPIC':
            return { ...state, isFetching:false };

        default:
            return state;
    }

};



export default List
