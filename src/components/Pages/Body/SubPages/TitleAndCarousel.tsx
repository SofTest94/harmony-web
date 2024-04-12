import React from 'react';
import Slider from 'react-slick';
import { data_carrusel } from '../../../../utils/utils';
import CarouselItem from '../../../molecules/CarouselItem.tsx';

const TitleAndCarousel: React.FC = () => {
  const settings = {
    dots: true,
    speed: 1800,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false, // Oculta las flechas de avanzar y retroceder
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ textAlign: 'center', width: '90%', margin: '0 auto', padding: '0 5%' }}>
      <h1
        style={{
          width: '60%',
          fontSize: '3vw',
          minWidth: '15%',
          margin: '0 auto',
          // paddingBottom: '1%',
          paddingTop: '5%',
          // backgroundColor: 'blue',
        }}
      >
        Somos tu clave para el éxito, tu brújula en el viaje de la salud y el bienestar.
      </h1>
      <div style={{ textAlign: 'justify', maxWidth: '100%', margin: '0 auto' }}>
        <Slider {...settings}>
          {data_carrusel.map((imageText, index) => (
            <CarouselItem key={index} imageUrl={imageText.imageUrl} title={imageText.title} text={imageText.text} />
          ))}
        </Slider>
      </div>
      <div style={{ height: '120px' }}></div>
    </div>
  );
};

export default TitleAndCarousel;
