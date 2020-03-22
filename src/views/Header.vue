<template>
    <div class=''>
        <h1>自己配置的路由页面</h1>
        <!--$route：当前路由对象-->
        <h1>接受restFull风格参数:{{this.$route.params.name}}</h1>
        <div>
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
data() {
//这里存放数据
return {

};
},
//计算属性
computed: {},
//方法集合
methods: {

},
//挂载完成（可以访问DOM元素）
mounted() {

},
//监控data中的数据变化
watch: {

}
}
</script>
<style  scoped>
/*@import url(); 引入公共css类*/

</style>