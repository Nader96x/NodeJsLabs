const {body,param,query}=require("express-validator");
exports.getValidator = [
    param("id").isNumeric().withMessage("Id should be Number"),
];
exports.postValidator = [
    body("id").optional().isNumeric().withMessage("Id should be Number"),
    body("name").isString().withMessage("name should be string"),
    body("supervisor").isMongoId().withMessage("supervisor Id should be ObjectID"),
    body("children").isArray().withMessage("Array Of Childerns Should Exists"),
    body("children.*").isInt().withMessage("Children Id should be Number"),

];
exports.putValidator = [
    body("id").isNumeric().withMessage("Id should be Number"),
    body("name").optional().isString().withMessage("name should be string"),
    body("supervisor").optional().isMongoId().withMessage("supervisor Id should be ObjectID"),
    body("children").optional().isArray(),
    body("children.*").optional().isInt().withMessage("Children Id should be Number"),

];
exports.deleteValidator = [
    body("id").isNumeric().withMessage("Id should be Number"),
];