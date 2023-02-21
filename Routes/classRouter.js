const express=require("express");
const classController=require("../Controllers/classController");
const validator = require("../Core/Validators/validator");
const validateClass = require("../Core/Validators/validateClass");
const validateTeacher = require("../Core/Validators/validateTeacher");
const validateChild = require("../Core/Validators/validateChild");


const router=express.Router();

router.route("/class")
    .get(validator,classController.getAllClasses)
    .post(validateClass.postValidator,validator,classController.addClass)
    .put(validateClass.putValidator,validator,classController.updateClass)
    .delete(validateClass.deleteValidator,validator,classController.deleteClass);

router.route("/class/:id")
    .get(validateClass.getValidator,validator,classController.getClass)

router.route("/classchildern/:id")
    .get(validateClass.getValidator,validator,classController.getClassChildern)

router.route("/classTeacher/:id")
    .get(validateClass.getValidator,validator,classController.getClassSuper)


module.exports=router;