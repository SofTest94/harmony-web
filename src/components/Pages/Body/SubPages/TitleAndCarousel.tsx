import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import CarouselItem from '../../../molecules/CarouselItem.tsx';
import { Users } from '../../../types/users';
import { userServices } from '../../../services/users';

interface TitleAndCarouselProps {
  branchId?: string; // Parámetro tipo string que recibirá el componente
}

const TitleAndCarousel: React.FC<TitleAndCarouselProps> = ({ branchId }) => {
  const [imagesTexts, setImagesTexts] = useState<Users[]>([]);

  useEffect(() => {
    // Llama al servicio para obtener los datos basado en branchId
    async function fetchImagesTexts() {
      try {
        if (branchId) {
          // Llama al servicio para obtener los datos de tratamientos específicos de la sucursal seleccionada
          const data = await userServices.getAllUsersByIdBranch(branchId, '', 0, 0);
          setImagesTexts(data); // Actualiza el estado con los datos recibidos del servicio
        }
      } catch (error) {
        console.error('Error fetching images texts:', error);
      }
    }

    fetchImagesTexts(); // Llama a la función de carga al montar el componente
  }, [branchId]); // Añade branchId como dependencia para que se vuelva a llamar cuando cambie

  // Configuración del Slider
  const settings = {
    dots: true,
    speed: 1800,
    slidesToShow: Math.min(imagesTexts.length, 4), // Muestra hasta un máximo de 4 elementos o los que haya en imagesTexts
    slidesToScroll: 1, // Desplaza solo 1 elemento a la vez
    arrows: false,
    infinite: imagesTexts.length > 4, // Permite desplazamiento infinito si hay más de 4 elementos
    autoplay: true, // Activa el autoplay
    autoplaySpeed: 5000, // Velocidad del autoplay (en milisegundos)
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(imagesTexts.length, 4),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(imagesTexts.length, 1), // En pantallas pequeñas, muestra solo 1 elemento a la vez
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Renderizado condicional del Slider
  return (
    <div style={{ textAlign: 'center', width: '90%', margin: '0 auto' }}>
      {imagesTexts.length > 0 && (
        <Slider {...settings}>
          {imagesTexts.map((imageText, index) => (
            <div key={index}>
              <CarouselItem imageUrl={imageText.photo} title={imageText.fullName} text={imageText.specialty} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TitleAndCarousel;
