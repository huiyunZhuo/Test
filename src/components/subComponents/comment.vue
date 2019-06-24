
<template>
    <div class="commentContainer">
        <div class="cmtHeader">
            <h3>观点</h3>
        </div>
        <div class="cmtList">
            <ul>
                <li v-for="item in list" :key="item.id">
                    <p>
                        <span class="mui-icon mui-icon-contact"></span>
                        <span class="user">匿名用户</span>
                        <span class="add_time">{{item.add_time|dateFormat}}</span>
                    </p>
                    <p class="content">
                        {{item.content}}
                    </p>
                </li>
            </ul>
            <button class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined" @click="loadMoreComment">加载更多评论</button>
        </div>
        <div class="postCmt">
            <p>
                <span>发表我的观点</span>
                <span @click="postComment" class="send">发送</span>
            </p>
            <textarea rows="3" class="txtMsg" placeholder="优质观点将在前排显示！" v-model="msg"  @keyup.enter="postComment"></textarea>
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import qs from 'qs'
export default {
    data(){
        return{
            pageindex:1,
            pagesize:10,
            list:[],
            msg:''
        }
    },
    methods:{
        //获取评论
        getComment(){
            this.$ajax({
                methods:"get",
                url:"/comment",
                params:{
                    srcId:this.id,
                    pageindex:this.pageindex,
                    pagesize:this.pagesize
                }
            }).then(response=>{
                var data=response.data;
                if(data.Status==0){
                    if(data.Data.length > 0){
                        this.list = this.list.concat(data.Data);
                    }else{
                        Toast({
                            message:"没有更多评论了",
                            duration:3000
                        })
                    }
                }else{
                    Toast({
                            message:"请求评论失败",
                            duration:3000
                    })
                }
            })
        },
        //加载更多评论
        loadMoreComment(){
            this.pageindex++;
            this.getComment();
        },
        //发表评论
        postComment(){
            if(this.msg.length > 0){
                this.$ajax({
                    method:"post",
                    url:"/comment",
                    //如果是get传递的参数用params属性 如果是post传参用data属性
                    data:qs.stringify({//使用post传参的语法
                        srcId:this.id,//是通过父组件传递过来的id,这里用来判断在哪个组件下发表评论
                        content:this.msg,
                        add_time:new Date()
                    })
                }).then(response=>{
                    var key=new Date().getMilliseconds();
                    //如果Post请求正确响应了，我们就可以直接把新发表的评论，组织成一个对象，添加到list后面
                    this.list.unshift({id: key, content:this.msg,srcId:this.id,add_time:new Date()});
                    this.msg="";
                })
            }else{
              Toast({
                  message:'不能发表空评论',
                  duration:3000,
                  position:'bottom'
              })
            }
        }
    },
    props:["id"], //从父组件传递过来，服务端需要传递的srcid参数值
    created(){
        this.getComment();
    }
}
</script>
<style lang="less">
.commentContainer{
    .cmtHeader{
        padding:10px 0;
        border-bottom: 1px solid rgba(97, 102, 102, 0.1);
        h3{
            border-left: 5px solid #ce0000;
            padding-left: 10px;
            font-size: 18px;
            font-family: "微软雅黑";
            font-weight: bold;
            color:#333;
        }
    }
    .cmtList{
        ul{
            list-style: none;
            padding:0;
            li{
                
                padding:0;
                margin:0;
                border-bottom: 1px solid rgba(175, 189, 189, 0.1);
                p{
                    padding:5px 0;
                    margin: 0;
                    font-size: 14px;
                    .user{
                        color: darkgoldenrod;
                        padding-right: 20px;
                        padding-left: 5px;
                    }
                    // .add_time{
                    //     float: right;
                    // }

                }
                p.content{
                    padding-left: 33px;
                    font-size: 16px;

                }
            }
        }
    }
    .postCmt{
        p{
            display: flex;
            justify-content: space-between;
            span{
                padding: 5px;
            }
            .send{
                cursor: pointer;
            }
        }
        .txtMsg{
            color: #444;
            font-size: 14px;
        }
    }
}
</style>
