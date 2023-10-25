import React, { useEffect, useState } from "react";

import "../../assets/css/common/ImageSlider.css";
import Slider from "react-slick";

const SETTINGS = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  autoPlay: true,
};

interface ImageSliderProps {
  images: string[];
}

function ImageSlider({ images }: ImageSliderProps) {
  const sufficientImgLength = images.length > 4 ? true : false;

  const [currImg, setCurrImg] = useState("");

  useEffect(() => {
    setCurrImg(images[0]);
  }, [images]);

  const renderImageSlider = () => {
    return (
      <div className="slider_container">
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
      <div className="mainImg">
        <img src={currImg} alt="" />
      </div>
      {images?.length > 1 && renderImageSlider()}
    </React.Fragment>
  );
}

export default ImageSlider;
