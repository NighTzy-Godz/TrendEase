import React, { useEffect, useState } from "react";

import "../../assets/css/common/ImageSlider.css";
import Slider from "react-slick";

interface ImageSliderProps {
  images: string[];
}

function ImageSlider({ images }: ImageSliderProps) {
  const enoughImages = images.length < 4;

  const SETTINGS = {
    infinite: true,
    speed: 500,
    slidesToShow: enoughImages ? images.length : 5,
    slidesToScroll: 2,
    autoPlay: true,
  };

  const [currImg, setCurrImg] = useState("");

  useEffect(() => {
    setCurrImg(images[0]);
  }, [images]);

  const renderImageSlider = () => {
    return (
      <div
        className="slider_container"
        style={{ width: enoughImages ? `${150 * images.length}px` : "auto" }}
      >
        <Slider {...SETTINGS}>
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
