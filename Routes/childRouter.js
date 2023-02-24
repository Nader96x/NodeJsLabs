const express=require("express");
const childController=require("../Controllers/childController");
const validator = require("../Core/Validators/validator");
const validateChild = require("../Core/Validators/validateChild");

const {checkAdmin} = require("../Core/Auth/Auth");

const router=express.Router();

router.route("/child")
    .all(checkAdmin)
    .get(validator,childController.getAllChilds)
    .post(validateChild.postValidator,validator,childController.addChild)
    .put(validateChild.putValidator,validator,childController.updateChild)
    .delete(validateChild.deleteValidator,validator,childController.deleteChild);

router.route("/child/:id")
    .all(checkAdmin)
    .get(validateChild.getValidator,validator,childController.getChild)



module.exports=router;