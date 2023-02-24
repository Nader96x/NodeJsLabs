const express=require("express");
const loginController=require("../Controllers/loginController");
const validateLogin = require("../Core/Validators/validateLogin");

const router=express.Router();

router.route("/login")
    .post(validateLogin.postValidator,validateLogin,loginController.login);

module.exports=router;

