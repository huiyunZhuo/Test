<template>
    <div class="imagelistContainer">
        <ul class="imagelist" 
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="isLoading" 
        infinite-scroll-distance="100"
        style="max-height:100vh;overflow-y: auto;"
        >
            <li v-for="item in list" :key="item.id">
                <router-link :to="'/home/imageinfo/'+item.id"><!--不可将routelink放在li外边，因为li是通过列表循环加载出来的-->
                    <img  v-lazy="item.img_url"><!--用mint-ui插件实现懒加载-->
                    <div class="info">
                        <h4 class="info_title">{{item.title}}</h4>
                        <p class="info_abstract">{{item.abstract}}</p>
                    </div>
                </router-link>
            </li>
            <!-- 加载动画部分 -->
            <li class="more_loading">
                <mt-spinner type="fading-circle" v-show="is_loading_more" class="mint-spinner-fading-circle"></mt-spinner>    
                <span v-show="finished">已经加载全部信息</span>
            </li>
        </ul>
    </div>
</template>
<script>
import Toast from 'mint-ui'
export default {
    name:"imagelist",
    data(){
        return {
            isLoading:false,
            is_loading_more:false,
            finished:false,
            pageindex:1,
            pagesize:5,
            list:[],
        }
    },
    methods:{
        loadMore(){
            this.isLoading=true;
            this.$ajax({
                method:"get",
                url:"/images/imageslist",
                params:{
                    pageindex:this.pageindex,
                    pagesize:this.pagesize
                }
            }).then(response=>{
                var data=response.data;
                if(data.Status==0){
                    if(data.Data.length>0){
                        this.list=this.list.concat(data.Data);
                        this.pageindex++;
                        this.isLoading=false;
                    }else{
                        //数据全部加载完成
                        this.isLoading=true;
                        this.finished=true;                        
                    }
                }else{
                    Toast("请求数据失败，服务端抽风了");
                }
            })
        }
    },
    created(){
        //this.loadMore();
    }
}
</script>
<style lang="less">
.imagelistContainer{
    .imagelist{
        list-style: none;
        padding: 10px;
        margin: 0;
        li{
            position: relative;
            margin-bottom: 8px;
            img{
                width: 100%;
                height: 260px;
                box-shadow: 0 3px 4px #999;
            }
            image[lazy=loading]{
                width: 40px;
                height: 260px;
                margin: auto
            }
            .info{
                position: absolute;
                bottom: 5px;
                padding:5px;
                background:rgba(0,0,0,0.4);
                .info_title{
                    font-size: 14px;
                    color: #eee;
                }
                .info_abstract{
                    color: #eee;
                    font-size: 12px;
                }

            }
        }
        .more_loading{
            font-size: 12px;
            color: #aaa;
            text-align: center;
            border-bottom: none;
            .mint-spinner-fading-circle{
                position: relative;
                left: 45%;
            }
        }
    }
}
</style>
