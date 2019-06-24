<template>
    <div class="imageinfoContainer">
        <!-- 顶部 基础信息 -->
        <section class="top">
            <h3 class="title">{{this.imgInfo.title}}</h3>
            <p class="subinfo">
                <span class="author">作者：{{this.imgInfo.author}}</span>
                <span class="add_time">时间：{{this.imgInfo.add_time|dateFormat}}</span>
                <span class="click_count">阅读量：{{this.imgInfo.click_count}}</span>
            </p>
        </section>
        <!-- 简介 -->
        <section class="abstract">
            <p v-html="this.imgInfo.abstract"></p>
        </section>
        <!-- 缩略图 -->
        <section class="thumbs">
            <!-- vue-preview使用步骤 -->
            <!-- 1. 安装 npm i vue-preview -S -->
            <!-- 2. 在main.js中导入 import VuePreview from 'vue-preview' -->
            <!-- 3. 挂载到Vue上 Vue.use(VuePreview)-->
            <!-- 4. 在组件的template模板中，使用，标签名是：vue-preview,其中:sliders属性是用于绑定具体的预览图片的数据，这个属性必须有 -->
            <!-- 5. 在业务逻辑中，通过ajax请求，获取:sliders所需数据源 -->
            <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
        </section>
        <!-- 评论 -->
        <section class="cmt">
            <comment :id="this.imgId"></comment>
        </section>
    </div>
</template>
<script>
import comment from "../subComponents/comment.vue"
import Toast from 'mint-ui'
export default {
    data(){
        return{
            imgId:this.$route.params.id,
            imgInfo:{},
            thumbsList:[],

        }
    },
    methods:{
        //获取该组图片的基础信息
        getImgInfo:function(){
            this.$ajax({
                method:"get",
                url:"/images/imagesinfo",
                params:{
                    imgid:this.imgId
                }
            }).then(response=>{
                var data=response.data;
                if(data.Status==0){
                    this.imgInfo=data.Data[0];
                }else{
                    Toast("服务端抽风了，获取图片信息失败")
                }
            })
        },
        //获取该组图片的缩略图
        getThumbsList:function(){
            this.$ajax({
                method:"get",
                url:"/thumbs/"+this.imgId,
            }).then(response=>{
                var data=response.data;
                if(data.Status==0){
                    data.Data.forEach(item => {
                        item.w=600,//放大后图片的宽
                        item.h=400,//放大后图片的高
                        item.src=item.img_url,//小图的url
                        item.msrc=item.img_url//大图的url
                    });
                    //console.log(data.Data);
                    this.thumbsList=data.Data;
                }else{
                    Toast("服务器抽风啦，获取缩略图失败")
                }
            })
        }
    },
    created(){
        this.getImgInfo();
        this.getThumbsList();
    },
    components:{
        comment
    }

}
</script>
<style lang="less">
.imageinfoContainer{
    padding: 10px;

    .top{
        border-bottom: 1px solid #bbb;
        .title{
            font-size: 20px;
            color: #333;
            font-family: "微软雅黑";
            text-align: center;
        }
        .subinfo{
            padding:10px 0;
            font-size: 14px;
            margin: 0;
            display: flex;
            justify-content: space-around;
        }
    }
    .abstract{
        font-size: 14px;
        padding:10px;
        color:#444;
        text-indent: 2em;
        line-height: 22px;
    }
    .thumbs{
        .imgPrev{
            .my-gallery{
                figure{
                    display: inline-block;
                    margin:9px;
                    img{
                        width: 80px;
                        height: 60px;
                    }
                }
            }
        }
    }
}
</style>
