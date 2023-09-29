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
import paginate from "../../utils/paginate";
import Paginate from "../../components/common/Paginate";

function Products() {
  const dispatch = useDispatch();

  const [productFilter, setProductFilter] = useState({
    sort_by: "",
    category: "",
  });

  const [currPage, setCurrPage] = useState(1);

  const [submitted, setSubmitted] = useState(false);

  const products = useSelector(
    (state: State) => state?.entities?.product?.products
  );

  const paginatedProducts = paginate(products, currPage, 8);
  console.log(paginatedProducts);
  const renderAllProducts = () => {
    if (paginatedProducts.length === 0) {
      return (
        <div className="no_products">
          <h1>No Products Found With The Current Filters</h1>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="product_list">
          {paginatedProducts?.map((product: ProductData) => {
            return (
              <React.Fragment key={product._id}>
                <ProductCard data={product} />
              </React.Fragment>
            );
          })}
        </div>
        <Paginate
          currPage={currPage}
          itemCount={products.length}
          pageLoad={8}
          onPaginateClick={handlePaginateClick}
        />
      </React.Fragment>
    );
  };

  useEffect(() => {
    dispatch(getAllProducts(productFilter));
    setSubmitted(false);
  }, [submitted]);

  const handleDropDownChange = (value: string) => {
    setProductFilter({ ...productFilter, sort_by: value });
  };

  const handleRadioBoxClick = (value: string) => {
    setProductFilter({ ...productFilter, category: value });
  };

  const handleFilterProductClick = () => {
    setSubmitted(true);
    setCurrPage(1);
  };

  const handleResetFilter = () => {
    setProductFilter({ ...productFilter, category: "", sort_by: "popular" });
    setSubmitted(true);
  };

  const handlePaginateClick = (page: number) => {
    setCurrPage(page);
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
                currValue={productFilter.category}
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

            <div className="product_filter_btn">
              <Button
                size={ButtonSize.SMALL}
                className="danger"
                handleClick={handleResetFilter}
              >
                Reset Filter
              </Button>

              <Button
                size={ButtonSize.SMALL}
                handleClick={handleFilterProductClick}
              >
                Search Filter
              </Button>
            </div>
          </div>

          <div className="product_right">{renderAllProducts()}</div>

          {/* Product List Here */}
        </div>
      </div>
    </PaddedPage>
  );
}

export default Products;
