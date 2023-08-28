import Joi, { Schema } from "joi";

enum Category {
  ELECTRONICS = "electronics",
  FASHION = "fashion",
  APPLIANCES = "appliances",
  APPAREL = "apparel",
  INSTRUMENTS = "instruments",
  SPORTS = "sports",
  HEALTH_AND_BEAUTY = "health and beauty",
}

interface CreateProductData {
  title: string;
  desc: string;
  price: number;
  quantity: number;
  category: Category;
}

export const createProductValidator = (
  data: CreateProductData
): Joi.ValidationResult => {
  const schema: Schema<CreateProductData> = Joi.object({
    title: Joi.string().min(10).max(150).required(),
    desc: Joi.string().min(10).required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.string().valid(...Object.values(Category)),
  });

  return schema.validate(data);
};
