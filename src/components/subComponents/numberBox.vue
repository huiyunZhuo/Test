<template>
    <div class="mui-numbox">
        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="subtract" :disabled="subDis">-</button>
        <input class="mui-input-numbox" type="number" :value="currentCount"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="plus" :disabled="plusDis">+</button>
    </div>
</template>
<script>
export default {
    props: [
        'initCount', //初始值
        'min', //下限
        'max', //上限
    ],
    data(){
        return {
            currentCount: 1,
            plusDis: false,
            subDis: true
        }
    },
    methods: {
    //用来判断disable的显示或者隐藏，不管能够加减我们都要判断disable
        setDisable: function(){
            if(this.currentCount >= this.max){
                this.plusDis = true;//表示隐藏+不可用
                this.subDis = false;//表示显示
            }else{
                if(this.currentCount <= this.min){
                    this.plusDis = false;
                    this.subDis = true;
                }else{
                    this.plusDis = false;
                    this.subDis = false;
                }
            }
        },
        plus: function(){
            if(this.currentCount < this.max){
                this.currentCount++;
            }
            // 设置 2个button的disable
            this.setDisable();
        },
        subtract: function(){
          if(this.currentCount > this.min){
                this.currentCount--;
            }
            // 设置 2个button的disable
            this.setDisable();
        }
    },
    created(){
        this.currentCount = this.initCount;//初始化currentCount，获取父组件传递过来的值
    },
    //这里使用onchange来监听数量的变化是不妥的。
    //因为w3c规定的onchange事件有3个步骤，1：获得焦点，2：数据变化，3：失去焦点
    //而这里，input标签压根就没有获取到过焦点。
    //正确做法，是使用watch来监听currentCount
    watch: {
        'currentCount': function(newValue, oldValue){
            //1.数据发生变化，立刻调用父组件传递过来的方法getCount，把currentCount传递给父组件
            this.$emit("getCount", newValue);//通过$emit调用父组件传递过来的方法
        }
    }
}
</script>
<style lang="less">

</style>
