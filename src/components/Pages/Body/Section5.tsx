import React, { useEffect, useState } from 'react';
import { data_partners } from '../../../utils/utils';
import Slider from 'react-slick';
import CardPartners from '../../molecules/CardPartners';
import { Partners } from '../../types/partners';
import { partnerServices } from '../../services/partners';

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
  const [imagesTexts, setImagesTexts] = useState<Partners[]>([]);

  useEffect(() => {
    // Llama al servicio para obtener los datos
    async function fetchImagesTexts() {
      try {
        const data = await partnerServices.getAllPartners(''); // Llama a la función del servicio
        setImagesTexts(data); // Actualiza el estado con los datos recibidos del servicio
      } catch (error) {
        console.error('Error fetching images texts:', error);
      }
    }

    fetchImagesTexts(); // Llama a la función de carga al montar el componente
  }, []);
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
          {imagesTexts.map((imageText, index) => (
            <CardPartners
              key={index}
              imageUrl={imageText.img}
              title={imageText.title}
              description={imageText.description}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Section5;
