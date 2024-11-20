const mogoose = require("mongoose");
const { number } = require("zod");

mogoose.connect("mongodb+srv://test:Test%40123@cluster0.aobok.mongodb.net/user")

const userSchema = new mogoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
});

const accountSchema =  new mogoose.Schema({
   userId:{
    type:mogoose.Schema.Types.ObjectId, //Refrence to the User model
    ref:'User',
    required:true
   },
   balance:{
    type:Number,
    required:true
   }
})

const Account=mogoose.model('Account', accountSchema)
const User = mogoose.model('User', userSchema);



module.exports = {
    Account,
    User

} 