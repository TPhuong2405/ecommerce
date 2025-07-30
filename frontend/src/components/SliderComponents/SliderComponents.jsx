import { Image } from 'antd';
import React from 'react'
import { WrapperSliderStyle } from './style';

const SliderComponents = ({ arrImages }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Tự động chuyển đổi
    autoplaySpeed: 2000, // Thời gian giữa các lần chuyển đổi
  };

  return (
    <WrapperSliderStyle {...settings}>
      {arrImages.map((image) => {
        return (
          <Image key={image} src={image} alt="slider" preview={false} width="100%" height="500px" />
        )
      })}
    </WrapperSliderStyle>
  )
}

export default SliderComponents
