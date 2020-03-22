<template>
    <div class=''>
        <div >
            <el-row class="tac" >
                <el-col :span="6">
                    <h4 style="vertical-align: middle;color: black;font-size: 14px;width:374.8px">欢迎:{{this.$store.getters.getUser.username}}</h4>
                    <el-menu :router="true" class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">
                            <span>功能列表</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/userList">查看竞拍列表</el-menu-item>
                            <el-menu-item index="/manaList">竞拍列表管理</el-menu-item>
                            <el-menu-item index="/userShow">查看竞拍结果</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
                </el-col>
                <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
                <el-col :span="17" style="margin-top: 40px;margin-left: 20px;">
                    <router-view></router-view>
                </el-col> 
            </el-row>
        </div>
        
    </div>
</template>

<script>
export default {
data() {
//这里存放数据
return {
    num:0
};
},
//计算属性
computed: {},
//方法集合
methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
},
//挂载完成（可以访问DOM元素）
mounted() {
    this.$router.push('/userList');
    
    
},
//监控data中的数据变化
watch: {

}
}
</script>
<style  scoped>
/*@import url(); 引入公共css类*/

</style>