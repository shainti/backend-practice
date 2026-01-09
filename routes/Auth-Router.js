const express = require('express');
const StudentLogin = express.Router();
const { Viewlogin, CheckLogin, Checklogout } = require('../controllers/Auth-Controller');

StudentLogin.get('/Login', Viewlogin);
StudentLogin.post('/authlogin',CheckLogin )
StudentLogin.post("/logout",Checklogout)

module.exports = StudentLogin;
