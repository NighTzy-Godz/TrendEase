import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slices/product";
import ProductCard from "../../components/product/ProductCard";
import { ProductData } from "../../interfaces/product";
import "../../assets/css/pages/all_products.css";
import PaddedPage from "../../components/containers/PaddedPage";
import { State } from "../../store/store";
import SortDropDown from "../../components/common/DropDown";
import productSortOptions from "../../data/productSortOptions";
import InputContainer from "../../components/containers/InputContainer";
import Button, { ButtonSize } from "../../components/common/Button";
import RadioBox from "../../components/common/RadioBox";
import categoryOptions from "../../data/categoryOptions";

function Products() {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("latest");
  const [productCategory, setProductCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const products = useSelector(
    (state: State) => state?.entities?.product?.products
  );

  const renderAllProducts = () => {
    if (products.length === 0) {
      return (
        <div className="no_products">
          <h1>No Products Found With The Current Filters</h1>
        </div>
      );
    }
    return (
      <div className="product_list">
        {products?.map((product: ProductData) => {
          return (
            <React.Fragment key={product._id}>
              <ProductCard data={product} />
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    dispatch(getAllProducts(sortBy, productCategory));
    setSubmitted(false);
  }, [submitted]);

  const handleDropDownChange = (value: string) => {
    setSortBy(value);
  };

  const handleRadioBoxClick = (value: string) => {
    setProductCategory(value);
  };

  const handleFilterProductClick = () => {
    setSubmitted(true);
  };

  return (
    <PaddedPage className="all_products">
      <div className="container">
        <div className="all_products_header">
          <h1>All Products</h1>
          <p>
            Choose the products you want to buy, you can use filtering depending
            on your needs
          </p>
        </div>

        <div className="all_products_container">
          {/* Category Section Here */}
          <div className="product_filter">
            <h3 className="product_filter_title">Product Filter Fields</h3>

            <InputContainer>
              <RadioBox
                data={categoryOptions}
                onRadioBoxClick={handleRadioBoxClick}
              />
            </InputContainer>

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
          {renderAllProducts()}
        </div>
      </div>
    </PaddedPage>
  );
}

export default Products;
