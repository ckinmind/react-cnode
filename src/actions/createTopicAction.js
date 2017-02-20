import {  hashHistory } from 'react-router';

/***
 *  创建一个Topic
 *  数据没走store, 传入的topic是引用
 */

const createTopic = topic => {
    return function(dispatch, getState) {

        /* 防止多次提交 */
        if(topic.isSubmitting){
            return false
        }

        let {tab, title, content} = topic;

        /* 提交前检测*/
        if(!tab)
            return alert('请选择发表类型');
         else if(title.length < 10)
            return alert('标题字数10字以上');
         else if (content.length < 30)
            return alert('内容字数30字以上');

        topic.isSubmitting = true;
        let accesstoken = getState().User.accesstoken;

        fetch('https://cnodejs.org/api/v1/topics', {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `accesstoken=${accesstoken}&title=${title}&tab=${tab}&content=${content}`
        })
        .then(response => response.json())
        .then(json => {
            if (json.success) {
                topic.isSubmitting = false;
                /* 提交成功后跳转到对应的topic*/
                hashHistory.push({pathname: '/topic/' + json.topic_id});
            }else{
                topic.isSubmitting = false;
                return alert('发布失败');
            }
        });
    }
};


export default  createTopic;
