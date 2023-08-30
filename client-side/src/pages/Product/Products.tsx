import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slices/product";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(
    (state: any) => state?.entities?.product?.products
  );
  useEffect(() => {
    dispatch(getAllProducts());
  }, [products]);
  return (
    <div>
      <h1>Product will be here</h1>
    </div>
  );
}

export default Products;
