const mongoose=require("mongoose");


require("./../Model/classModel");

const ClassSchema=mongoose.model("classes");
const TeacherSchema=mongoose.model("teachers");
const ChildSchema=mongoose.model("childern");
exports.getAllClasses=(req,res,next)=>{
    ClassSchema.find({})
        .populate({path:"supervisor",select:{fullname:1}})
        .populate({path:"children",select:{fullName:1}})
        .then(data=>{
            res.status(200).json({data});
        })
        .catch(err=>{
            next(err);
        })
}
function removeDuplicates(arr) {
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
}

exports.addClass=(request,response,next)=>{
        TeacherSchema.findOne({_id:request.body.supervisor},{_id:1})
            .then(data=>{
                    if(data==null) throw Error("Teacher not Found");
                    else{
                        return ChildSchema.find({_id:{$in:request.body.children}},{_id:1})
                    }
            })
            .then(data=>{
                data = data.map(obj=>Number(obj.id));
                request.body.children = request.body.children.map(id=>Number(id));
                request.body.children = removeDuplicates(request.body.children);
                if(data.length!=request.body.children.length){
                    // console.log(request.body.children);
                    // console.log(request.body.children.filter(n => !data.includes(n)));
                    let rest = request.body.children.filter(n => !data.includes(n))
                    throw Error(rest + " Childern not Found");
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

exports.updateClass=async (request,response,next)=>{
    try{
        let data ='';
        if(request.body.supervisor){
            data = await TeacherSchema.findOne({_id:request.body.supervisor},{_id:1})
            if(data==null) throw Error("Teacher not Found");
        }

        if(request.body.children){
            data = await ChildSchema.find({_id:{$in:request.body.children}},{_id:1})
            data = data.map(obj=>Number(obj.id));
            request.body.children = request.body.children.map(id=>Number(id));
            request.body.children = removeDuplicates(request.body.children);
            if(data.length!=request.body.children.length){
                let rest = request.body.children.filter(n => !data.includes(n))
                throw Error(rest + " Childern not Found");
            }
        }

        data = await ClassSchema.updateOne({
            _id:request.body.id
        },{
            $set:{
                name:request.body.name,
                supervisor:request.body.supervisor,
                children:request.body.children
            }
        })
        if(data.matchedCount==0)
            throw new Error("Class not found")
        else
            response.status(200).json({data:await ClassSchema.findOne({_id:request.body.id})});
    }
    catch(error){
        next(error);
    }
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
        .populate({path:"supervisor",select:{fullname:1}})
        .populate({path:"children",select:{fullName:1}})
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
