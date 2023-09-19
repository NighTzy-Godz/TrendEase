import Joi, { Schema } from "joi";

interface AddReviewData {
  productId: string;
  rating: number;
  content: string;
}

export const addReviewValidator = (
  data: AddReviewData
): Joi.ValidationResult => {
  const schema: Schema<AddReviewData> = Joi.object({
    productId: Joi.string().required(),
    rating: Joi.number().min(0).max(5).required(),
    content: Joi.string().min(5).max(200).required(),
  });

  return schema.validate(data);
};
