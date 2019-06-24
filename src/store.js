    //使用vuex步骤
    //1,安装 npm i vuex -S
    //2,导入 import Vuex from 'vuex'
    //3,注册到vue身上 Vue.use(Vuex)
    //4,创建仓储对象 const stroe = new Vuex.Store({})
    //5,把仓储对象挂载到 vm对象身上
    import Vue from 'vue';
    import Vuex from 'vuex';
    Vue.use(Vuex);
 const store = new Vuex.Store({
     state:{

     },
     mutations(){

     },
     getters:{

     }
 })
 export default store;//把仓储对象暴露出去