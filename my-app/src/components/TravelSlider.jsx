import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import Banner1 from "../assets/img/1257-dulichtrongnc-danhmuc.jpg"

// Mũi tên trái tuỳ chỉnh
const PreviousArrow = ({ className, onClick }) => {
  return (
    <div
      className={`${className} bg-black hover:bg-blue-200 rounded-full`}
      onClick={onClick}
      style={{ left: '20px', zIndex: 1 }}
    >
    </div>
  );
};

// Mũi tên phải tuỳ chỉnh
const NextArrow = ({ className, onClick }) => {
  return (
    <div
      className={`${className} bg-black hover:bg-blue-200 rounded-full`}
      onClick={onClick}
      style={{ right: '20px', zIndex: 1 }}
    >
    </div>
  );
};

const TravelSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />
  };

  return (
    <div className="container mx-auto px-1 max-w-7xl"> 
      <div className="container mx-auto px-1 max-w-7xl"> 
        <Slider {...settings}>
        <div>
            <img
              src="https://media.travel.com.vn/SlideShow/sl_241101_TopBannerWeb.jpg"
              alt="Destination 2"
              className="w-full h-[640px] object-cover rounded-lg"
            />
          </div>
          <div>
            <img
              src={Banner1}
              alt="Destination 1"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div>
            <img
              src="https://upcontent.vn/wp-content/uploads/2024/07/banner-du-lich-viet-nam-03-1024x640.jpg"
              alt="Destination 3"
              className="w-full h-[auto] object-cover rounded-lg"
            />
          </div>
          <div>
            <img
              src="https://dulichviet.com.vn/images/bandidau/banner/BANNER-TET/tour-tet-du-lich-viet%20(2)(1).jpg?v=1'"
              alt="Destination 4"
              className="w-[640] h-[640px] object-cover rounded-lg items-"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default TravelSlider;
