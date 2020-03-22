<template>
  <div class="wrap">
    <!-- main begin-->
    <div class="sale">
      <h1 class="lf">拍卖结束的商品</h1>
      <div class="right rulse">
        当前用户是：
        <span class="blue strong">
          <a
            href="#"
            :title="this.$store.getters.getUser.username"
          >{{this.$store.getters.getUser.username}}</a>
        </span>
      </div>
      <div class="cl"></div>
    </div>
    <div>
      <el-table :data="endShow" border style="width: 100%" height="250">
        <el-table-column prop="shopname" label="名称"></el-table-column>
        <el-table-column prop="starttime" label="开始时间" width="180"></el-table-column>
        <el-table-column prop="endtime" label="结束时间" width="180"></el-table-column>
        <el-table-column prop="startmoney" label="起拍价"></el-table-column>
        <el-table-column prop="endmoney" label="成交价">
          
        </el-table-column>
        <el-table-column prop="endname" label="竞拍者">
          <template slot-scope="temp">{{temp.row.endname | filterSbrand}}</template>
        </el-table-column>
      </el-table>
    </div>
    <h1>拍卖中的商品</h1>
    <div class="records">
      <el-table :data="showing" style="width: 100%" height="250">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="竞拍记录">
                <span v-for="(item,i) in props.row.goList" :key="i"><div class="borderno blue record">{{item.username}}   {{item.gomoney}}</div></span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="shopname"></el-table-column>
        <el-table-column label="开始时间" prop="starttime"></el-table-column>
        <el-table-column label="结束时间" prop="endtime"></el-table-column>
        <el-table-column label="起拍价" prop="startmoney"></el-table-column>
      </el-table>
    </div>
    <!-- main end-->
  </div>
</template>

<script>
export default {
  data() {
    //这里存放数据
    return {
      endShow: [],
      showing: []
    };
  },
  //计算属性
  computed: {},
  //方法集合
  methods: {
    getEndShow() {
      let _this = this;
      this.$jq.getJSON(`http://127.0.0.1:8080/api/gos/show`, function(pg) {
        _this.endShow = pg;
      });
    },
    getEndShowing() {
      let _this = this;
      this.$jq.getJSON(`http://127.0.0.1:8080/api/gos/showing`, function(pg) {
        _this.showing = pg;
      });
    }
  },
  //挂载完成（可以访问DOM元素）
  mounted() {
    this.getEndShow();
    this.getEndShowing();
  },
  //监控data中的数据变化
  watch: {},
  filters: {
    filterSbrand(val) {
      return val == "" ? "流拍" : val;
    },
    filterSbrand1(val) {
      return val == "" ? "" : val;
    }
  }
};
</script>
<style  scoped>
/*@import url(); 引入公共css类*/
@import url("../assets/css/common.css");
@import url("../assets/css/style.css");

.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>