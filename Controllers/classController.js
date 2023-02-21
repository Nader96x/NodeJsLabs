const mongoose=require("mongoose");


require("./../Model/classModel");

const ClassSchema=mongoose.model("classes");
const TeacherSchema=mongoose.model("teachers");
const ChildSchema=mongoose.model("childern");
exports.getAllClasses=(req,res,next)=>{
    ClassSchema.find({})
        .then(data=>{
            res.status(200).json({data});
        })
        .catch(err=>{
            next(err);
        })
}


exports.addClass=(request,response,next)=>{
        TeacherSchema.findOne({_id:request.body.supervisor},{_id:1})
            .then(data=>{
                    if(data==null)
                    {
                        throw Error("Teacher not Found");
                    }
                    else
                    return new  ClassSchema({
                        _id:request.body.id,
                        name:request.body.name,
                        supervisor:request.body.supervisor,
                        children:request.body.children
                    }).save()
            })
            .then(data=>{
                response.status(201).json({data})
            })
            .catch(error=>next(error))
}

exports.updateClass=(request,response,next)=>{
    ClassSchema.updateOne({
        _id:request.body.id
    },{
        $set:{
            name:request.body.name,
            supervisor:request.body.supervisor,
            children:request.body.children
        }
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("Child not found"));
        }
        else
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}
exports.deleteClass=(request,res,next)=>{
    ClassSchema.deleteOne({_id:request.body.id})
        .then((data)=>{
                res.status(200).json({data});
        })
        .catch(error=>{
            next(error);
        })
}


exports.getClass=(request,response,next)=>{
    // response.status(200).json({data:request.params.id});
    ClassSchema.findOne({_id:request.params.id})
        .then(data=>{
            response.status(200).json({data});
        })
        .catch(err=>{
            next(err);
        })
}
exports.getClassChildern=(req,res,next)=>{
    ClassSchema.findOne({_id:req.params.id},{children:1})
    .populate({path:"children",select:{fullName:1}})
    .then(data=>{
        if(data == null) throw new Error("this class not exist");
        else res.status(200).json({data});
    })
    .catch(error=>next(error))
}
exports.getClassSuper=(req,res,next)=>{
    ClassSchema.findOne({_id:req.params.id},{supervisor:1})
    .populate({path:"supervisor",select:{fullname:1}})
    .then(data=>{
        if(data == null) throw new Error("this class not exist");
        else res.status(200).json({data});
    })
    .catch(error=>next(error))
}
