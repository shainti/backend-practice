const path = require("path");
const Home = require("../models/home");

exports.viewstudentdetails =
  ("/Viewstudent",
  (req, res) => {
    Home.find().then((studentdetails) => {
      res.render("Student/ViewStudent", { studentdetails });
    });
  });

  
exports.viewParticular =
  ("/Viewstudent/:studentid",
  (req, res) => {
    const studentid = req.params.studentid;
    Home.findById(studentid).then((Onestudent) => {
      if (!Onestudent) {
        console.error("Home not find ");
        res.redirect("/ViewStudent");
      } else {
        console.log(Onestudent);
        res.render("Student/detail-Student", { Onestudent });
      }
    });
  });
