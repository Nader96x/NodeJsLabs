const {body,validationResult}=require("express-validator");


module.exports= (req,res,next)=>{

    let result= validationResult(req);
    if(result.errors.length!=0)
    {
        let error=new Error("Wrong email or password");
        error.status=401; 
        next(error);
    }
    else
        next();
}
module.exports.postValidator = [
    body("password").isString().withMessage("Missing email or password"),
    body("email").isEmail().withMessage("Missing email or password")
];