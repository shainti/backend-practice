exports.Viewlogin =
  ("/Login",
  (req, res, next) => {
    res.render("Partials/LoginFile",{islogedIn: false});
  });

  exports.CheckLogin = ('/authlogin',(req, res, next) =>{
    // res.cookie("islogedIn", true);
    req.session.islogedIn = true;
    console.log("succefully login")
    res.redirect("/");
  })

  exports.Checklogout=('/logout',(req, res, next)=>{
    req.session.destroy(()=>{
      res.redirect('/');
    })

  })
