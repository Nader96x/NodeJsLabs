const express=require("express");
const teacherController=require("../Controllers/teacherController");
const validator = require("../Core/Validators/validator");
const validateTeacher = require("../Core/Validators/validateTeacher");


const router=express.Router();

router.route("/teachers")
    .get(validator,teacherController.getAllTeachers)
    .post(validateTeacher.postValidator,validator,teacherController.addTeacher)
    .put(validateTeacher.putValidator,validator,teacherController.updateTeacher)
    .delete(validateTeacher.deleteValidator,validator,teacherController.deleteTeacher);




module.exports=router;