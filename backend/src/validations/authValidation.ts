import Joi from "joi";

const messages = {
  required: "This field is required",
  invalidEmail: "Please provide a valid email",
  invalidPassword: "Password must contain only alphanumeric characters",
  passwordMin: "Password should have at least 6 characters",
  passwordMax: "Password cannot exceed 10 characters",
};

const userAuthJoi = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Username is required",
    "any.required": messages.required,
  }),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .lowercase()
    .trim()
    .required()
    .messages({
      "string.email": messages.invalidEmail,
      "any.required": messages.required,
    }),

  password: Joi.string()
    .min(6)
    .max(10)
    .pattern(/^[a-zA-Z0-9]{6,10}$/)
    .required()
    .messages({
      "string.pattern.base": messages.invalidPassword,
      "string.min": messages.passwordMin,
      "string.max": messages.passwordMax,
      "any.required": messages.required,
    }),
}).options({ allowUnknown: true });

export default userAuthJoi;
