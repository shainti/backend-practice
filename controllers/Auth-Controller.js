exports.Viewlogin =
  ("/Login",
  (req, res, next) => {
    res.render("Partials/LoginFile");
  });

  exports.CheckLogin = ('/authlogin',(req, res, next) =>{
    console.log("succefully login")
    res.render("Partials/LoginFile")
  })
