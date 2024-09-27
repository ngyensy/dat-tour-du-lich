import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

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
      <Slider {...settings}>
        <div>
          <img src="https://via.placeholder.com/800x400.png?text=Destination+1" alt="Destination 1" className="w-full h-auto rounded-lg" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400.png?text=Destination+2" alt="Destination 2" className="w-full h-auto rounded-lg" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400.png?text=Destination+3" alt="Destination 3" className="w-full h-auto rounded-lg" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400.png?text=Destination+4" alt="Destination 4" className="w-full h-auto rounded-lg" />
        </div>
      </Slider>
    </div>
  );
};

export default TravelSlider;
