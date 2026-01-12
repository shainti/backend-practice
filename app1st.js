//core modules
const { app } = require("./server");
const express = require("express");
const session = require("express-session");
const path = require('path');
const Mongodbstore = require("connect-mongodb-session")(session);
const multer = require("multer");

//main cluster path of db
const DB_Path =
  "mongodb+srv://Sam_kashyap_2132:SSki12%40%26@cluster0.gk7ym4p.mongodb.net/?appName=Cluster0";

//all router modules
const { router: Addstudent } = require("./routes/Host-Router");
const Viewstudent = require("./routes/Student-Router");
const StudentLogin = require("./routes/Auth-Router");

//for ejs file
app.set("view engine", "ejs");
app.set("views", "views");

//for add session in db
const store = new Mongodbstore({
  uri: DB_Path,
  collection: "sessions",
});
//for get all request data from form that we enter
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//find the random string for photo image path
const randomString = (length) => {
  const chracters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chracters.charAt(Math.floor(Math.random() * chracters.length));
  }
  return result;
};
//use storage for add file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});
//add file vailidation for backend
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" ||file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//add multer for add photo
const multeroption = {
  storage,
  fileFilter,
};
app.use(multer(multeroption).single("photo"));

//use session for save the details
app.use(
  session({
    secret: "student details",
    resave: false,
    saveUninitialized: true,
    store,
  })
);

//assign req.session.islogedIn value to islogIn bcz we assign all req.islogedin
app.use((req, res, next) => {
  req.islogedIn = req.session.islogedIn;
  next();
});

//if and person acces this file from upper url then it redirect to login page
app.use("/Host", (req, res, next) => {
  if (req.islogedIn) {
    next();
  } else {
    return res.redirect("/Login");
  }
});

//all the router are use for access router and controllers
app.use(Addstudent);
app.use(Viewstudent);
app.use(StudentLogin);

//first page load
app.get("/", (req, res, next) => {
  res.render("Student/Home.ejs", { islogedIn: req.islogedIn });
});
