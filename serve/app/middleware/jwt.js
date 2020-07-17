//解析token的中间件，也可以用egg-jwt，自己封装更适合了解原理

const jwt = require("jsonwebtoken");

//类似koa的中间件
module.exports = ({app})=>{
    return async function verify(ctx,next){
        if(!ctx.request.header.autorization){
            ctx.body ={
                code:-1,
                message:'用户没有登录'
            }
            return
        }
        const token = ctx.request.header.autorization.replace('Bearer',' ');
        try{
            const ret= await jwt.verify(token,app.config.jwt.secret)
            console.log(ret);
            ctx.state.email = ret.email;
            ctx.state.userid = ret._id;
            await next()
        }catch(err){
            if(err.name == 'TokenExpiredError'){
                ctx.body = {
                    code:-666,
                    message:'登录过期了'
                }
            }else{
                ctx.body = {
                    code:-1,
                    message:'用户信息出错'
                }
            }
        }
    }
}