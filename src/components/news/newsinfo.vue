<template >
    <div class="newsinfoContainer">
        <section class="title">
            <h2>{{news.title}}</h2>
        </section>
        <!-- 编辑，日期，点击量，部分 -->
        <section class="des">
            <p>
                <span class="author">作者：{{news.author}}</span>
                <span class="add_time">日期：{{news.add_time|dateFormat}}</span>
                <span class="click_count">阅读：{{news.click_count}}</span>
            </p>
        </section>
        <!-- 图片部分 -->
        <section class="img">
            <img :src="this.news.img_url" alt="">
        </section>
        <!-- 新闻正文部分 -->
        <section class="content">
            <div v-html="this.news.content"></div><!--插值表达式不会解析标签-->
        </section>
        <section class="comment">
            <comment :id="this.newsid"></comment><!--父组件把this.newsid的值传递给子组件-->
            <!-- 封装组件 -->
        </section>
        <!-- 评论 -->
    </div>
</template>
<script>
//1.导入组件
//2,把comment挂到newsinfo的组件身上
//3,通过标签的形式，插入到newsinfo的template中
import comment from '../subComponents/comment.vue' //导入评论组件
export default {
    data(){
        return{
            newsid : this.$route.params.id,//第一步，获取路由传递来的参数
            news:[]//保存通过ajax请求，后渠道的新闻数据，以此来做数据绑定
        }
    },//这是通过路由传参来的单个页面，直接就是一个完整的单数组
    methods:{
        //第二步，ajax
        loadNewsInfo:function(){//声明一个方法来请求数据
            this.$ajax({
                methods:"get",
                url:"/news/newsinfo",
                params:{
                    newsid:this.newsid
                }
            }).then(response=>{
                var data=response.data;
                if(data.Status==0){//数据请求成功
                    this.news=data.Data[0];//这里直接赋值是因为我们只拿到了一组数据
                }
            })
        }
    },
    created(){
        this.loadNewsInfo();
    },
    components:{
        comment
    }
}
</script>
<style lang="less">
.newsinfoContainer{
    padding: 15px;
    .title{
        padding:5px 0;
        font-size: 24px;
        color: #333;
    }
    .des{
        font-size: 12px;
        color: #aaa;
        padding-bottom: 20px;
        p{
            display: flex;
            justify-content: space-between;
        }
    }
    .img{
        img{
            width: 100%;
        }
        padding-bottom: 10px;
    }
    .content{
        p{
            font-size: 14px;
            color: #444;
            text-indent: 1em;
        }
        
    }

}
</style>
