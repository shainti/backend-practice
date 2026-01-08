const express = require('express');
const Viewstudent = express.Router();
const {viewstudentdetails}=require('../controllers/Student-Contoller');
const {viewParticular}= require('../controllers/Student-Contoller');


Viewstudent.get('/Viewstudent',viewstudentdetails);
Viewstudent.get('/Viewstudent/:studentid',viewParticular);


module.exports = Viewstudent;
 