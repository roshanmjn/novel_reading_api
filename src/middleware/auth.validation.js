import joi from "joi";
import { parseValidationError } from "../errors/index.js";
const validate = (data, schema) => {
    const { error, value } = schema.validate(data, {
        stripUnknown: true,
        abortEarly: false,
    });
    if (error) {
        throw error;
    }
    return value;
};

const registerSchema = joi.object({
    first_name: joi.string().label("First Name").required(),
    last_name: joi.string().label("Last Name").required(),
    username: joi.string().label("Username"),
    email: joi
        .string()
        .email({ minDomainSegments: 2 })
        .label("Email")
        .required(),
    password: joi.string().label("Password").required().min(8).message({
        "string.min": "{{#label}} must be at least 8 characters",
    }),
    confirm_password: joi
        .any()
        .valid(joi.ref("password"))
        .required()
        .label("Confirm Password")
        .messages({
            "any.only": "Password do not match",
        }),
});

const loginSchema = joi.object({
    email: joi
        .string()
        .email({ minDomainSegments: 2 })
        .label("Email")
        .required()
        .messages({
            "string.empty":
                "The email you entered isn't connected to any account.",
        }),
    password: joi.string().label("Password").required(),
});

export const registerValidator = async (req, res, next) => {
    try {
        await validate(req.body, registerSchema);
        next();
    } catch (err) {
        parseValidationError(req, res, err);
    }
};

export const loginValidator = async (req, res, next) => {
    try {
        await validate(req.body, loginSchema);
        next();
    } catch (err) {
        parseValidationError(req, res, err);
    }
};
