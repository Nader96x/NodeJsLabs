const express=require("express");
const teacherController=require("../Controllers/teacherController");
const validator = require("../Core/Validators/validator");
const validateTeacher = require("../Core/Validators/validateTeacher");

const {checkAdminOrTeacher,checkAdmin} = require("../Core/Auth/Auth");

const router=express.Router();

router.route("/teachers")
    // .all(checkAdmin)
    .get(checkAdmin,teacherController.getAllTeachers)
    .post(checkAdmin,validateTeacher.postValidator,validator,teacherController.addTeacher)
    .put(checkAdminOrTeacher,validateTeacher.putValidator,validator,teacherController.updateTeacher)
    .delete(checkAdmin,validateTeacher.deleteValidator,validator,teacherController.deleteTeacher);

router.route("/teachers/:id")
    .all(checkAdminOrTeacher)
    .get(validateTeacher.getValidator,validator,teacherController.getTeacher);

module.exports=router;