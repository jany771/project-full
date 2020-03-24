'use strict';
const svgCaptcha = require('svg-captcha')
const Controller = require('egg').Controller;

class UtilController extends Controller {
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
}

module.exports = UtilController;
