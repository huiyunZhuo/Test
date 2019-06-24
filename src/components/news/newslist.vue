<template>
    <div class="newslistContainer">
        <!-- 使用MintUI提供的infinite scroll组件实现上滑加载第二页数据 -->
        <!-- v-infinite-scroll-disabled="loadMore"此属性用来设置Ajax请求数据的方法 -->
        <!-- infinite-scroll-disable 此属性表示用来设置该组件是否还继续响应上滑请求的动作 该属性是一个bool类型值，true标识已经加载完所有数据不在发送请求 -->
        <!-- infinite-scroll-distance 此属性用来设置当组件距离底部距离多远的时候，就发出loadmore事件 -->
        <ul class="newslist" 
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="isLoading" 
        infinite-scroll-distance="100"
        style="max-height:100vh;overflow-y: auto;"
        >
            <li v-for="item in list" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id"><!--:to表示是JS的表达式 点击不同的新闻列表根据ID出现响应的页面-->
                    <p class="news_title">{{item.title}}</p>
                    <p class="new_des">
                       <span class="author">{{item.author}}</span>
                       <span class="add_time">{{item.add_time |dateFormat}}</span>
                       <span class="click_count">{{item.click_count}}</span>
                    </p>
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
export default {
    name:"newslist",//做数据缓存，设置一个要缓存的组件的名称
    data(){
        return {
            list:[],//新闻列表
            isLoading:false,//默认是要响应上滑动作的
            is_loading_more:false,//控制是否显示加载动画图标
            finished:false,//控制是否显示“已经加载所有数据”
            pageindex:1,
            pagesize:10,
        }
    },
    methods:{
        loadMore(){
        //发送AJAX请求的时候，我们需要加载动画，并且不继续响应上滑请求动作，如果一直响应请求会影响用户体验
            this.is_loading_more = true;
            this.isLoading = true;
            this.finished = false;
            this.$ajax({
                method:"get",
                url:"news/newslist",
                params:{//表示需要传递的参数
                    pageindex:this.pageindex,
                    pagesize:this.pagesize
                }
            }).then(response=>{
              var data = response.data;
              if(data.Status == 0){//表示拿到数据
                  this.list = this.list.concat(data.Data)//拼接，因为不仅仅拿到一个数据，而是拿到数组中的多组数据，直接赋值，后面的那组数据会覆盖前面的数据
                  this.pageindex++;
                  this.isLoading = false;//（拿到数据以后，用户会开始滑动）允许再响应上滑动作
                  this.is_loading_more = false;
                  if(data.Data.length < this.pagesize){//表示长度在10以内不需要响应请求
                    this.isLoading = true;//无法在响应这个请求
                    this.finished = true;
                  }
                  
              }else{
                  this.finished = true;
              }
            })
        }
    },
}
</script>
<style lang="less">
.newslistContainer{
     .newslist{
        list-style:none;
        padding:0 16px;
        li{
            border-bottom: 1px solid #ddd;
            padding:10px 0;
            p{
                margin:0;
            }
            p.news_title{
                font-size: 16px;
                color: #333;
            }
            p.new_des{
                font-size: 12px;
                color:#aaa;
                padding-top: 5px;
                display: flex;
                justify-content: space-between;//两端对齐
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
