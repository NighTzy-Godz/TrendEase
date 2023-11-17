import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLatestProducts, getTopProducts } from "../store/slices/product";
import { ProductData } from "../interfaces/product";
import ProductCard from "../components/product/ProductCard";

import "../assets/css/pages/home.css";
import LANDING_PNG from "../assets/img/trendease_landing_bg.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { State } from "../store/store";
import ButtonLink from "../components/common/ButtonLink";
import { ButtonSize } from "../components/common/Button";

const settings = {
  autoPlay: true,

  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

function Home() {
  const dispatch = useDispatch();

  const latestProducts = useSelector(
    (state: State) => state.entities.product.latestProducts
  );

  const topProducts = useSelector(
    (state: State) => state.entities.product.topProducts
  );

  const renderSliderProducts = (products: ProductData[]) => {
    if (products.length === 0)
      return (
        <h1 style={{ fontSize: "25px", color: "var(--text-color)" }}>
          No Current Products
        </h1>
      );
    return (
      <Slider {...settings}>
        {products.map((product) => {
          return (
            <React.Fragment key={product._id}>
              <ProductCard data={product} />
            </React.Fragment>
          );
        })}
      </Slider>
    );
  };

  useEffect(() => {
    dispatch(getLatestProducts());
    dispatch(getTopProducts());
  }, []);

  return (
    <div className="home">
      <div className="landing_page">
        <div className="container">
          <div className="landing_page_left">
            <div className="text">
              <h1>Trendease - Where Trends and Ease Unite!</h1>
              <p>
                Discover the Latest Trends with TrendEase - Your One-Stop Shop
                for Fashion, Home, and More. Elevate your style effortlessly.
              </p>
            </div>
            <div className="btn">
              <ButtonLink size={ButtonSize.LARGE} path="/register">
                Register
              </ButtonLink>
            </div>
          </div>
          <div className="landing_page_right">
            <img src={LANDING_PNG} alt="" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="home_categorized_products">
        <div className="container">
          <h1>Latest Products</h1>
          {renderSliderProducts(latestProducts)}
        </div>
      </div>

      <div className="home_categorized_products">
        <div className="container">
          <h1>Top Rated Products</h1>
          {renderSliderProducts(topProducts)}
        </div>
      </div>
    </div>
  );
}

export default Home;
