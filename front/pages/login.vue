
<template>
  <div class="login-container">  
    <el-form class="login-form" label-width="100px" :model="form" :rules="rules" ref="loginForm">
       
      <div class="title-container">
        <img src="/logo.png" alt />
      </div>

      <el-form-item prop="email" label="邮箱：">       
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item prop="captcha" label="验证码：" class="captcha-container">
          <div class="captcha">
            <img :src="code.captcha" @click="resetCaptcha">
        </div>
        <el-input v-model="form.captcha"  placeholder="请输入验证码"></el-input>
      </el-form-item>

        <el-form-item prop="emailcode" label="邮箱验证码：" class="captcha-container">
          <div class="captcha">
           <el-button @click="sendEmailCode" type="primary" :disabled="send.time>0">{{sendText}}</el-button>
        </div>
        <el-input v-model="form.captcha"  placeholder="请输入邮箱验证码"></el-input>
      </el-form-item>

      <el-form-item prop="pwd" label="密码：">       
        <el-input type="password" v-model="form.pwd" placeholder="请输入密码"></el-input>
      </el-form-item>


        <el-form-item >
            <el-button type="primary" @click.native.prevent="handleLogin">登录</el-button> 
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5';
export default {
  layout: "login",
  computed: {
    sendText(){
        if(this.send.timer<0){
            return "发送"
        }else{
            return `${this.send.timer}s之后发送`
        }
    }  
  },
  data() {
    return {
        send:{
            timer:0
        },
      form: {
        email: "zhjnjn@qq.com",
        pwd: "123456", 
        captcha:"" ,  
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { type: 'email', message: "请输入正确的邮箱格式" }
        ],
        captcha:[
            {required: true, message: "请输入验证码"}
        ],
        emailcode:[
            {required: true, message: "请输入邮箱验证码"}
        ],
        pwd:[
            {required: true, pattern:/^[\w_-]{6,12}/g, message: "请输入6~12位密码"}
        ]
       
      },
      code:{
          captcha:"/api/captcha"
      }
    };
  },
  methods: {
      sendEmailCode(){
        this.send.timer=10;         
        this.timer =  setInterval(() => {
            this.send.timer -=1;
             if(this.send.timer===0){
                 clearInterval(this.timer)
            }
        }, 1000);       
      },
      resetCaptcha(){
          this.code.captcha = '/api/captcha?_t'+new Date().getTime()
      },
      handleLogin(){
          this.$refs.loginForm.validate( async vaild=>{
              if(vaild){
                  console.log("校验成功")
                //   @todo 发送注册请求
                let obj = {
                    email:this.form.email,
                    nickName:this.form.nickName,
                    pwd:md5(this.form.pwd),
                    captcha:this.form.captcha
                }
                let ret = await this.$http.post('user/login',obj)
                console.log("ret",ret)
                // code=0 就是成功
                if(ret.data.code==0){
                  //alert('ok')
                  this.$message("登录成功")
                  //存储token 登录状态管理
                  setTimeout(() => {
                      this.$router.push('/')
                  }, 500);
                }else{
                    this.$message.error(ret.data.message)
                }
              }else{
                  console.log("校验失败")
              }
          })
      }
  }
 
};
</script>


<style lang="scss">
.login-form {
  width: 600px;
  margin: 0 auto;
}
</style>