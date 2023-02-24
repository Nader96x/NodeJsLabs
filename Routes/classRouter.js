const express=require("express");
const classController=require("../Controllers/classController");
const validator = require("../Core/Validators/validator");
const validateClass = require("../Core/Validators/validateClass");

const {checkAdmin} = require("../Core/Auth/Auth");


const router=express.Router();

router.route("/class")
    .all(checkAdmin)
    .get(validator,classController.getAllClasses)
    .post(validateClass.postValidator,validator,classController.addClass)
    .put(validateClass.putValidator,validator,classController.updateClass)
    .delete(validateClass.deleteValidator,validator,classController.deleteClass);

router.route("/class/:id")
    .all(checkAdmin)
    .get(validateClass.getValidator,validator,classController.getClass)

router.route("/classchildern/:id")
    .all(checkAdmin)
    .get(validateClass.getValidator,validator,classController.getClassChildern)

router.route("/classTeacher/:id")
    .all(checkAdmin)
    .get(validateClass.getValidator,validator,classController.getClassSuper)


module.exports=router;