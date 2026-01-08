const {app} = require('./server');
const path = require('path');
const express = require('express');
const {router: Addstudent} = require('./routes/Host-Router');
const Viewstudent = require('./routes/Student-Router');

app.set('view engine', 'ejs'); 
app.set('views', 'views');


app.use(express.urlencoded());
app.use(Addstudent);
app.use(Viewstudent);


app.get('/', (req, res, next) => {
res.render('Student/Home.ejs');
})