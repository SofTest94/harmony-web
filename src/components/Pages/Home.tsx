// import React, { useState, useEffect } from 'react';
// import Header from '../Header';
// import AppBar from '../AppBar';
// // import Footer from '../Footer';
// import PartnerSection from '../PartnerSection';
// import ServiceSection from '../ServiceSection';
// import TreatmentSection from '../TreatmentSection';
// import EmployeeSection from '../EmployeeSection';
// import BranchSelect from '../BranchSelect';
// import Section2 from './Body/Section2';
// import Section1 from './Body/Section1';
// import Section3 from './Body/Section3';
// import Section5 from './Body/Section5';
// import Section4 from './Body/Section4';
// import Footer from '../organisms/Footer';

// const Home: React.FC = () => {
//   const [selectedBranch, setSelectedBranch] = useState<string>('México'); // Valor predeterminado

//   const handleSelectBranch = (branch: string) => {
//     setSelectedBranch(branch);
//     // Lógica para cambiar los datos según la sucursal seleccionada
//   };

//   useEffect(() => {
//     setSelectedBranch('México');
//   }, []);

//   return (
//     <div>
//       {/* <Header /> */}
//       <AppBar onSelectBranch={handleSelectBranch} />
//       <div id="services">
//         <Section1 />
//       </div>
//       <div id="section2">
//         <Section2 />
//       </div>
//       <div id="treatments">
//         <Section3 />
//       </div>
//       <div id="treatments">
//         <Section4 />
//       </div>

//       {/* <div id="employees">
//         <EmployeeSection selectedBranch={selectedBranch} />
//       </div> */}
//       <div id="partners">
//         <Section5 />
//       </div>
//       {/* <Footer /> */}
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default Home;
