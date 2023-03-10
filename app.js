const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose=require("mongoose");
const fs = require('fs');

const teacherRoute = require("./Routes/teacherRoute");
const childRoute = require("./Routes/childRouter");
const classRoute = require("./Routes/classRouter");
const loginRoute = require("./Routes/loginRouter");

const AuthMW = require("./Core/Auth/Auth");

const server = express();
const port = process.env.port||8080;
process.env.SECRET_KEY = "p@$$w0rdHa$h1ng"

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/ITIDB")
        .then(()=>{
            console.log("DB connected");
            server.listen(port,()=>{
                console.log("listening... on port: ",port);
            });
        })
        .catch(error=>{
            console.log("Db Problem "+error);
        })




// Cors MW
server.use(cors());
// Logger MW
server.use(morgan("dev"));



// Body Parser MW
server.use(express.json());
server.use(express.urlencoded({extended:false}));

// Login
server.use(loginRoute);
// Auth
server.use(AuthMW);

// Routes MW
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

// Not found MW
server.use((request,response)=>{
    response.status(404).json({message:"Not Found"});
});

// Error MW
server.use((err,req,res,next)=>{
    let status=err.status||500;
    res.status(status).json({message:err+""});
    if(req.file && req.file.path)
        fs.unlinkSync(req.file.path);
});


