const express = require('express');
const Viewstudent = express.Router();
const {viewstudentdetails, viewParticular, getstudentrule}=require('../controllers/Student-Contoller');


Viewstudent.get('/Viewstudent',viewstudentdetails);
Viewstudent.get('/Viewstudent/:studentid',viewParticular);
Viewstudent.get("/rules/:studentid", getstudentrule);



module.exports = Viewstudent;
 