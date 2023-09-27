import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slices/product";
import ProductCard from "../../components/product/ProductCard";
import { ProductData } from "../../interfaces/product";
import "../../assets/css/pages/all_products.css";
import PaddedPage from "../../components/containers/PaddedPage";
import { State } from "../../store/store";
import SortDropDown from "../../components/common/SortDropDown";
import productSortOptions from "../../data/productSortOptions";
import InputContainer from "../../components/containers/InputContainer";
import Button, { ButtonSize } from "../../components/common/Button";

function Products() {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("latest");
  const [filter, setFilter] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    dispatch(getAllProducts(sortBy));
    setSubmitted(false);
  }, [submitted]);

  const handleDropDownChange = (value: string) => {
    setSortBy(value);
  };

  const handleFilterProductClick = () => {
    setSubmitted(true);
  };

  return (
    <PaddedPage className="all_products">
      <div className="container">
        <h1>All Products</h1>

        <div className="all_products_container">
          {/* Category Section Here */}
          <div className="product_filter">
            <h3 className="product_filter_title">Product Filter Fields</h3>
            <InputContainer>
              <SortDropDown
                name="product_dropDown"
                data={productSortOptions}
                label="Sort Products"
                onDropDownChange={handleDropDownChange}
              />
            </InputContainer>

            <Button
              size={ButtonSize.SMALL}
              handleClick={handleFilterProductClick}
            >
              Search Filter
            </Button>
          </div>

          {/* Product List Here */}
          <div className="product_list">{renderAllProducts}</div>
        </div>
      </div>
    </PaddedPage>
  );
}

export default Products;
