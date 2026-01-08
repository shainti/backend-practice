const express = require("express");
const Mongoose = require("mongoose");
const app = express();

const PORT = 3000;
const DB_Path =
"mongodb+srv://Sam_kashyap_2132:SSki12%40%26@cluster0.gk7ym4p.mongodb.net/?appName=Cluster0";
Mongoose.connect(DB_Path).then(()=>{
    console.log("Database Connect Successfully");
    app.listen(PORT, () => {
      console.log(`server start succefully at http://localhost:${PORT} `);
    });
}).catch(err =>{
    console.log("Error while connect DB",err);  
})

exports.app = app;
