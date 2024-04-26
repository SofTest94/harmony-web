import React, { useEffect, useState } from 'react';
// import { getImagesTexts } from '../../../services/imagesTextsService'; // Importa la función para llamar al servicio
import '../../styles/Body/Section2.scss';
import CardServiceType from '../../molecules/CardServiceType';
import { Treatments } from '../../types/treatments';
import { treatmentsServices } from '../../services/treatments';

const Section2: React.FC = () => {
  const [imagesTexts, setImagesTexts] = useState<Treatments[]>([]); // Indica que el estado es un array de ImageText

  useEffect(() => {
    // Llama al servicio para obtener los datos
    async function fetchImagesTexts() {
      try {
        const data = await treatmentsServices.getAllTreatments(''); // Llama a la función del servicio
        setImagesTexts(data); // Actualiza el estado con los datos recibidos del servicio
      } catch (error) {
        console.error('Error fetching images texts:', error);
      }
    }

    fetchImagesTexts(); // Llama a la función de carga al montar el componente
  }, []);

  return (
    <>
      <div className="churrito">
        <div className="title-container">
          <h1 className="title">
            Es por ello que en Harmony nosotros te guiamos en cada paso hacia tu libertad tratando lesiones cómo:
          </h1>
        </div>
        <div className="image-text-container">
          {imagesTexts.map((imageText, index) => (
            <div key={index} className="image-text">
              <CardServiceType imageUrl={imageText.img} title={imageText.title} text={imageText.description} />
            </div>
          ))}
        </div>
        {/* <div className="churrito2"></div> */}
      </div>
    </>
  );
};

export default Section2;
