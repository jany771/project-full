
const BaseController = require('./base');

const createRule={
  email:{type:"email"},
  nickName:{type:"string"},
  pwd:{type:"string"},
  captcha:{type:"string"}
}

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

    this.success({name:'kkb'})
  }

  async verify() {
    // 校验用户名是否存在
  }

  async info() {

  }
}


module.exports = UserController;
