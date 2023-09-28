import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";

import { ProductData } from "../../interfaces/product";

interface ProductCardProps {
  data: ProductData;
}

function ProductCard({ data }: ProductCardProps) {
  const { images, _id, title, price } = data;

  const trimmedTitle =
    title.length > 60 ? `${title.substring(0, 60)} ...` : title;

  return (
    <Link to={`/products/${_id}`} className="product_card">
      <div className="product_card_img">
        <img src={images[0]} alt="" />
      </div>
      <div className="product_card_info">
        <div className="title">
          <p>{trimmedTitle}</p>
        </div>
        <div className="price">
          <h4>P {formatCurrency(price)}</h4>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
