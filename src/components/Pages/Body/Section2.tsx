import React, { useEffect, useState } from 'react';
import '../../styles/Body/Section2.scss';
import CardServiceType from '../../molecules/CardServiceType';
import { Treatments } from '../../types/treatments';
import { treatmentsServices } from '../../services/treatments';
import { Branches } from '../../types/branches';
import SkeletonSection2 from '../Skeleton/SkeletonSection2';
import { Box, Skeleton } from '@mui/material';

interface Section2Props {
  selectedBranch: Branches | null; // Prop que recibe el objeto branch seleccionado
}

const Section2: React.FC<Section2Props> = ({ selectedBranch }) => {
  const [imagesTexts, setImagesTexts] = useState<Treatments[]>([]); // Estado para almacenar los datos de tratamientos
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para controlar la carga de datos
  const [loagind, setLoading] = useState(true);

  useEffect(() => {
    // Función para llamar al servicio y obtener los datos de tratamientos
    async function fetchImagesTexts() {
      try {
        if (selectedBranch) {
          
          // Llama al servicio para obtener los datos de tratamientos específicos de la sucursal seleccionada
          const data = await treatmentsServices.getAllTreatmentsByIdBranch(selectedBranch._id);
          setImagesTexts(data); // Actualiza el estado con los datos recibidos del servicio
          setIsLoading(false); // Indica que la carga ha finalizado
          setLoading(false)
        }
      } catch (error) {
        setLoading(true)
        console.error('Error fetching images texts:', error);
      }
    }

    fetchImagesTexts(); // Llama a la función de carga al montar el componente o cuando selectedBranch cambia
  }, [selectedBranch]);

  // Muestra el esqueleto mientras se cargan los datos
  if (isLoading) {
    return <SkeletonSection2 />;
  }

  // Cuando isLoading es false y imagesTexts tiene datos, renderiza el contenido
  return (
    <div className="churrito">
      <div className="title-container">
        <h1 className="title">
          Es por ello que en Harmony nosotros te guiamos en cada paso hacia tu libertad tratando lesiones como:
        </h1>
      </div>
      <div className="image-text-container">
        {/* {imagesTexts.map((imageText, index) => (
          <div key={index} className="image-text">
            <CardServiceType imageUrl={imageText.img} title={imageText.title} text={imageText.description} />
          </div>
        ))} */}
        {loagind === false ? (
          imagesTexts.map((imageText, index) => (
            <div key={index} className="image-text">
              <CardServiceType imageUrl={imageText.img} title={imageText.title} text={imageText.description} />
            </div>
          ))
        ) : (
          // Muestra un esqueleto rectangular si no hay datos cargados
          <Box sx={{ display: 'flex', marginBottom:'3vw' }}>
            <Skeleton variant="rectangular" width={210} height={118} style={{ marginRight: '1vw' }} />
            <Skeleton variant="rectangular" width={210} height={118} style={{ marginRight: '1vw' }} />
            <Skeleton variant="rectangular" width={210} height={118} style={{ marginRight: '1vw' }} />
            <Skeleton variant="rectangular" width={210} height={118} />
          </Box>
        )}
      </div>
    </div>
  );
};

export default Section2;
