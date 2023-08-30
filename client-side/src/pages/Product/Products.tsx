import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slices/product";
import ProductCard, {
  ProductCardData,
} from "../../components/product/ProductCard";
import "../../assets/css/pages/all_products.css";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(
    (state: any) => state?.entities?.product?.products
  );

  const renderAllProducts = products?.map((product: ProductCardData) => {
    return (
      <React.Fragment key={product._id}>
        <ProductCard data={product} />
      </React.Fragment>
    );
  });

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div className="all_products">
      <div className="container">
        <h1>All Products</h1>

        <div className="all_products_container">
          {/* Category Section Here */}
          <div className="category">
            <h3>Category Here</h3>
          </div>

          {/* Product List Here */}
          <div className="product_list">{renderAllProducts}</div>
        </div>
      </div>
    </div>
  );
}

export default Products;
