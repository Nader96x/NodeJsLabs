const express=require("express");
const multer = require("multer");
const path = require("path");

const teacherController=require("../Controllers/teacherController");
const validator = require("../Core/Validators/validator");
const validateTeacher = require("../Core/Validators/validateTeacher");

const {checkAdminOrTeacher,checkAdmin} = require("../Core/Auth/Auth");


//http://expressjs.com/en/resources/middleware/multer.html
const upload = multer({ 
        fileFilter: (req, file, cb) => {
            if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
                cb(null, true);
            } else {
                cb(new Error("file should be Image only."));
            }
        } ,
        storage: multer.diskStorage({
                destination:(req, file, cb) => {
                    // console.log(file);
                    cb(null, path.join(__dirname,"..","images","teachers"));
                },
                filename: (req, file, cb) => {
                    // console.log(req.body);
                    // console.log(file);
                    // console.log(req.file);
                    let ext = path.extname(file.originalname);
                    let fileName = path.basename(file.originalname,ext);
                    let finalName =  file.fieldname + '-' + fileName + '-' + Date.now() + ext
                    cb(null,finalName);
                }
            }),
});



const log = (req,res,next)=>{
    console.log(req.body);
    console.log(req.file);
    next();
}
const setImage = (req,res,next)=>{
    if (req.file && req.file.path)
        req.body.image = req.file.path;
    next();
}

const router=express.Router();

router.route("/teachers")
    // .all(checkAdmin)
    .get(checkAdmin,teacherController.getAllTeachers)
    .post(upload.single('image'),setImage,checkAdmin,validateTeacher.postValidator,validator,teacherController.addTeacher)
    .put(upload.single('image'),setImage,checkAdminOrTeacher,validateTeacher.putValidator,validator,teacherController.updateTeacher)
    .delete(checkAdmin,validateTeacher.deleteValidator,validator,teacherController.deleteTeacher);

router.route("/teachers/:id")
    .all(checkAdminOrTeacher)
    .get(validateTeacher.getValidator,validator,teacherController.getTeacher);

module.exports=router;