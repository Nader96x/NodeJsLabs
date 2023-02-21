const {body,param,query}=require("express-validator");
exports.getValidator = [
    param("id").isMongoId().withMessage("Id should be ObjectID")
];
exports.postValidator = [
    body("id").isMongoId().withMessage("Id should be ObjectID"),
    body("fullname").isString().withMessage("Fullname should be string")
        .isLength({min:5}).withMessage("Fullname should be at least 8 letters."),
    body("password").isString().withMessage("password should be string")
        .isLength({min:8}).withMessage("Password should be at least 8 letters."),
    body("email").isEmail().withMessage("Email should be valid"),
    body("image").isString().withMessage("image should be string"),

];
exports.putValidator = [
    body("id").isMongoId().withMessage("Id should be ObjectID"),
    body("fullname").optional().isString().withMessage("Fullname should be string")
        .isLength({min:5}).withMessage("Fullname should be at least 8 letters."),
    body("password").optional().isString().withMessage("password should be string")
        .isLength({min:8}).withMessage("Password should be at least 8 letters."),
    body("email").optional().isEmail().withMessage("Email should be valid"),
    body("image").optional().isString().withMessage("image should be string"),
];
exports.deleteValidator = [
    body("id").isMongoId().withMessage("Id should be ObjectID"),
];