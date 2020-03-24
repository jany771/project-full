<template>
  <div>
      <el-form class="login-form" > 
          <el-form-item props="email">
              <span>
                  <i class="el-icon-mobile"></i>
              </span>
              <el-input placeholder="用户名">

              </el-input>
          </el-form-item>
          <el-form-item props="password">
              <span>
                  <i class="el-icon-lock"></i>
              </span>
              <el-input placeholder="密码">

              </el-input>
          </el-form-item>
           <el-form-item props="captcha">
             
              <el-input placeholder="验证码">
              </el-input>
              <img @click="updateCaptcha" :src="captchaUrl" alt="">
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    layout:"login",
    data () {
        return {
           // rules:[],
           captchaUrl:"/api/captcha?_t="+new Date().getTime()
           
        }
    },
    methods: {
        updateCaptcha(){
            this.captchaUrl = "/api/captcha?_t="+new Date().getTime()
        }
    }
}
</script>


<style lang="scss">
.login-form{
    width: 600px;
    margin: 0 auto;
}
</style>