import VueRouter from 'vue-router';//导入vue-router包

//导入tab栏跳转组件
import home from './components/tab/home.vue'
import classes from './components/tab/classes.vue'
import cart from './components/tab/cart.vue'
import find from './components/tab/find.vue'
import user from './components/tab/user.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import imagelist from "./components/photo/imagelist.vue"
import iamgeinfo from './components/photo/imageinfo.vue'
import goodslist from './components/shop/goodslist.vue'
import goodsinfo from './components/shop/goodsinfo.vue'

var router = new VueRouter({
    routes: [
        {path:'/',redirect:'/home'},
        {path: '/home',component:home},
        {path: '/classes',component:classes},
        {path: '/cart',component:cart},
        {path: '/find',component:find},
        {path: '/user',component:user},
        {path: '/home/newslist',component:newslist},
        {path: '/home/newsinfo/:id',component:newsinfo},
        {path: '/home/imagelist',component:imagelist},
        {path: '/home/imageinfo/:id',component:iamgeinfo},
        {path: '/home/goodslist', component: goodslist},
        {path: '/home/goodsinfo/:id', component: goodsinfo, name: 'goodsinfo'}
    ],
    linkActiveClass:"mui-active"
})
export default router;//重点，当分离出来router.js模块后，一定要把router路由规则对象暴露出去。