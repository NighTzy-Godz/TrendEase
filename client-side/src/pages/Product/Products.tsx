import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slices/product";
import ProductCard from "../../components/product/ProductCard";
import { ProductData } from "../../interfaces/product";
import "../../assets/css/pages/all_products.css";
import PaddedPage from "../../components/containers/PaddedPage";
import { State } from "../../store/store";

function Products() {
  const dispatch = useDispatch();

  const products = useSelector(
    (state: State) => state?.entities?.product?.products
  );

  const renderAllProducts = products?.map((product: ProductData) => {
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
    <PaddedPage className="all_products">
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
    </PaddedPage>
  );
}

export default Products;
