const path = require("path");
const Home = require("../models/home");

exports.viewstudentdetails =
  ("/Viewstudent",
  (req, res) => {
    Home.find().then((studentdetails) => {
      res.render("Student/ViewStudent", { studentdetails, islogedIn: req.islogedIn });
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
        res.render("Student/detail-Student", { Onestudent, islogedIn: req.islogedIn });
      }
    });
  });


exports.getstudentrule = (req, res) => {
  if (!req.session.islogedIn) {
    return res.redirect("/Login");
  }
  const studentid = req.params.studentid; // optional, but now correct
  const rulesfile = "rules.jpeg";
  const filepath = path.join(__dirname, "../../StudentRules", rulesfile);

  res.download(filepath, "rules.jpeg");
};

