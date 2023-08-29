import { Request, Response, NextFunction } from "express";
import { cloudinary } from "../cloudinary/cloudinary";

import mongoose from "mongoose";
import { createProductValidator } from "../validators/ProductValidator";
import Product from "../models/Product";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.files, req.body);

    const { title, desc, price, quantity, category } = req.body;
    const { error } = createProductValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!req.files || req.files.length === 0)
      return res.status(400).send("Images cannot be empty");

    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const optimizedImages = [];

    for (const file of files) {
      const optimizedImage = await cloudinary.uploader.upload(file.path, {
        quality: "auto",
        responsive: true,

        width: "auto",
        transformation: [
          { fetch_format: "auto" },
          { crop: "fill", aspect_ratio: "4:3" },
          { dpr: "auto" },
        ],
      });

      optimizedImages.push(optimizedImage);
    }
    const imageLinks = optimizedImages.map((img) => {
      return img.secure_url;
    });

    const product = new Product({
      title,
      desc,
      price,
      quantity,
      category,
      images: imageLinks,
      owner: (req as any).user._id,
    });

    await product.save();

    res.send(product);
  } catch (error) {
    next(error);
  }
};
