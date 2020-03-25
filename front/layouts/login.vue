<template>
  <div>
    <!-- <div>导航</div> -->
    <nuxt></nuxt>
    <!-- <div>底部信息</div> -->
  </div>
</template>

<script>
export default {
    
}
</script>
<style lang="stylus" >
  .login-container
    width 100%
    height  100%
    .login-form
      width 550px
      padding 150px 0
      margin 0 auto 
      overflow hidden
      .title-container
        text-align center
        margin-bottom 20px
        img
          width 200px
      .captcha-container
        width 400px
        .captcha
          position absolute
          right -150px
          img
            width 120px
            height 40px    
</style>