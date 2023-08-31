import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";

export interface ProductCardData {
  _id: string;
  title: string;
  price: number;
  images: [string];
}

interface ProductCardProps {
  data: ProductCardData;
}

function ProductCard({ data }: ProductCardProps) {
  const { images, _id, title, price } = data;
  return (
    <Link to={`/products/${_id}`} className="product_card">
      <div className="product_card_img">
        <img src={images[0]} alt="" />
      </div>
      <div className="product_card_info">
        <div className="title">
          <p>{title}</p>
        </div>
        <div className="price">
          <h4>P {formatCurrency(price)}</h4>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
