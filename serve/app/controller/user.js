
const md5 = require('md5')
const BaseController = require('./base');

const createRule={
  email:{type:"email"},
  nickName:{type:"string"},
  pwd:{type:"string"},
  captcha:{type:"string"}
}

const hashSalt = "kaikebai.com@12345";

class UserController extends BaseController {
  async login() {

  }


  async register() {
    const {ctx} = this;
    // console.log("body",ctx.request.body);
    // console.log("head",ctx.request.head);
    try{
      //校验传递的参数
      ctx.validate(createRule);
    }catch(e){
      return this.error('参数校验失败',-1, e.errors)
    }
    const {email,pwd,nickName,captcha} = ctx.request.body;
    console.log({email,pwd,nickName,captcha})
    console.log("session",ctx.session);
    if(captcha.toUpperCase() === ctx.session.captcha.toUpperCase()){
      //邮箱是否重复
      if(await this.checkEmail(email)){
        this.error("邮箱重复了")
      }else{
        const ret = await ctx.model.User.create({
          email,
          nickName,
          pwd:md5(pwd+hashSalt)
        })

        if(ret._id){
          this.message("注册成功了")
        }
      }
    }else{
      this.error("验证码错误")
    }


   // this.success({name:'kkb'})
  }

  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({ email });
    return user;
  }

  async verify() {
    // 校验用户名是否存在
  }

  async info() {

  }
}


module.exports = UserController;
