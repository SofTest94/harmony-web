// import React, { useEffect, useState } from 'react';
// // import { getImagesTexts } from '../../../services/imagesTextsService'; // Importa la función para llamar al servicio
// import '../../styles/Body/Section2.scss';
// import CardServiceType from '../../molecules/CardServiceType';
// import { Treatments } from '../../types/treatments';
// import { serviceServices } from '../../services/service';

// // const Section2: React.FC = () => {
// interface Section2Props {
//   selectedBranch: string;
// }

// const ServiceList: React.FC<Section2Props> = ({ selectedBranch }) => {
//   const [imagesTexts, setImagesTexts] = useState<Treatments[]>([]); // Indica que el estado es un array de ImageText

//   useEffect(() => {
//     // Llama al servicio para obtener los datos
//     async function fetchImagesTexts() {
//       try {
//         const data = await serviceServices.getAllServices(selectedBranch!); // Llama a la función del servicio
//         setImagesTexts(data); // Actualiza el estado con los datos recibidos del servicio
//       } catch (error) {
//         console.error('Error fetching images texts:', error);
//       }
//     }

//     fetchImagesTexts(); // Llama a la función de carga al montar el componente
//   }, [selectedBranch]);

//   return (
//     <>
//       <div className="churrito">
//         <div className="title-container">
//           <h1 className="title">
//             Servicios que ofrecemos para ti:{' '}
//             {selectedBranch}
//           </h1>
//         </div>
//         <div className="image-text-container">
//           {imagesTexts.map((imageText, index) => (
//             <div key={index} className="image-text">
//               <CardServiceType imageUrl={imageText.img} title={imageText.title} text={imageText.description} />
//             </div>
//           ))}
//         </div>
//         {/* <div className="churrito2"></div> */}
//       </div>
//     </>
//   );
// };

// export default ServiceList;





import React, { useEffect, useState } from 'react';
import '../../styles/Body/Section2.scss';
import CardServiceType from '../../molecules/CardServiceType';
import { Treatments } from '../../types/treatments';
import { serviceServices } from '../../services/service';
import { Branches } from '../../types/branches';

interface Section2Props {
  selectedBranch: Branches | null; // Prop que recibe el objeto branch seleccionado
}

const ServiceList: React.FC<Section2Props> = ({ selectedBranch }) => {
  const [imagesTexts, setImagesTexts] = useState<Treatments[]>([]); // Estado para almacenar los datos de tratamientos

  useEffect(() => {
    // Función para llamar al servicio y obtener los datos de servicios
    async function fetchImagesTexts() {
      try {
        if (selectedBranch) {
          // Llama al servicio para obtener los datos de tratamientos específicos de la sucursal seleccionada
          const data = await serviceServices.getAllServicesByIdBranch(selectedBranch._id);
          setImagesTexts(data); // Actualiza el estado con los datos recibidos del servicio
        }
        
        
      } catch (error) {
        console.error('Error fetching service texts:', error);
      }
    }

    fetchImagesTexts(); // Llama a la función de carga al montar el componente o cuando selectedBranch cambia
  }, [selectedBranch]);

  return (
    <>
      <div className="churrito">
        <div className="title-container">
          <h1 className="title">
            Servicios que ofrecemos para ti
          </h1>
        </div>
        <div className="image-text-container">
          {imagesTexts.map((imageText, index) => (
            <div key={index} className="image-text">
              <CardServiceType imageUrl={imageText.img} title={imageText.title} text={imageText.description} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceList;
