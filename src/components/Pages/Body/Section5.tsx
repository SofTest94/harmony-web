import React from 'react';
import { data_partners } from '../../../utils/utils';
import Slider from 'react-slick';
import CardPartners from '../../molecules/CardPartners';

const settings = {
  speed: 1800,
  slidesToShow: 2,
  slidesToScroll: 2,
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
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Section5: React.FC = () => {
  return (
    <div style={{ padding: '5%', margin: '3%', borderRadius: '10px' }}>
      <div
        style={{
          textAlign: 'center',
          width: '70%',
          margin: '0 auto',
          fontSize: '1.5vw', // Tamaño de fuente ajustado al 3.5% del ancho de la ventana
          minWidth: '70%',
        }}
      >
        <h1>Socios que nos eligen para hacer parte de su equipo</h1>
      </div>

      {/* Carrusel de imágenes */}
      <div style={{ textAlign: 'justify', width: '100%', margin: '0 auto', paddingTop: '5%' }}>
        <Slider {...settings}>
          {data_partners.map((imageText, index) => (
            <CardPartners key={index} imageUrl={imageText.imageUrl} title={imageText.title} description={imageText.text} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Section5;
