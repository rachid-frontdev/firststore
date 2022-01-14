const userSchema =  mongoose.Schema({
  name:String,
  email:String,
  password:String,
  confirmPassword:String
});
//const User = mongoose.model('User', userSchema); //collection user +s
