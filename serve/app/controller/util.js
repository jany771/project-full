'use strict';
const svgCaptcha = require('svg-captcha')
const Controller = require('egg').Controller;
const BaseController = require('./base');


class UtilController extends BaseController {
    async captcha() {
      const captcha = svgCaptcha.create({
        size: 4 ,// 验证码长度
        ignoreChars: '0o1i' ,// 验证码字符中排除 0o1i
        noise: 3 ,// 干扰线条的数量
        color: false ,// 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: 'rgba(36, 173, 243,.3)' ,// 验证码图片背景颜色
      });
      console.log( " captcha=> ",captcha.text);
      this.ctx.session.captcha= captcha.text;
    this.ctx.response.type="image/svg+xml";     
      this.ctx.body = captcha.data;
    }

    async sendCode(){
      const {ctx} = this;
      const email = ctx.query.email;
      let code = Math.random().toString().slice(2,6);
      console.log('邮箱：'+ email + '验证码：' + code);
      ctx.session.emailcode = code;

      const subject = '开课吧验证码';//标题
      const text = '';
      const html = `<h2>小社区</h2><a href="https://kaikeba.com"><span>${code}</span></a>`;
      const hasSend = await this.service.tools.sendMail(email, subject, text, html);
      if(hasSend){
        this.message('发送成功！')
      }else{
        this.error('发送失败')
      }
    }
}

module.exports = UtilController;
