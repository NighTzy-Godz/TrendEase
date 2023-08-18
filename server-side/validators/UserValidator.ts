import Joi, { Schema } from "joi";

interface UserRegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const userRegisterValidator = (data: UserRegisterData) => {
  const schema: Schema<UserRegisterData> = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),

    phone: Joi.string().min(13).max(13).required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().min(5).required(),
  });

  return schema.validate(data);
};
