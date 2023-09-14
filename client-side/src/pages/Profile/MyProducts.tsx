import React, { useEffect } from "react";
import PaddedPage from "../../components/containers/PaddedPage";
import "../../assets/css/Profile/my_product.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyProducts } from "../../store/slices/user";
import ProductCard from "../../components/product/ProductCard";
import { ProductData } from "../../interfaces/product";
import { State } from "../../store/store";
import ButtonLink from "../../components/common/ButtonLink";
import { ButtonSize } from "../../components/common/Button";

function MyProducts() {
  const dispatch = useDispatch();

  const myProducts: [] = useSelector(
    (state: State) => state.entities.user.info.myProducts
  );

  useEffect(() => {
    if (!myProducts) {
      dispatch(getMyProducts());
    }
  }, []);

  const renderMyProducts = myProducts?.map((product: ProductData) => {
    return (
      <React.Fragment key={product._id}>
        <ProductCard data={product} />
      </React.Fragment>
    );
  });

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
          </>
        )}
      </div>
    </PaddedPage>
  );
}

export default MyProducts;
