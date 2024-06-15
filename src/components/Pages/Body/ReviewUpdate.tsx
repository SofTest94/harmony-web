import React, { useEffect, useState } from 'react';

import { data_carrusel, data_review, imagesTexts } from '../../../utils/utils';
import Slider from 'react-slick';
import Button from '../../atoms/Button';
import Card from '../../molecules/Card';

import { reviewServices } from '../../services/reviews';
import { Reviews } from '../../types/reviews';
import CardReviewUpdate from '../../molecules/CardReview';

const settings = {
//   dots: true,
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

const ReviewUpdate: React.FC = () => {
  const [imagesTexts, setImagesTexts] = useState<Reviews[]>([]); // Indica que el estado es un array de ImageText

  useEffect(() => {
    // Llama al servicio para obtener los datos
    async function fetchImagesTexts() {
      try {
        const data = await reviewServices.getAllReviews(''); // Llama a la función del servicio
        setImagesTexts(data); // Actualiza el estado con los datos recibidos del servicio
      } catch (error) {
        console.error('Error fetching images texts:', error);
      }
    }

    fetchImagesTexts(); // Llama a la función de carga al montar el componente
  }, []);
  return (
    <div style={{ padding: '1%', margin: '3%', borderRadius: '10px' }}>
      <div>
        <div
          style={{
            textAlign: 'center',
            width: '70%',
            margin: '0 auto',
            fontSize: '1.1vw', // Tamaño de fuente ajustado al 3.5% del ancho de la ventana
            minWidth: '70%',
            color:'white'
          }}
        >
          <h1>Esto dicen las personas que se han recuperado con nosotros</h1>
        </div>

        {/* Carrusel de imágenes */}
        <div style={{ textAlign: 'justify', width: '100%', margin: '0 auto' }}>
          <Slider {...settings}>
            {imagesTexts.map((imageText, index) => (
              <CardReviewUpdate imageUrl={imageText.img} title={imageText.title} description={imageText.description} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ReviewUpdate;
