<template>
    <div class="swipeContainer">
        <mt-swipe :auto="speed">
            <mt-swipe-item v-for="item in swipeList" :key="item.id">
                <img :src="item.img_url" alt="" srcset="">
            </mt-swipe-item>
        </mt-swipe> 
    </div>
</template>
<script>
export default {
    props: ['swipeList', 'speed']//父组件把swipeList、speed传递给子组件，供子组件使用
}
</script>
<style lang="less">
.swipeContainer{
    .mint-swipe{
        height: 280px;
        background-color: #369;
        .mint-swipe-item{
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
