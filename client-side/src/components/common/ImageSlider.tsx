import React, { useEffect, useState } from "react";

import "../../assets/css/common/ImageSlider.css";
import Slider from "react-slick";

interface ImageSliderProps {
  images: string[];
}

function ImageSlider({ images }: ImageSliderProps) {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: images?.length < 4 ? images.length : 5,
    slidesToScroll: 2,
    initialSlide: 0,
    autoPlay: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,

          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const [currImg, setCurrImg] = useState("");

  useEffect(() => {
    setCurrImg(images[0]);
  }, [images]);

  const renderImageSlider = () => {
    return (
      <div
        className="slider_container"
        style={{ width: `${images.length < 4 && 150 * images.length}px` }}
      >
        <Slider {...settings}>
          {images.map((img) => {
            return (
              <img
                key={img}
                src={img}
                onClick={() => setCurrImg(img)}
                className={`${img === currImg ? "active" : ""}`}
              />
            );
          })}
        </Slider>
      </div>
    );
  };

  return (
    <React.Fragment>
      {" "}
      <div className="slider_mainImg">
        <img src={currImg} alt="" />
      </div>
      {images?.length > 1 && renderImageSlider()}
    </React.Fragment>
  );
}

export default ImageSlider;
