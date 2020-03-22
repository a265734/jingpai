<template>
<div class="wrap">
<!-- main begin-->
 <div class="main">
   <div class="sidebar">
     <p><img src="../assets/images/img1.jpg" width="443" height="314" alt="" /></p>
   </div>
   <div class="sidebarg">
    <div class="login">
      <dl>
        <dt class="blues">用户登陆</dt>
        <dd><label for="name">用户名：</label><input type="text" class="inputh" value="常用邮箱" v-model="name" id="name"/></dd>
        <dd><label for="password">密 码：</label><input type="text" class="inputh" value="密码" v-model="password" id="password"/></dd>
        <dd>
          <div class="code">
              <label for="password">验证码：</label>
              <input type="text" class="inputh" v-model="yzm" placeholder="请输入验证码（不区分大小写）"/>
              <canvas id="canvas" @click="draw(show_num)" width="100" height="30"></canvas>
          </div>
        </dd>
        <dd>
           <input name=""  type="checkbox" id="rem_u"  />
           <span for="rem_u">下次自动登录</span>
        </dd>
        <dd class="buttom">
           <input name="" type="submit" @click="doLogin" value="登 录" class="spbg buttombg f14 lf" />
           <input name="" type="submit" value="注 册" @click="goRegis" class="spbg buttombg f14 lf" />
           <span class="blues  lf"><a href="" title="">忘记密码?</a></span>
           <div class="cl"></div>
        </dd>
       
      </dl>
    </div>
   </div>
  <div class="cl"></div>
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
    name:"",
    password:"",
    show_num:[],
    yzm:"",
};
},
//计算属性
computed: {},
//方法集合
methods: {
    doLogin(){
        let _this=this;
        if(this.name=="" || this.password==""){
            _this.$message({
            message: '请输入账户或密码',
            type: 'warning'
            });
            return
        }
        var num = this.show_num.join("");
        if(this.yzm==''){
            _this.$message({
            message: '请输入验证码',
            type: 'warning'
            });
            return
        }else if(this.yzm != num){
             _this.$message({
            message: '验证码错误',
            type: 'error'
            });
            this.yzm="";
            this.draw(this.show_num);
            return;
        }
        this.$jq.getJSON(`http://127.0.0.1:8080/api/users/user/${_this.name}/${_this.password}`, function(pg) {
           if(pg.code=="200"){
               _this.$message({
                    message: '登录成功',
                    type: 'success'
                });
               _this.$store.commit('setUser',pg.user);
               _this.$router.push('/index/'+pg.index);
           }else{
                _this.$message({
                    message: '登录失败，账户或密码错误',
                    type: 'error'
                });
           }
        });
        
    },
    goRegis(){
        this.$router.push('/userRegis');
    },
    draw(show_num) {
        var canvas_width=this.$jq('#canvas').width();
        var canvas_height=this.$jq('#canvas').height();
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度
        
        for (var i = 0; i < 4; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var deg = Math.random() - 0.5; //产生一个随机弧度
            var txt = aCode[j];//得到随机的一个内容
            this.show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = this.randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = this.randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = this.randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    },
    randomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
},
//挂载完成（可以访问DOM元素）
mounted() {
    this.draw(this.show_num);
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
.input-val {
        width: 200px;
        height: 32px;
        border: 1px solid #ddd;
        box-sizing: border-box;
      }
      #canvas {
        vertical-align: middle;
        box-sizing: border-box;
        border: 1px solid #ddd;
        cursor: pointer;
      }
      .btn {
        display: block;
        margin-top: 20px;
        height: 32px;
        width: 100px;
        font-size: 16px;
        color: #fff;
        background-color: #457adb;
        border: none;
        border-radius: 50px;
      }
</style>