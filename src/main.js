
//导入vue包--相当于 src='/vue.js/'
import Vue from 'vue';
//导入app.vue
import app from './app.vue'
//导入mui的样式包扩展图标
import './lib/mui/css/mui.css'
import  './lib/mui/css/icons-extra.css'
//导入路由vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//导入路由模块 router.js
import router from './router.js';
//导入mint-ui
import MintUi from 'mint-ui'
import "mint-ui/lib/style.css"
Vue.use(MintUi)//把mint-ui挂载到vue身上

//引入axios,挂载到Vue.prototype
import axios from 'axios'
Vue.prototype.$ajax=axios;//不支持Vue.use的语法挂载
//配置请求的域名
axios.defaults.baseURL="http://www.barteam.cn:8086";

//导入moment组件，进行日期的格式化
import Moment from "moment";
Vue.filter("dateFormat",function(dataStr,pattern="YYYY--MM--DD HH:MM"){
    return Moment(dataStr).format(pattern);
});

//导入vue-preview插件，
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

//导入Vuex仓储模块
import store from './store.js'
var vm = new Vue({
    el:'#app',
    render:c =>c(app),//把app.vue导入到#app里面 用箭头函数简写
    router,
    store
})

// var vm = new Vue({
//     el:'#app',
//     render(c){
//         return c(app)
//     }  
// }) 这种方式也是可以的 我们想要把组件渲染到页面上时 vm实例中的render函数可以实现