const jwd = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Teacher = mongoose.model("teachers");

exports.login = (request, response, next) => {
    if (! request.body.email || ! request.body.password)
        next(new Error("Missing email or password"));
    else {
        Teacher.findOne({email:request.body.email})
            .then(teacher=>{
                if (! teacher)
                    throw new Error("Wrong email or password");
                else {
                    let result = bcrypt.compareSync(request.body.password, teacher.password)
                    // console.log(result); // true
                    // console.log(teacher); // Object
                    // console.log( process.env);
                    if (! result)
                        throw new Error("Wrong email or password");
                    else {
                        // check admin Role
                        if(teacher._id == "63f352dc25ea24280244e2ef")
                            request.role="admin";
                        else
                            request.role="teacher";
                        let token = jwd.sign({id:teacher._id,role:request.role}, process.env.SECRET_KEY, {expiresIn: "24h"});
                        response.status(200).json({token:token,"message":"Authorized"});
                    }
                }
            })
            .catch(error=>{
                error.status=401; // Unauthorized
                
                next(error);
            });
        }
}
