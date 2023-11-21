import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/pages/single_product.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getSingleProduct,
  setProductDeleted,
} from "../../store/slices/product";
import formatCurrency from "../../utils/formatCurrency";

import Button, { ButtonSize } from "../../components/common/Button";
import SingleProductSubInfo from "../../components/product/SingleProductSubInfo";
import SingleProductOwnerCard from "../../components/product/SingleProductOwnerCard";
import ButtonLink from "../../components/common/ButtonLink";
import { addToCart } from "../../store/slices/cart";
import { toast } from "react-toastify";
import PaddedPage from "../../components/containers/PaddedPage";
import { setCheckoutBuyNow } from "../../store/slices/checkout";
import { State } from "../../store/store";
import { UserData } from "../../interfaces/user";
import { getProductReviews } from "../../store/slices/review";
import ReviewCard from "../../components/review/ReviewCard";
import Paginate from "../../components/common/Paginate";
import paginate from "../../utils/paginate";
import ImageSlider from "../../components/common/ImageSlider";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";

function SingleProduct() {
  const PAGE_LOAD = 6;
  const [currPage, setCurrPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state: State) => state.entities.product.loading);

  const productDeleted = useSelector(
    (state: State) => state.entities.product.productDeleted
  );
  const product = useSelector(
    (state: State) => state.entities.product.singleProduct
  );
  const currUser = useSelector(
    (state: State) => state?.entities?.auth?.decodedUser
  );

  const productReview = useSelector(
    (state: State) => state.entities.review.productReview
  );

  const paginatedReviews = paginate(productReview, currPage, PAGE_LOAD);

  const {
    category,
    desc,
    images = [],
    owner,
    price,
    quantity,
    ratings,
    title,
    sold,
  } = product || {};

  const { _id: productOwner, pfp, email } = (owner as UserData) || {};
  const isOwner = currUser?._id === productOwner;

  useEffect(() => {
    console.log(productDeleted);
    if (productDeleted) {
      dispatch(setProductDeleted(false));

      return navigate("/my-products");
    }
  }, [productDeleted]);

  const handleAddCart = (productId: string) => {
    if (!currUser) {
      toast.error("You need to sign in first", { autoClose: 2500 });
      return navigate("/login");
    }
    dispatch(addToCart(productId));
  };

  const handleBuyNow = () => {
    if (!currUser) {
      toast.error("You need to sign in first", { autoClose: 2500 });
      return navigate("/login");
    }

    const checkoutItem = {
      product,
      quantity: 1,
      productOwner,
      price,
    };

    dispatch(setCheckoutBuyNow([checkoutItem]));
    navigate("/checkout");
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(productId as string));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePaginateClick = (page: number) => {
    setCurrPage(page);
  };

  const renderBtnOption = () => {
    if (isOwner) {
      return (
        <>
          <ButtonLink
            path={`/edit-product/${productId}`}
            size={ButtonSize.LARGE}
          >
            Edit
          </ButtonLink>

          <Button
            className="primary"
            size={ButtonSize.LARGE}
            handleClick={handleOpenModal}
          >
            Delete
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            size={ButtonSize.LARGE}
            handleClick={() => handleAddCart(productId as string)}
          >
            Add to Cart
          </Button>

          <Button
            className="primary"
            size={ButtonSize.LARGE}
            handleClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </>
      );
    }
  };

  const renderProductReviews = () => {
    if (productReview.length === 0) return <p>No Ratings at the moment</p>;
    return (
      <div className="product_review_grid">
        {paginatedReviews.map((review) => (
          <React.Fragment key={review._id}>
            <ReviewCard data={review} />
          </React.Fragment>
        ))}
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleProduct(productId as string));
    dispatch(getProductReviews(productId as string));
  }, [productId]);

  if (loading) return <Loader />;

  return (
    <React.Fragment>
      <PaddedPage className="single_product">
        <div className="container">
          <div className="single_product_nav">
            <ButtonLink
              className="primary"
              size={ButtonSize.SMALL}
              path="/products"
            >
              All Products
            </ButtonLink>
          </div>

          <div className="single_product_container">
            <div className="single_product_images">
              <ImageSlider images={images} />
            </div>
            <div className="single_product_info">
              <div className="top_section">
                <h1>{title}</h1>
                <div className="product_info_flex">
                  <p>P {formatCurrency(price as number)}</p>
                  <p>{ratings?.toFixed(1)} Stars</p> <p>{sold} sold</p>
                </div>
              </div>

              <div className="mid_section">
                <SingleProductSubInfo title="Quantity" data={quantity} />
                <SingleProductSubInfo
                  title="Availability"
                  data={!quantity ? "No Stock Available" : "On Stock"}
                />
                <SingleProductSubInfo title="Category" data={category} />
                <div className="single_product_optionBtn">
                  {renderBtnOption()}
                </div>
              </div>
            </div>
          </div>

          <SingleProductOwnerCard
            pfp={pfp}
            full_name={currUser?.full_name}
            email={email}
            isOwner={isOwner}
          />

          <div className="single_product_description">
            <h3>Product Description</h3>
            <p>{desc}</p>
          </div>

          <div className="single_product_ratings">
            <h3>Product Ratings</h3>
            {renderProductReviews()}

            <Paginate
              currPage={currPage}
              itemCount={productReview.length}
              pageLoad={PAGE_LOAD}
              onPaginateClick={handlePaginateClick}
            />
          </div>
        </div>
      </PaddedPage>
      {isModalOpen && (
        <Modal
          className="single_product_delete"
          onModalClose={handleCloseModal}
          isModalOpen={isModalOpen}
        >
          <h3>
            Are you sure you want to delete this product? This cant change this
            later.
          </h3>

          <div className="single_product_delete_btn">
            <Button
              size={ButtonSize.MEDIUM}
              handleClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size={ButtonSize.MEDIUM}
              className="danger"
              handleClick={handleDeleteProduct}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default SingleProduct;
