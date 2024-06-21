// import React, { useEffect, useState } from 'react';
// import { Branches } from './types/branches';
// import { branchServices } from './services/branches';

// interface EmployeeSectionProps {
//   selectedBranch: string;
// }

// const EmployeeSection: React.FC<EmployeeSectionProps> = ({ selectedBranch }) => {
//   //   const [data, setDataBranches] = useState<Branches[]>([]);

//   // useEffect(() => {
//   //   // Llama al servicio para obtener los datos
//   //   async function fetchDataBranches() {
//   //     try {
//   //       const data = await branchServices.getAllBranches(selectedBranch);// videos
//   //       setDataBranches(data); // Actualiza el estado con los datos recibidos del servicio
//   //     } catch (error) {
//   //       console.error('Error fetching data branches:', error);
//   //     }
//   //   }

//   //   fetchDataBranches(); // Llama a la función de carga al montar el componente
//   // }, []);
//   return (
//     <section>
//       <h2>Empleados</h2>
//       <p>Sucursal selssseccionada: {selectedBranch}</p>
//       {/* Aquí puedes mostrar la información de los empleados */}
//     </section>
//   );
// };

// export default EmployeeSection;
