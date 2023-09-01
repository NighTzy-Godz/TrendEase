import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/pages/single_product.css";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../store/slices/product";
import formatCurrency from "../../utils/formatCurrency";
// import img from "../../assets/img/first_ppt.jpg";
import Button, { ButtonSize } from "../../components/common/Button";
import SingleProductSubInfo from "../../components/product/SingleProductSubInfo";
import SingleProductOwnerCard from "../../components/product/SingleProductOwnerCard";
import ButtonLink from "../../components/common/ButtonLink";

function SingleProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(
    (state: any) => state.entities.product.singleProduct
  );
  const decodedUser = useSelector(
    (state: any) => state?.entities?.auth?.decodedUser
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
  } = product || {};

  const { pfp, first_name, last_name, email } = owner || {};
  const isOwner = decodedUser?._id === owner?._id;
  const renderBtnOption = () => {
    if (isOwner) {
      return (
        <>
          <Button size={ButtonSize.LARGE}>Edit</Button>

          <Button className="primary" size={ButtonSize.LARGE}>
            Delete
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button size={ButtonSize.LARGE}>Add to Cart</Button>

          <Button className="primary" size={ButtonSize.LARGE}>
            Buy Now
          </Button>
        </>
      );
    }
  };

  useEffect(() => {
    dispatch(getSingleProduct(productId as string));
  }, [productId]);

  return (
    <div className="single_product">
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
                <p>P {formatCurrency(price)}</p>
                <p>{ratings} Stars</p> <p>{0} sold</p>
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
          full_name={first_name + " " + last_name}
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
    </div>
  );
}

export default SingleProduct;
