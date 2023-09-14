import Joi, { Schema } from "joi";

enum PaymentMethod {
  CashOnDelivery = "Cash on Delivery",
  GCash = "GCash",
}

enum OrderStatus {
  Processing = "Processing",
  Delivered = "Delivered",
  Recieved = "Recieved",
}

interface ProductData {
  product: string;
  quantity: number;
  price: number;
  productOwner: string;
}

interface addOrderData {
  items: [ProductData];
  paymentMethod: PaymentMethod;
}

interface UpdateOrderStatusData {
  orderId: string;
  status: OrderStatus;
}

export const addOrderValidator = (data: addOrderData) => {
  const itemsSchema = {
    product: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    productOwner: Joi.string().required(),
  };

  const schema = Joi.object({
    checkoutItems: Joi.array().items(itemsSchema),
    paymentMethod: Joi.valid("Cash on Delivery", "GCash"),
    fromCart: Joi.boolean().required(),
  });

  return schema.validate(data);
};

export const updateOrderStatusValidator = (data: UpdateOrderStatusData) => {
  const schema: Schema<UpdateOrderStatusData> = Joi.object({
    orderId: Joi.string().required(),

    status: Joi.valid("Processing", "Delivered", "Recieved"),
  });

  return schema.validate(data);
};
