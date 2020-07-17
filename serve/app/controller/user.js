
const md5 = require('md5');
const BaseController = require('./base');
const jwt = require('jsonwebtoken');

const createRule={
  email:{type:"email"},
  nickName:{type:"string"},
  pwd:{type:"string"},
  captcha:{type:"string"}
}

const hashSalt = "kaikebai.com@12345";

class UserController extends BaseController {
  async login() {
    //this.success("token")
    const {ctx,app} = this;
  
    const {email,captcha,pwd,emailcode} = ctx.request.body;
    console.log(emailcode);
    console.log("ctx.request.body:",ctx.request.body);
    if(emailcode !== ctx.session.emailcode){
      return this.error("邮箱验证码错误")
    }

    if(captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()){
      return this.error("验证码错误")
    }

    const user = await ctx.model.User.findOne({
      email,
      pwd:md5(pwd+hashSalt)
    })

    if(!user){
      return this.error("用户名或密码错误")
    }

    //用户名信息加密成token 返回
    const token = jwt.sign({
      _id:user._id,
      email     
    },
    app.config.jwt.secret,{
      expiresIn:"1h"
    })

    this.success({
      token,
      email,
      nickName:user.nickName
    })

  }


  async register() {
    const {ctx} = this;
    // console.log("body",ctx.request.body);
    // console.log("head",ctx.request.head);
    try{
      //校验传递的参数
      ctx.validate(createRule);
    }catch(e){
      console.log(e)
      return this.error('参数校验失败',-1, e.errors)
    }
    const {email,pwd,nickName,captcha} = ctx.request.body;
    console.log({email,pwd,nickName,captcha})
    console.log("session",ctx.session);
    if(captcha.toUpperCase() === ctx.session.captcha.toUpperCase()){
        this.error("验证码错误")
      }
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
    const {ctx} = this
    const {email} = ctx.state
    const user = await this.checkEmail(email)
    this.success(user)
  }
}


module.exports = UserController;
