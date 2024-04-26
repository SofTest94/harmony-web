import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { data_carrusel } from '../../../../utils/utils';
import CarouselItem from '../../../molecules/CarouselItem.tsx';
import { Users } from '../../../types/users';
import { userServices } from '../../../services/users';

const TitleAndCarousel: React.FC = () => {
  const [imagesTexts, setImagesTexts] = useState<Users[]>([]); // Indica que el estado es un array de ImageText

  useEffect(() => {
    // Llama al servicio para obtener los datos
    async function fetchImagesTexts() {
      try {
        const data = await userServices.getAllUsers('', '', 0, 0); // Llama a la función del servicio
        setImagesTexts(data); // Actualiza el estado con los datos recibidos del servicio
      } catch (error) {
        console.error('Error fetching images texts:', error);
      }
    }

    fetchImagesTexts(); // Llama a la función de carga al montar el componente
  }, []);
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
          {imagesTexts.map((imageText, index) => (
            <CarouselItem key={index} imageUrl={imageText.photo} title={imageText.fullName} text={imageText.specialty} />
          ))}
        </Slider>
      </div>
      <div style={{ height: '120px' }}></div>
    </div>
  );
};

export default TitleAndCarousel;
