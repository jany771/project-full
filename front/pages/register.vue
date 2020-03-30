
<template>
  <div class="login-container">  
    <el-form class="login-form" label-width="100px" :model="form" :rules="rules" ref="registerForm">
       
      <div class="title-container">
        <img src="/logo.png" alt />
      </div>

      <el-form-item prop="email" label="邮箱：">       
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>

       <el-form-item prop="nickName" label="昵称：">       
        <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
      </el-form-item>

      <el-form-item prop="captcha" label="验证码：" class="captcha-container">
          <div class="captcha">
            <img :src="code.captcha" @click="resetCaptcha">
        </div>
        <el-input v-model="form.captcha"  placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item prop="pwd" label="密码：">       
        <el-input type="password" v-model="form.pwd" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="repwd" label="确认密码：">       
        <el-input type="password" v-model="form.repwd" placeholder="请再次输入密码"></el-input>
      </el-form-item>

        <el-form-item >
            <el-button type="primary" @click.native.prevent="handleRegister">注册</el-button> 
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5';
export default {
  layout: "login",
  data() {
    return {
      form: {
        email: "zhjnjn@qq.com",
        nickName:"wowo",
        pwd: "123456",
        repwd:"123456",  
        captcha:""   
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { type: 'email', message: "请输入正确的邮箱格式" }
        ],
        nickName:[
            {required: true, message: "请输入昵称"}
        ],
        captcha:[
            {required: true, message: "请输入验证码"}
        ],
        pwd:[
            {required: true, pattern:/^[\w_-]{6,12}/g, message: "请输入6~12位密码"}
        ],
        repwd:[
            {required: true, message: "请再次输入密码"},
            { validator:(rule,value,callback)=>{
                if(value!==this.form.pwd){
                    callback( new Error('两次密码不一致'))
                }
                callback()
            }}
        ]
      },
      code:{
          captcha:"/api/captcha"
      }
    };
  },
  methods: {
      resetCaptcha(){
          this.code.captcha = '/api/captcha?_t'+new Date().getTime()
      },
      handleRegister(){
          this.$refs.registerForm.validate( async vaild=>{
              if(vaild){
                  console.log("校验成功")
                //   @todo 发送注册请求
                let obj = {
                    email:this.form.email,
                    nickName:this.form.nickName,
                    pwd:md5(this.form.pwd),
                    captcha:this.form.captcha
                }
                let ret = await this.$http.post('user/register',obj)
                console.log("ret",ret)
                // code=0 就是成功
                if(ret.code==0){
                    this.$alert('注册成功',"成功",{
                        confirmButtonText:"去登录",
                        callback:()=>{
                            this.$router.push('/login')
                        }
                    })
                }else{
                    this.$message.error(ret.message)
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