import { Request, Response, NextFunction } from "express";
import { cloudinary } from "../cloudinary/cloudinary";

import {
  createProductValidator,
  updateProductValidator,
} from "../validators/ProductValidator";
import Product, { ProductCategory } from "../models/Product";

interface FilterCriteria {
  category?: ProductCategory;
}

type SortOrder = 1 | -1;

interface SortCriteria {
  [key: string]: SortOrder;
}

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sort_by, category } = req.query;

    const filterCriteria: FilterCriteria = {};
    if (category) filterCriteria.category = category as ProductCategory;

    const sortCriteria: SortCriteria = {};

    switch (sort_by) {
      case "popular":
        sortCriteria.ratings = -1;
        break;

      case "latest":
        sortCriteria.createdAt = -1;
        break;

      case "priceLowToHigh":
        sortCriteria.price = 1;
        break;

      case "priceHighToLow":
        sortCriteria.price = -1;
        break;

      default:
        sortCriteria.ratings = -1;
        break;
    }

    const products = await Product.find(filterCriteria).sort(sortCriteria);

    res.send(products);
  } catch (error) {
    next(error);
  }
};

export const getLatestProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const latestProducts = await Product.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 8,
      },
    ]).exec();

    res.send(latestProducts);
  } catch (error) {
    next(error);
  }
};

export const getTopProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topProducts = await Product.aggregate([
      {
        $sort: {
          sold: -1,
          rating: -1,
        },
      },

      { $limit: 8 },
    ]);

    res.send(topProducts);
  } catch (error) {
    next(error);
  }
};

export const getAllMyProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUser = (req as any).user._id;
    if (!currUser) return res.status(404).send("Current User did not found");

    const myProducts = await Product.find({ owner: currUser });

    res.send(myProducts);
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const foundProduct = await Product.findOne({ _id: productId }).populate(
      "owner"
    );
    if (!foundProduct) return res.status(404).send("Product did not found");

    res.send(foundProduct);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, desc, price, quantity, category } = req.body;
    const { productId } = req.params;
    const { error } = updateProductValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findOne({ _id: productId });
    if (!product) return res.status(404).send("Product did not found");

    product.title = title;
    product.desc = desc;
    product.price = price;
    product.quantity = quantity;
    product.category = category;

    await product.save();

    res.send(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const deleteProduct = await Product.findByIdAndDelete(productId);

    if (!deleteProduct) return res.status(404).send("Product did not found");

    res.send(deleteProduct);
  } catch (error) {
    next(error);
  }
};
