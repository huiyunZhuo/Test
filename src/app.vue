<template>
    <div class="appContainer">
        <!--header-->
        <header id="header" class="mui-bar mui-bar-nav"> 
          <a v-if="showBack" @click="goback" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">爱校园生活</h1>
        </header>
        <!--Content-->
        <div class="mui-content">
            <transition>
                <keep-alive include="newslist"><!--使用keep-alive做数据缓存，include表示要缓存的那个组件-->
                 <router-view></router-view>
                </keep-alive>   
            </transition>
    
        </div>
        <!--bottom-->
        <div class="footer">
         	<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/classes">
				<span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
				<span class="mui-tab-label">分类</span>
			</router-link>
			<router-link class="mui-tab-item" to="/find">
				<span class="mui-icon mui-icon-extra mui-icon-extra-find"></span>
				<span class="mui-tab-label">发现</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">{{this.$store.getters.getTotalCount}}</span>
                </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
            <router-link class="mui-tab-item" to="/user">
				<span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
				<span class="mui-tab-label">我的</span>
            </router-link>
		</nav>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            showBack:false
        }
    },
    methods:{
        goback(){//点击箭头回退
         //$route 管理路由和传参
         //$router 管理url 地址
         this.$router.go(-1);//-1表示回退 1表示前进
        }
    },
    created(){
      if(this.$route.path =='/home'){
        this.showBack = false;
      }else{
        this.showBack = true;
      }
    },
    watch:{
      //监听路由 如果是home,则不显示回退箭头
      "$route.path":function(newValue,oldVAlue){
        if(newValue=='/home'){
            this.showBack = false;
        }else{
            this.showBack = true;
        }
      }
    }
}
</script>
<style lang="less">
.appContainer{
    overflow: hidden;
    padding-bottom: 50px;
    .mui-bar-nav{
        background: #ce0000;
        .mui-title{
            color:#eee;
            font-size: 20px;
            font-weight: bold;
            font-family: "微软雅黑";
        }
        .mui-icon-left-nav{
            color:white;
        }
    }
    .footer{
        .mui-bar-tab{
          .mui-active{
            color:#ce0000;
          }
        }
    }
    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }

}
</style>