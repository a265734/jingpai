<template>
<div class="wrap">
<!-- main begin-->
  <div class="sale">
    <h1 class="lf">在线拍卖系统</h1>
    <div class="logout right"><a href="javaScript:void(0)" title="注销" @click="loginOut">注销</a></div>
  </div>
  <div class="forms">
    <label for="name">名称</label>
    <input name="" type="text" class="nwinput" id="name" v-model="vo.name"/>
    <label for="names">描述</label>
    <input name="" type="text" id="names" class="nwinput" v-model="vo.desc"/>
    <label for="time">开始时间</label>
    <input name="" type="text" id="time" class="nwinput" v-model="vo.start"/>
    <label for="end-time">结束时间</label>
    <input name="" type="text" id="end-time" class="nwinput" v-model="vo.end"/>
    <label for="price">起拍价</label>
    <input name="" type="text" id="price" class="nwinput" v-model="vo.money"/>
    <input name="" type="button"  value="查询" @click="getPage(page.pageNum, page.pageSize)" class="spbg buttombg f14  sale-buttom"/>
    <input type="button"  value="发布" @click="add" class="spbg buttombg f14  sale-buttom buttomb"/>
  </div>
  <div class="items">
      <el-table :data="page.list" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品图片">
                <ul class="el-upload-list el-upload-list--picture" id="img" v-if="props.row.imgpath!=''">
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
        <el-table-column prop="starttime" label="开始时间"  width="180"></el-table-column>
        <el-table-column prop="endtime" label="结束时间"  width="180"></el-table-column>
        <el-table-column prop="startmoney" label="起拍价"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="modifyShop(scope.row)">编辑</el-button>
						<el-button size="mini"  type="success" plain @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum" :page-sizes="[3, 6, 9]"  :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"></el-pagination>
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
  vo:{
      userid:this.$store.getters.getUser.userid,
        name: "",
        start: "",
        end: "",
        money: "",
        desc: "",
        pagenum:1,
        pagesize:3,
      },
    page: {

    }
};
},
//计算属性
computed: {},
//方法集合
methods: {
  loginOut() {
      this.$store.commit("setUser", null);
      this.$router.push("/");
    },
    modifyShop(shop){
      let myDate = new Date();
      /**判断竞拍是否开始 */
      let time=shop.starttime.split(" ");
      let startTmp=time[0].split("-");
      let HMS=time[1].split(":");
      let sd=new Date(startTmp[0],parseInt(startTmp[1])-1,startTmp[2],HMS[0],HMS[1],HMS[2]);

      let time1=shop.endtime.split(" ");
      let endtime=time1[0].split("-");
      let HMS1=time1[1].split(":");
      let sd1=new Date(endtime[0],parseInt(endtime[1])-1,endtime[2],HMS1[0],HMS1[1],HMS1[2]);
      console.log(sd.getTime()+"\t"+myDate.getTime()+"\t"+sd1.getTime());
      if(sd.getTime()<=myDate.getTime() && myDate.getTime()<=sd1.getTime()){
         this.$message({
              message: '竞拍已开始无法编辑',
              type: 'warning'
          });
          return;
      }
      this.$store.commit("setShop", shop);
      this.$router.push('/manaAdd');
    },
    remove(shop){
     
      let _this=this;
       let myDate = new Date();
      /**判断竞拍是否开始 */
      let time=shop.starttime.split(" ");
      let startTmp=time[0].split("-");
      let HMS=time[1].split(":");
      let sd=new Date(startTmp[0],parseInt(startTmp[1])-1,startTmp[2],HMS[0],HMS[1],HMS[2]);

      let time1=shop.endtime.split(" ");
      let endtime=time1[0].split("-");
      let HMS1=time1[1].split(":");
      let sd1=new Date(endtime[0],parseInt(endtime[1])-1,endtime[2],HMS1[0],HMS1[1],HMS1[2]);
      console.log(sd.getTime()+"\t"+myDate.getTime()+"\t"+sd1.getTime());
      if(sd.getTime()<=myDate.getTime() && myDate.getTime()<=sd1.getTime()){
         this.$message({
              message: '竞拍已开始无法删除',
              type: 'warning'
          });
          return;
      }
      //删除ajax
      this.$jq.ajax(`http://127.0.0.1:8080/api/shops/shop/remove/${shop.shopid}`, {
          type: 'post',
          success(data) {
              if(data.code=="200"){
                _this.$message({
                    message: '删除成功',
                    type: 'success'
                });
              }else{
                _this.$message({
                    message: '删除失败',
                    type: 'error'
                });
              }
              _this.getPage(_this.page.pageNum, _this.page.pageSize);
          }
        });
    },
    add(){
        this.$router.push('/manaModify');
    },
    loginOut() {
      this.$store.commit("setUser", null);
      this.$router.push("/");
    },
    getPage(num,size){
      let _this=this;
      _this.vo.pagenum=num;
      _this.vo.pagesize=size;
      this.$jq.ajax(`http://127.0.0.1:8080/api/shops`, {
          type: 'post',
          data: JSON.stringify(_this.vo),
          contentType: "application/json",
          success(data) {
            _this.page=data;
          }
        });
    },
    handleSizeChange(val) {
        this.getPage(this.page.pageNum, val);
      },
      handleCurrentChange(val) {
        this.getPage(val, this.page.pageSize);
      },
},
//挂载完成（可以访问DOM元素）
mounted() {
this.getPage(1,3);
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