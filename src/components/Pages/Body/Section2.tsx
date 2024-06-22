// import React, { useEffect, useState } from 'react';
// // import { getImagesTexts } from '../../../services/imagesTextsService'; // Importa la función para llamar al servicio
// import '../../styles/Body/Section2.scss';
// import CardServiceType from '../../molecules/CardServiceType';
// import { Treatments } from '../../types/treatments';
// import { treatmentsServices } from '../../services/treatments';
// import { Branches } from '../../types/branches';

// // const Section2: React.FC = () => {
// interface Section2Props {
//   onSelect: (branch: Branches) => void; // Función para manejar la selección de la sucursal
// }

// // const Section2: React.FC<Section2Props> = ({ selectedBranch }) => {
//   const Section2: React.FC<Section2Props> = ({ onSelect }) => {
//   const [imagesTexts, setImagesTexts] = useState<Treatments[]>([]); // Indica que el estado es un array de ImageText
//   const [branchName, setBranchName] = React.useState<string>(''); // Estado para almacenar las sucursales obtenidas  

//   useEffect(() => {
//     // Llama al servicio para obtener los datos
//     async function fetchImagesTexts() {
//       try {
//         const data = await treatmentsServices.getAllTreatments(''); // Llama a la función del servicio
//         setImagesTexts(data); // Actualiza el estado con los datos recibidos del servicio
//         setValueBranch;
//       } catch (error) {
//         console.error('Error fetching images texts:', error);
//       }
//     }

//     fetchImagesTexts(); // Llama a la función de carga al montar el componente
//   }, [onSelect]);

//   const setValueBranch = (branch: Branches) => {
//     setBranchName(branch.name)
//   };

//   return (
//     <>
//       <div className="churrito">
//         <div className="title-container">
//           <h1 className="title">
//             Es por ello que en Harmony nosotros te guiamos en cada paso hacia tu libertad tratando lesiones cómo:{' '}
//             {branchName}
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

// export default Section2;





import React, { useEffect, useState } from 'react';
import '../../styles/Body/Section2.scss';
import CardServiceType from '../../molecules/CardServiceType';
import { Treatments } from '../../types/treatments';
import { treatmentsServices } from '../../services/treatments';
import { Branches } from '../../types/branches';

interface Section2Props {
  selectedBranch: Branches | null; // Prop que recibe el objeto branch seleccionado
}

const Section2: React.FC<Section2Props> = ({ selectedBranch }) => {
  const [imagesTexts, setImagesTexts] = useState<Treatments[]>([]); // Estado para almacenar los datos de tratamientos
  const [branchName, setBranchName] = useState<string>(''); // Estado para almacenar el nombre de la sucursal seleccionada

  useEffect(() => {
    // Función para llamar al servicio y obtener los datos de tratamientos
    async function fetchImagesTexts() {
      try {
        if (selectedBranch) {
          // Llama al servicio para obtener los datos de tratamientos específicos de la sucursal seleccionada
          const data = await treatmentsServices.getAllTreatmentsByIdBranch(selectedBranch._id);
          setImagesTexts(data); // Actualiza el estado con los datos recibidos del servicio
          setBranchName(selectedBranch.name); // Establece el nombre de la sucursal seleccionada
        }
      } catch (error) {
        console.error('Error fetching images texts:', error);
      }
    }

    fetchImagesTexts(); // Llama a la función de carga al montar el componente o cuando selectedBranch cambia
  }, [selectedBranch]);

  return (
    <div className="churrito">
      <div className="title-container">
        <h1 className="title">
          Es por ello que en Harmony nosotros te guiamos en cada paso hacia tu libertad tratando lesiones como:
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
  );
};

export default Section2;
