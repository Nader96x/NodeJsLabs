const mongoose=require("mongoose");

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

require("./../Model/teacherModel");

const TeachersSchema=mongoose.model("teachers");

exports.getAllTeachers=(req,res,next)=>{
    TeachersSchema.find({})
        .then((data)=>{
                res.status(200).json({data});
        })
        .catch(error=>{
            next(error);
        })
}


exports.addTeacher=(request,response,next)=>{

       new TeachersSchema({
        _id:request.body.id,
        fullname:request.body.fullname,
        password: bcrypt.hashSync(request.body.password, salt) , // Bonus
        email:request.body.email,
        image:request.body.image,
       }).save()  //insertOne
       .then(data=>{
        response.status(201).json({data});

       })
       .catch(error=>next(error))
}

exports.updateTeacher=(request,response)=>{

    if ( request.role== "teacher" && request.body.id != request.id){
        let error = new Error("Not Premited");
        error.status= 403;
        next(error);
        return;
   }

    let hash = request.body.password?
                bcrypt.hashSync(request.body.password, salt)
                :
                request.body.password;
    TeachersSchema.updateOne({
        _id:request.body.id
    },{
        $set:{
            fullname:request.body.fullname,
            password:hash,
            email:request.body.email,
            image:request.body.image,
        }
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("Teacher not found"));
        }
        else
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}
exports.deleteTeacher=(request,res,next)=>{
    TeachersSchema.deleteOne({_id:request.body.id})
        .then((data)=>{
                res.status(200).json({data});
        })
        .catch(error=>{
            next(error);
        })
}


exports.getTeacher=(request,res,next)=>{
    TeachersSchema.findOne({_id:request.params.id})
        .then((data)=>{
                if ( request.role== "teacher" && request.params.id != request.id){
                     let error = new Error("Not Premited");
                     error.status= 403;
                     throw error;
                }
                res.status(200).json({data});
        })
        .catch(error=>{
            next(error);
        })
}