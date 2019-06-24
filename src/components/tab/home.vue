<template>
  <div class="homeContainer">
    <!-- <h1>home</h1> -->
    <!-- 这里是轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img_url" alt>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 这里是轮播图End -->

    <!-- 这里是九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media   mui-col-xs-4  ">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">安师新闻</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media   mui-col-xs-4  ">
        <router-link to="/home/imagelist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">光影安师</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media   mui-col-xs-4  ">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">安师商城</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media   mui-col-xs-4  ">
        <router-link to="/home/newslist">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">记录安师</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media   mui-col-xs-4  ">
        <router-link to="/home/newslist">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">一卡通</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media   mui-col-xs-4  ">
        <router-link to="/home/newslist">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">校园社园</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media   mui-col-xs-4  ">
        <router-link to="/home/newslist">
          <img src="../../images/menu7.png" alt="">
          <div class="mui-media-body">户外出行</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media   mui-col-xs-4  ">
        <router-link to="/home/newslist">
          <img src="../../images/menu8.png" alt="">
          <div class="mui-media-body">休闲娱乐</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media   mui-col-xs-4  ">
        <router-link to="/home/newslist">
          <img src="../../images/menu9.png" alt="">
          <div class="mui-media-body">考研交流</div>
        </router-link>
      </li>
    </ul>
    <!-- 这里是九宫格End -->
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      swipeList: []
    };
  },
  methods: {
    getSwipeData() {
      //npm i axios -S安装axios
      //使用axios发出ajax请求
      //1.npm i axios -S
      //2.import 导入axios
      //this.$ajax({}).then(function(){})所以我们用这种方法
      //this.$ajax.get(url).then()
      //this.$ajax.post(url).then()
      this.$ajax({
        methods: "GET",
        url: "/sliderlist"
      }).then(response => {
        var data = response.data;
        if (data.Status == 0) {
          this.swipeList = data.Data;
        } else {
          Toast("无法加载轮播图数据");
        }
      });
    }
  },
  created() {
    this.getSwipeData();
  }
};
</script>
<style lang="less">
.homeContainer {
  .mint-swipe {
    height: 240px;
    background-color: rgb(48, 47, 151);
    .mint-swipe-item {
      img {
        width: 100%;
      }
    }
  }
  .mui-table-view-cell{
      a{
          img{
              width: 3.3rem;
          }
      }
  }
}
</style>
