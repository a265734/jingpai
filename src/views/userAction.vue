<template>
  <div class="wrap">
    <!-- main begin-->
    <div class="sale">
      <h1 class="lf">在线拍卖系统</h1>
      <div class="logout right">
        <a href="javaScript:void(0)" title="注销" @click="loginOut">注销</a>
      </div>
    </div>
    <div class="items sg-font lf">
      <ul class="rows">
        <li>名称：</li>
        <li class="borderno">{{this.$store.getters.getShop.shopname}}</li>
      </ul>
      <ul class="rows">
        <li>描述：</li>
        <li class="borderno">{{this.$store.getters.getShop.shopdesc}}</li>
      </ul>
      <ul class="rows">
        <li>开始时间：</li>
        <li class="borderno">{{this.$store.getters.getShop.starttime}}</li>
      </ul>
      <ul class="rows">
        <li>结束时间：</li>
        <li class="borderno">{{this.$store.getters.getShop.endtime}}</li>
      </ul>
      <ul class="rows border-no">
        <li>起拍价：</li>
        <li class="borderno">{{this.$store.getters.getShop.startmoney}}</li>
      </ul>
    </div>
    <div class="rg borders">
      <img src="images/ad20.jpg" width="270" height="185" alt />
    </div>
    <div class="cl"></div>
    <div class="top10 salebd">
      <p>
        <label for="sale">出价：</label>
        <el-form :model="go" ref="go" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="竞拍价格"
            prop="gomoney"
            :rules="[
      { required: true, message: '竞拍价格不能为空'},
      { type: 'number', message: '竞拍价格必须为数字值'}
    ]"
          >
            <el-input type="age" v-model.number="go.gomoney" autocomplete="off" style="width:210px;margin-right:10px"></el-input>
            <el-button type="primary" @click="submitForm('go')">竞拍</el-button>
          </el-form-item>
        </el-form>
      </p>
    </div>
    <div class="top10">
      <input name type="submit" @click="findGo" value="刷 新" class="spbg buttombg f14" />
      <input name type="submit" value="返回列表" @click="returnList" class="spbg buttombg f14" />
    </div>
    <div class="offer">
      <h3>出价记录</h3>
      <div class="sg-font">
        <el-table :data="gos" border style="width: 100%">
          <el-table-column prop="gotime" label="竞拍时间"></el-table-column>
          <el-table-column prop="gomoney" label="竞拍价格"></el-table-column>
          <el-table-column prop="username" label="竞拍人" width="180"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- main end-->
  </div>
</template>

<script>
export default {
  data() {
    //这里存放数据
    return {
      gos: [],
      go: {
        shopid: this.$store.getters.getShop.shopid,
        userid: this.$store.getters.getUser.userid,
        gotime: new Date(),
        gomoney: ""
      }
    };
  },
  //计算属性
  computed: {},
  //方法集合
  methods: {
    goShop() {
      let _this = this;
      this.$jq.ajax(`http://127.0.0.1:8080/api/gos/go/add`, {
        type: "post",
        data: JSON.stringify(_this.go),
        contentType: "application/json",
        success(data) {
          if (data.code == "200") {
            _this.$message({
              type: "success",
              message: data.msg
            });
            _this.findGo();
          } else {
            _this.$message.error(data.msg);
          }
        }
      });
    },
    loginOut() {
      this.$store.commit("setUser", null);
      this.$router.push("/");
    },
    returnList() {
      this.$router.push("/userList");
    },
    findGo() {
      let _this = this;
      this.$jq.getJSON(
        `http://127.0.0.1:8080/api/gos/${this.$store.getters.getShop.shopid}`,
        function(pg) {
          _this.gos = pg;
        }
      );
    },
    submitForm(formName) {
      let _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.goShop();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
  //挂载完成（可以访问DOM元素）
  mounted() {
    this.findGo();
  },
  //监控data中的数据变化
  watch: {}
};
</script>
<style  scoped>
/*@import url(); 引入公共css类*/
@import url("../assets/css/common.css");
@import url("../assets/css/style.css");
</style>