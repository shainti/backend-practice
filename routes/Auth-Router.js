const express = require('express');
const StudentLogin = express.Router();
const { Viewlogin, CheckLogin, Checklogout, Getsignup, Postsignup} = require('../controllers/Auth-Controller');

StudentLogin.get('/Login', Viewlogin);
StudentLogin.post('/authlogin',CheckLogin )
StudentLogin.post("/logout",Checklogout)
StudentLogin.get("/signup",Getsignup);
StudentLogin.post('/signup',Postsignup);

module.exports = StudentLogin;
