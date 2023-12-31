import Joi, { Schema } from "joi";

interface UserRegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface UserUpdateData extends UserRegisterData {
  bio: string;
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

interface UserAddAddressData {
  address: string;
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

export const userUpdateValidator = (data: UserUpdateData) => {
  const schema: Schema<UserUpdateData> = Joi.object({
    bio: Joi.string().allow(null || ""),
    address: Joi.string().allow(null || ""),
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(11).max(11).required(),
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

export const userAddAddress = (data: UserAddAddressData) => {
  const schema: Schema<UserAddAddressData> = Joi.object({
    address: Joi.string().min(10).max(100).required(),
  });

  return schema.validate(data);
};
