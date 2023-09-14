import Joi, { Schema } from "joi";

interface UserRegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface UserChangePasswordData {
  currPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UserLoginData {
  email: string;
  password: string;
}

export const userRegisterValidator = (data: UserRegisterData) => {
  const schema: Schema<UserRegisterData> = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),

    phone: Joi.string().min(11).max(11).required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().min(5).required(),
  });

  return schema.validate(data);
};

export const userChangePasswordValidator = (data: UserChangePasswordData) => {
  const schema: Schema<UserChangePasswordData> = Joi.object({
    currPassword: Joi.string().min(5).required(),
    newPassword: Joi.string().min(5).required(),
    confirmPassword: Joi.string().min(5).required(),
  });

  return schema.validate(data);
};

export const userLoginValidator = (data: UserLoginData) => {
  const schema: Schema<UserLoginData> = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};
