const {app} = require('./server');
const express = require('express');
const session = require('express-session');
const Mongodbstore = require('connect-mongodb-session')(session);
const DB_Path =
"mongodb+srv://Sam_kashyap_2132:SSki12%40%26@cluster0.gk7ym4p.mongodb.net/?appName=Cluster0";

const {router: Addstudent} = require('./routes/Host-Router');
const Viewstudent = require('./routes/Student-Router');
const StudentLogin = require('./routes/Auth-Router');
const e = require('express');

app.set('view engine', 'ejs'); 
app.set('views', 'views');
const store = new Mongodbstore({
    uri: DB_Path,
    collection: 'sessions'
})

app.use(express.urlencoded());
app.use(session({
    secret: "student details",
    resave: false,
    saveUninitialized: true,
    store
}))

app.use((req, res, next)=>{
req.islogedIn = req.session.islogedIn
next();
})


app.use('/Host',(req, res, next)=>{
if(req.islogedIn){
    next();
}
else{
    return res.redirect('/Login');
}
});


app.use(Addstudent);
app.use(Viewstudent);
app.use(StudentLogin);


app.get('/', (req, res, next) => {
res.render('Student/Home.ejs',{islogedIn: req.islogedIn});
})