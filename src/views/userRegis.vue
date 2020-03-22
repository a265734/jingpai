<template>
<div class="wrap">
  <!-- main begin-->
      <div class="zclf login logns">
        <h1  class="blue">用户注册</h1>
          <dl>
            <dd>
              <label> <small>*</small>用户名</label>
              <input type="text" class="inputh lf" value="" v-model="user.userzh"/>
             <div class="lf red laba" v-if="user.userzh.length<6">用户名要求不低于6个字符</div>
            </dd>
            <dd>
              <label> <small>*</small>密码</label>
              <input type="text" class="inputh lf" value="" v-model="user.userpwd"/>
              <div class="lf red laba" v-if="user.userpwd.length<6">密码要求不低于6个字符</div>
            </dd>
            <dd>
              <label> <small>*</small>用户昵称</label>
              <input type="text" class="inputh lf" value="" v-model="user.username"/>
              <div class="lf red laba" v-if="user.username.length==0">用户昵称必填</div>
            </dd>
            <dd class="hegas">
              <label>&nbsp;</label>
               <input name=""  type="checkbox" id="rem_u"   />
              <label for="rem_u" class="labels">我同意<span class="blues">《服务条款》</span></label>
            </dd>
            <dd class="hegas">
              <label>&nbsp;</label>
              <input name="" type="submit" value="立即注册" @click="regist" class="spbg buttombg buttombgs f14 lf" />
            </dd>
          </dl>
    </div>
<!-- main end-->
<!-- footer begin-->

</div>
</template>

<script>
export default {
data() {
//这里存放数据
return {
    user:{
      userzh:"",
      userpwd:"",
      username:"",
    }
};
},
//计算属性
computed: {},
//方法集合
methods: {
    regist(){
      let _this=this;
       if(this.user.userzh=="" ||this.user.userpwd=="" ||this.user.username=="" ){
          this.$message({
									type: 'error',
									message: '请填写完整用户信息!'
                });
                
                return;
       }
       if(this.$jq(".red").is(":visible")){
            this.$message({
									type: 'error',
									message: '请遵循用户注册规则!'
                });
                return;
       }
       this.$jq.ajax(`http://127.0.0.1:8080/api/users/user/add`, {
						type: 'post',
						data: JSON.stringify(_this.user),
						contentType: "application/json",
						success(data) {
							if (data.code == "200") {
								_this.$message({
									type: 'success',
									message: '注册成功!'
                });
                 _this.$router.push('/');
							}else if(data.code == "500"){
                _this.$message.error(data.msg);
							}
						}
					});
       
    }
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
@import url('../assets/css/common.css');
@import url('../assets/css/style.css');
</style>