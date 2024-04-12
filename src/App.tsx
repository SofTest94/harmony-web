// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './components/Pages/HomePage';
// import React from 'react';

// // import HomePage from './components/HomePage';

// const App: React.FC = () => {
//   return (
//     <div className="container">
//       {' '}
//       {/* Contenedor principal */}
//       <Router>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Body from './components/organisms/Body';
import MainTemplate from './components/templates/MainTemplate';
// import Header from './Header';
// import Body from './Body';
// import Footer from './Footer';

const App: React.FC = () => {
  return <MainTemplate />;
};

export default App;
