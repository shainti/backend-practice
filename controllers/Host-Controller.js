const path = require("path");
const Home = require('../models/home');

exports.Addhomes =
  ("/Addstudent",
  (req, res) => {
    res.render("Host/Addstudent",{islogedIn: req.islogedIn});
  });

  
exports.studentlist =
  ("/submitdetails",
  (req, res) => {
    const { FullName, Email, Password } = req.body;
    const home = new Home({FullName, Email, Password}); //call class save funtion to pusn all data in class
    home.save().then(() => {
      console.log("Student Details saved successfully");
    });
    res.sendFile(path.join(__dirname, "../views/Host", "success.html"));
  });

exports.Hostviewdetails =
  ("/Hostview",
  (req, res) => {
    Home.find().then(studentdetails => {  //find for use find the student details 
      res.render("Host/Hostview", { studentdetails, islogedIn: req.islogedIn });
    });
  });

exports.Hosteditview =
  ("/HostviewStudent/:studentid",
  (req, res) => {
    const studentid = req.params.studentid;
    Home.findById(studentid) //findbyid for find any particular student by there id 
      .then((Onestudent) => {
        res.render("Host/EditDetail", { studentid, Onestudent,islogedIn: req.islogedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error fetching student");
      });
  });


exports.Updatestudent = (req, res, next) => {
  const {FullName, Email, Password, id } = req.body;//call class save funtion to pusn all data in class
 Home.findById(id).then((home)=>{
  home.FullName = FullName,
  home.Email = Email,
  home.Password = Password
  home.save().then(result =>{
    console.log("home Update successfully",result);
  }).catch(err =>{
   console.log("Error while update the studen",err);
  })
   res.sendFile(path.join(__dirname, "../views/Host", "success.html"));
  });
 };

exports.Deletestudent =
  ("/Deletestudent",
  (req, res) => {
    const studentid = req.params.studentid;
    console.log("delete student", studentid);
    Home.findByIdAndDelete(studentid).then((error)=> { //use findbyidanddelte fucntion for delete the specific record
      if (error) {
        console.log("student not found", error);
      }
      res.sendFile(path.join(__dirname, "../views/Host", "success.html"));
    });
  });
