import React, { useEffect, useState } from "react";
import PaddedPage from "../../components/containers/PaddedPage";
import "../../assets/css/Profile/my_product.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyProducts } from "../../store/slices/product";
import ProductCard from "../../components/product/ProductCard";
import { ProductData } from "../../interfaces/product";
import { State } from "../../store/store";
import ButtonLink from "../../components/common/ButtonLink";
import { ButtonSize } from "../../components/common/Button";
import paginate from "../../utils/paginate";
import Paginate from "../../components/common/Paginate";

function MyProducts() {
  const PAGE_LOAD = 8;
  const dispatch = useDispatch();

  const [currPage, setCurrPage] = useState(1);

  const myProducts = useSelector(
    (state: State) => state.entities.product.myProducts
  );

  useEffect(() => {
    if (!myProducts) {
      dispatch(getMyProducts());
    }
  }, []);

  const paginatedProducts = paginate(myProducts as [], currPage, PAGE_LOAD);

  const renderMyProducts = paginatedProducts?.map((product: ProductData) => {
    return (
      <React.Fragment key={product._id}>
        <ProductCard data={product} />
      </React.Fragment>
    );
  });

  const handlePaginateClick = (page: number) => {
    setCurrPage(page);
  };

  return (
    <PaddedPage className="my_products">
      <div className="container">
        {myProducts?.length === 0 ? (
          <div className="no_products">
            <h1>No Products Found That You've Made</h1>
            <ButtonLink size={ButtonSize.SMALL} path="/profile">
              Go Back to Profile
            </ButtonLink>
          </div>
        ) : (
          <>
            <h1>Products You Created</h1>

            <div className="product_list">{renderMyProducts}</div>
            <Paginate
              currPage={currPage}
              itemCount={myProducts?.length as number}
              onPaginateClick={handlePaginateClick}
              pageLoad={PAGE_LOAD}
            />
          </>
        )}
      </div>
    </PaddedPage>
  );
}

export default MyProducts;
