const path = require('path');
const express = require('express');
const router = express.Router();
const {Addhomes,studentlist,Hostviewdetails,Hosteditview, Updatestudent, Deletestudent}  = require('../controllers/Host-Controller');

router.get('/Addstudent',Addhomes);
router.post('/submitdetails', studentlist);
router.get('/Hostview', Hostviewdetails);
router.get('/HostviewStudent/:studentid',Hosteditview);
router.post('/updatestudent',Updatestudent)
router.post('/Deletestudent/:studentid',Deletestudent);


module.exports = {
  router
};
