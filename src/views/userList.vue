<template>
  <div class="wrap">
    <!-- main begin-->
    <div class="sale">
      <h1 class="lf">在线拍卖系统</h1>
      <div class="logout right">
        <a href="javaScript:void(0)" title="注销" @click="loginOut">注销</a>
      </div>
    </div>
    <el-form
      ref="form"
      size="mini"
      class="demo-form-inline"
      :inline="true"
      :label-position="`left`"
    >
      <el-form-item label="名称">
        <el-input
          v-model="vo.name"
          @blur="getPage(page.pageNum, page.pageSize);"
          style="width:120px"
          placeholder="名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="vo.desc"
          @blur="getPage(page.pageNum, page.pageSize);"
          style="width:120px"
          placeholder="描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="起拍价">
        <el-input
          v-model="vo.money"
          @blur="getPage(page.pageNum, page.pageSize);"
          style="width:120px"
          placeholder="起拍价"
        ></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-input
          v-model="vo.start"
          @blur="getPage(page.pageNum, page.pageSize);"
          style="width:120px"
          placeholder="开始时间"
        ></el-input>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-input
          v-model="vo.end"
          @blur="getPage(page.pageNum, page.pageSize);"
          style="width:120px"
          placeholder="结束时间"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="items">
      <el-table :data="page.list" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品图片">
                <ul
                  class="el-upload-list el-upload-list--picture"
                  id="img"
                  v-if="props.row.imgpath!=''"
                >
                  <li class="el-upload-list__item is-ready el-list-enter-to" tabindex="0">
                    <img :src="props.row.imgpath" id="img" class="el-upload-list__item-thumbnail" />
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="shopname" label="名称"></el-table-column>
        <el-table-column prop="shopdesc" label="描述"></el-table-column>
        <el-table-column prop="starttime" label="开始时间" width="180"></el-table-column>
        <el-table-column prop="endtime" label="结束时间" width="180"></el-table-column>
        <el-table-column prop="startmoney" label="起拍价"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="goShop(scope.row)">竞拍</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[3, 6, 9]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
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
      vo: {
        userid: 0,
        name: "",
        start: "",
        end: "",
        money: "",
        desc: "",
        pagenum: 1,
        pagesize: 3
      },
      page: {},
      shopid:[],
    };
  },
  //计算属性
  computed: {},
  //方法集合
  methods: {
    goShop(shop) {
      let myDate = new Date();
      /**判断竞拍是否开始 */
      let time = shop.starttime.split(" ");
      let startTmp = time[0].split("-");
      let HMS = time[1].split(":");
      let sd = new Date(
        startTmp[0],
        parseInt(startTmp[1]) - 1,
        startTmp[2],
        HMS[0],
        HMS[1],
        HMS[2]
      );

      let time1 = shop.endtime.split(" ");
      let endtime = time1[0].split("-");
      let HMS1 = time1[1].split(":");
      let sd1 = new Date(
        endtime[0],
        parseInt(endtime[1]) - 1,
        endtime[2],
        HMS1[0],
        HMS1[1],
        HMS1[2]
      );

      console.log(sd1 + "\t" + myDate);
      if (sd.getTime() > myDate.getTime()) {
        this.$message({
          message: "竞拍暂未开始",
          type: "warning"
        });
        return;
      }
      /**判断竞拍是否结束 */
      if (myDate.getTime() > sd1.getTime()) {
        this.$message({
          message: "竞拍已经结束",
          type: "warning"
        });
        return;
      }
      this.$store.commit("setShop", shop);
      this.$router.push("/userAction");
    },
    loginOut() {
      this.$store.commit("setUser", null);
      this.$router.push("/");
    },
    getPage(num, size) {
      let _this = this;
      _this.vo.pagenum = num;
      _this.vo.pagesize = size;
      this.$jq.ajax(`http://127.0.0.1:8080/api/shops/all`, {
        type: "post",
        data: JSON.stringify(_this.vo),
        contentType: "application/json",
        success(data) {
          _this.page = data;
        }
      });
      console.log(this.page);
    },
    handleSizeChange(val) {
      this.getPage(this.page.pageNum, val);
    },
    handleCurrentChange(val) {
      this.getPage(val, this.page.pageSize);
    }
  },
  //挂载完成（可以访问DOM元素）
  mounted() {
    this.getPage(1, 3);
    
  },
  //监控data中的数据变化
  watch: {
    
  }
};
</script>
<style  scoped>
/*@import url(); 引入公共css类*/
@import url("../assets/css/common.css");
@import url("../assets/css/style.css");
</style>