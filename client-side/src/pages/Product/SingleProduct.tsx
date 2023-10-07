import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/pages/single_product.css";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../store/slices/product";
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

function SingleProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(
    (state: State) => state.entities.product.singleProduct
  );
  const currUser = useSelector(
    (state: State) => state?.entities?.auth?.decodedUser
  );

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

          <Button className="primary" size={ButtonSize.LARGE}>
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

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleProduct(productId as string));
  }, [productId]);

  return (
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
            {/* {images?.length > 1 && <div className="image_slider"></div>} */}

            <div className="mainImg">
              <img src={images[0]} alt="" />
            </div>
          </div>
          <div className="single_product_info">
            <div className="top_section">
              <h1>{title}</h1>
              <div className="product_info_flex">
                <p>P {formatCurrency(price as number)}</p>
                <p>{ratings} Stars</p> <p>{sold} sold</p>
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
          <p>No Ratings at the moment</p>
        </div>
      </div>
    </PaddedPage>
  );
}

export default SingleProduct;
