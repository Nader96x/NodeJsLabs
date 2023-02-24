const express=require("express");
const loginController=require("../Controllers/loginController");

const router=express.Router();

router.route("/login")
    .post(loginController.login);

module.exports=router;

