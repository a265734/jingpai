<template>
    <div id="app" style=" background-color：#545c64">
        <router-view/>
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
    // clas(){
        //事件内容 
    // }
},
//挂载完成（可以访问DOM元素）
mounted() {
 
},
//监控data中的数据变化
watch: {
    $route(to,from){
        //to.clas();
        //触发事件
    }
}
}
</script>
<style  scoped>
/*@import url(); 引入公共css类*/

</style>