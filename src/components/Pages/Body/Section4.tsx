import React from 'react';

import { data_carrusel, data_review, imagesTexts } from '../../../utils/utils';
import Slider from 'react-slick';
import Button from '../../atoms/Button';
import Card from '../../molecules/Card';

const settings = {
  dots: true,
  speed: 1800,
  slidesToShow: 3,
  slidesToScroll: 3,
  appendDots: (dots: any) => (
    <div
      style={{
        position: 'absolute',
        bottom: '-25px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {dots}
    </div>
  ),
};

const Section4: React.FC = () => {
  return (
    <div style={{ padding: '1%', margin: '3%', borderRadius: '10px' }}>
      <div>
        <div
          style={{
            textAlign: 'center',
            width: '70%',
            margin: '0 auto',
            fontSize: '1.5vw', // Tamaño de fuente ajustado al 3.5% del ancho de la ventana
            minWidth: '70%',
          }}
        >
          <h1>Esto dicen las personas que se han recuperado con nosotros</h1>
        </div>

        {/* Carrusel de imágenes */}
        <div style={{ textAlign: 'justify', width: '100%', margin: '0 auto' }}>
          <Slider {...settings}>
            {data_review.map((imageText, index) => (
              <Card imageUrl={imageText.imageUrl} title={imageText.title} description={imageText.text} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Section4;
