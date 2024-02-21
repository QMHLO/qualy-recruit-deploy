import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderAbout() {
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    arrows: false,
  };
  const sliderData = [
    {
      src: "/slider_img01.png",
      alt: "img01の画像",
    },
    {
      src: "/qm.png",
      alt: "img02の画像",
    },
    {
      src: "/jtcm.png",
      alt: "img03の画像",
    },
  ];
  return (
    <div className="slider-block">
      <Slider {...settings}>
        {sliderData.map((data, index) => (
          <div className="item" key={index}>
            <img src={data.src} alt={data.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderAbout;
