const {body,param,query}=require("express-validator");
exports.getValidator = [
    param("id").isNumeric().withMessage("Id should be Number"),
];
exports.postValidator = [
    body("id").optional().isNumeric().withMessage("Id should be Number"),
    body("fullname").isString().withMessage("Fullname should be string"),
    body("age").isInt({min:3,max:8}).withMessage("Age should be Integer between 3-8"),
    body("level").isIn(['PreKG', 'KG1', 'KG2']).withMessage("level should be one Of ['PreKG', 'KG1', 'KG2']"),
    body("address").isObject().withMessage("address.city should be Object with {city,street,building}"),
    body("address.city").isString().withMessage("address.city should be string"),
    body("address.street").isString().withMessage("address.street should be string"),
    body("address.building").isNumeric().withMessage("address.building should be Number"),
];
exports.putValidator = [
    body("id").isNumeric().withMessage("Id should be Number"),
    body("fullname").optional().isString().withMessage("Fullname should be string"),
    body("age").optional().isInt({min:3,max:8}).withMessage("Age should be Integer between 3-8"),
    body("level").optional().isIn(['PreKG', 'KG1', 'KG2']).withMessage("level should be one Of ['PreKG', 'KG1', 'KG2']"),
    body("address").optional().isObject(),
    body("address.city").optional().isString().withMessage("address.city should be string"),
    body("address.street").optional().isString().withMessage("address.street should be string"),
    body("address.building").optional().isNumeric().withMessage("address.building should be Number"),

];
exports.deleteValidator = [
    body("id").isNumeric().withMessage("Id should be Number"),
];