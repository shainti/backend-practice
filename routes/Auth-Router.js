const express = require('express');
const StudentLogin = express.Router();
const { Viewlogin, CheckLogin } = require('../controllers/Auth-Controller');

StudentLogin.get('/Login', Viewlogin);
StudentLogin.post('/authlogin',CheckLogin )

module.exports = StudentLogin;
