const { check, validationResult } = require("express-validator");
const user = require("../models/user");
const bcrypt = require('bcryptjs'); //use for hash the pass 

exports.Viewlogin =
  ("/Login",
  (req, res, next) => {
    res.render("Partials/LoginFile",{
    islogedIn: false,
    error: [],
    oldInput:{email:""}
  });
  });

  exports.CheckLogin = async (req, res, next) =>{  //chack email vaildation 
    const {email, password} = req.body;
    const userr = await user.findOne({email});  // it return promise from db then we use it thats why me make it asycn function
    if(!userr){
      return res.status(422).render('partials/LoginFile',{
        islogedIn: false, 
        error: ["invaild email"],
        oldInput: ({email, password}),
      });
    }
    const ismatch = await bcrypt.compare(password, userr.password) //use bcrypt compare function for now password
    if(!ismatch){                      //and compare password with db pass and that pass that user enter
      return res.status(422).render('partials/LoginFile',{
        islogedIn: false, 
        error: ["invaild password"],
        oldInput: ({email, password}),
      });
    }
    req.session.islogedIn = true;
    req.session.user = user;
    await req.session.save();
    res.redirect("/");
  }

  exports.Checklogout=('/logout',(req, res, next)=>{
    req.session.destroy(()=>{
      res.redirect('/');
    })

  })
  exports.Getsignup=('/signup',(req, res, next)=>{
    res.render('Partials/signup',{
    islogedIn: false,
    error: [],  //  pass the value that when it load page it do not show undefiened
    oldInput: {Name: "", email: "", password: "", confirmPassword: ""} // send all the value to html page
  });
    })

    exports.Postsignup=[
      check("Name")  // this all the vailidators for cheack at server side is data is correct or not 
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
      .custom((value, {req}) =>{ // it chack that out password value of we inter in cpass value are equal
        if(value !== req.body.password){
          throw new Error("password do not match")
        }
        return true;
      }),

      
      ('/signup',(req, res, next)=>{
        const { Name, email, password, confirmPassword} = req.body;
        const error = validationResult(req);  //use validator and take all values
        if(!error.isEmpty()){ // if the error occour then it show on screen
      console.log(error);
      return res.status(422).render('partials/signup',{
        islogedIn: false,  //tell that the we are on signup page
        error: error.array().map(err => err.msg), //pass err for show this error to the html file
        oldInput: {Name, email, password, confirmPassword} // use for set value to old
      });
    }

    bcrypt.hash(password, 12).then(hashpassword => { //if the error are not occour then it  will execute this
      const userr = new user({Name, email, password: hashpassword}); //set password as hashpass
      return userr.save(); //save the data in db
    }).then(()=>{  //.then are use for promise 
      res.redirect('/');   // this is hashed password i save
    }).catch(err => { //if any error occur
      console.log("error",err)
    })
    res.redirect('/')
  })]
  
  // const userr = new user({Name, email, password}); //way of normal type of passwrod save
  // userr.save().then(()=>{
  //   res.redirect('/')
  // }).catch(err =>{
    // res.status(422).render('partials/signup',{
    //   islogedIn: false,
    //   error: [err.message],
    //   oldInput: {Name, email, password, confirmPassword}      // this is normal pass i save 
    // });
  // })
  
  // check('role')    //for cheack the guest and host validations
  // .isEmpty()
  // .withMessage("please select one from each ")
  // .isIn(['guest', 'host'])
  // .withMessage("please select vaild option"),