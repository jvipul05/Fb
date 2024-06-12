var express = require('express');
var router = express.Router();
var userModel = require("./users");

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});
router.get('/signin', function(req, res, next) {
  res.render('index');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.post('/registerinfo', function(req, res, next) {
/*userModel.create({
  username: req.body.username,
  name: req.body.name,
  email: req.body.email,
  phone: req.body.mobile,
  password: req.body.password,
  image: req.body.image
}).then((user)=>{
  res.redirect('/feeds');
})
}
);*/
var newuser = new userModel({
  username: req.body.username,
  name: req.body.name,
  email: req.body.email,
  phone: req.body.mobile,
  image: req.body.image
})
userModel.register(newuser , req.body.password).then(
  function(registereduser){ 
  passport.authenticate("local")(req, res, function(){
    res.redirect('/feeds');
  })
})
});

router.post('/loginuser', passport.authenticate("local", {
  successRedirect: '/feeds',
  failureRedirect: '/signin'
}), function(req, res, next){
});

router.get('/feeds',isLoggedin, function(req, res, next) {
 userModel.find({}).then((users)=>{
   res.render('users', {users: users});
 })
});

router.get('/like/:id', function(req, res, next) {
  userModel.findByIdAndUpdate(req.params.id, {$inc: {like: 1}}).then((user)=>{
    res.redirect('/feeds');
  })
});

router.get('/delete/:id', function(req, res, next) {
  userModel.findByIdAndDelete(req.params.id).then((user)=>{
    res.redirect('/feeds');
  })
});
module.exports = router;


router.get('/profile', function(req, res, next) {
  res.render('profile');
});


function isLoggedin(req,res,next)
{
  if(req.isAuthenticated())
  {
    return next();
  }
  res.redirect('/signin');
}
{


}