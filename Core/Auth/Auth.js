const jwt = require("jsonwebtoken");

module.exports = (request,res,next)=>{
    try{
        const token = request.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decodedToken);
        request.id = decodedToken.id;
        request.role = decodedToken.role;
        next();
    }catch(error){
        error.status=401; // Unauthorized
        error.message="Unauthorized";
        next(error);
    }
}

module.exports.checkAdmin = (request,res,next)=>{
    if(request.role == "admin"){
        next();
    }else{
        let error = new Error("Not Allowed - Forbidden");
        error.status=403;
        next(error);
    }
}

module.exports.checkAdminOrTeacher = (request,res,next)=>{
    if(request.role == "admin" || request.role == "teacher"){
        next();
    }else{
        let error = new Error("Not Allowed - Forbidden");
        error.status=403;
        next(error);
    }
}