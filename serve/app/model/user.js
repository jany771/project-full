module.exports = app=> {
    const mongoose =app.mongoose
    const Schema = mongoose.Schema

    const UserSchema = new Schema({
        email:{type:String, required:true},
        pwd:{type:String, required:true },
        nickName:{type:String, required:true },
        avatar:{type:String, required:false, default:"/user.png" },
    },{ timestamp:true});

    return mongoose.model('User',UserSchema)
}