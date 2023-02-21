const mongoose=require("mongoose");
require("./../Model/childModel");

const ChildSchema=mongoose.model("childern");
exports.getAllChilds=(req,res,next)=>{
    ChildSchema.find({})
        .then(data=>{
            res.status(200).json({data});
        })
        .catch(error=>{
            next(error);
        })

}


exports.addChild=(request,response,next)=>{
    // console.log(request.body);
      new ChildSchema({
        _id:request.body.id,
        fullName:request.body.fullname,
        age:request.body.age,
        level:request.body.level,
        address:{
            city:request.body.address.city,
            street:request.body.address.street,
            building:request.body.address.building,
        }
       }).save()  //insertOne
       .then(data=>{
        response.status(201).json({data});

       })
       .catch(error=>next(error))
}

exports.updateChild=(request,response,next)=>{

    if(!request.body.address)request.body.address={}
    ChildSchema.updateOne({
        _id:request.body.id
    },{
        $set:{
            fullName:request.body.fullname,
            age:request.body.age,
            level:request.body.level,
            address:{
                city:request.body.address.city,
                street:request.body.address.street,
                building:request.body.address.building,
            },
            // "address.city":request.body.city,
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
exports.deleteChild=(request,res,next)=>{
    ChildSchema.deleteOne({_id:request.body.id})
        .then((data)=>{
                res.status(200).json({data});
        })
        .catch(error=>{
            next(error);
        })
}


exports.getChild=(request,res,next)=>{
    // response.status(200).json({data:request.params.id});
    ChildSchema.findOne({_id:request.params.id})
        .then(data=>{
            res.status(200).json({data});
        })
        .catch(error=>{
            next(error);
        })
}