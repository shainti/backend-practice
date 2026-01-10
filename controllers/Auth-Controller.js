const { name } = require("ejs");
const { check, validationResult } = require("express-validator");
const user = require("../models/user");

exports.Viewlogin =
  ("/Login",
  (req, res, next) => {
    res.render("Partials/LoginFile",{islogedIn: false});
  });

  exports.CheckLogin = ('/authlogin',(req, res, next) =>{
    req.session.islogedIn = true;
    console.log("succefully login")
    res.redirect("/");
  })

  exports.Checklogout=('/logout',(req, res, next)=>{
    req.session.destroy(()=>{
      res.redirect('/');
    })

  })
  exports.Getsignup=('/signup',(req, res, next)=>{
    res.render('Partials/signup',{
    islogedIn: false,
    error: [],
    oldInput: {Name: "", email: "", password: "", confirmPassword: ""}
  });
    })

    exports.Postsignup=[
      check("Name")
      .trim()
      .isLength({min: 3})
      .withMessage("Name character should be 3 chracters"),

      check("email")
      .isEmail()
      .withMessage("Please enter correct email"),

      check("password")
      .isLength({min: 6})
      .withMessage("Please enter vaild password")
      .matches(/[a-z]/)
      .withMessage("Please use alphabets with password")
      .matches(/[0-9]/)
      .withMessage("Please use atleast one number in password"),

      check("confirmpassword")
      .trim()
      .custom((value, {req}) =>{
        if(value !== req.body.password){
          throw new Error("password do not match")
        }
        return true;
      }),

      // check('role')
      // .isEmpty()
      // .withMessage("please select one from each ")
      // .isIn(['guest', 'host'])
      // .withMessage("please select vaild option"),

    ('/signup',(req, res, next)=>{
     const { Name, email, password, confirmPassword} = req.body;
    const error = validationResult(req);
    if(!error.isEmpty()){
      console.log(error);
      return res.status(422).render('partials/signup',{
        islogedIn: false,
        error: error.array().map(err => err.msg),
        oldInput: {Name, email, password, confirmPassword}
      });
    }
    const userr = new user({Name, email, password});
    userr.save().then(()=>{
      res.redirect('/')
    }).catch(err =>{
      // res.status(422).render('partials/signup',{
      //   islogedIn: false,
      //   error: [err.message],
      //   oldInput: {Name, email, password, confirmPassword}
      // });
       console.log("error",err)
    })
    res.redirect('/')
    })]

