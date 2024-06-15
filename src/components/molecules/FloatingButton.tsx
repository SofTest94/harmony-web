// import React, { useState, useEffect } from 'react';
// import { Fab, Tooltip } from '@mui/material';
// import FormModal from './FormModal';
// import '../styles/FloatingButton.scss'; // Importa tus estilos aquí
// // import floatingButtonImage from '../assets/floating_button_image.png'; // Importa la imagen aquí

// const FloatingButton = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isShaking, setIsShaking] = useState(false);

//   useEffect(() => {
//     const shakeInterval = setInterval(() => {
//       setIsShaking(true);
//       setTimeout(() => {
//         setIsShaking(false);
//       }, 5000); // Duración del movimiento: 5 segundos (5000 milisegundos)
//     }, 10000); // Intervalo entre movimientos: 10 segundos (10000 milisegundos)

//     return () => clearInterval(shakeInterval);
//   }, []);

//   const handleModalOpen = () => {
//     setModalOpen(true);
//     setIsShaking(false); // Detener el movimiento cuando se abre el modal
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   return (
//     <>
//       <Tooltip title="Solicitar información" aria-label="add">
//         <Fab
//           color="primary"
//           aria-label="add"
//           className={isShaking ? 'shaking-button' : ''}
//           style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'rgb(0, 214, 178)' }}
//           onClick={handleModalOpen}
//         >
//           <img
//             src={
//               'https://cdn2.iconfinder.com/data/icons/2018-social-media-app-logos/1000/2018_social_media_popular_app_logo-whatsapp-512.png'
//             }
//             alt="Floating Button"
//             style={{
//               width: '5vw',
//               height: '5vw',
//               borderRadius: '50%',
//               backgroundColor: 'rgb(0, 214, 178)',
//             }}
//           />
//         </Fab>
//       </Tooltip>
//       <FormModal open={modalOpen} handleClose={handleModalClose} />
//     </>
//   );
// };

// export default FloatingButton;

import React, { useState, useEffect } from 'react';
import { Fab, Tooltip } from '@mui/material';
import FormModal from './FormModal';
import '../styles/FloatingButton.scss'; // Importa tus estilos aquí
// import Chatbot from './Chatbot';//se elmino esto jms mvp2
// import floatingButtonImage from '../assets/floating_button_image.png'; // Importa la imagen aquí

const FloatingButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 10000); // Duración del movimiento: 5 segundos (5000 milisegundos)
    }, 3000); // Intervalo entre movimientos: 10 segundos (10000 milisegundos)

    return () => clearInterval(shakeInterval);
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
    setIsShaking(false); // Detener el movimiento cuando se abre el modal
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
    
      <Tooltip title={<span style={{ animation: 'shine 1s infinite' }}>Solicitar información</span>} aria-label="add">
        <Fab
          color="primary"
          aria-label="add"
          className={isShaking ? 'shaking-button' : ''}
          style={{ position: 'fixed', bottom: '20px', right: '2%', backgroundColor: '#00bb2d', marginBottom:'130px' }}
          onClick={handleModalOpen}
        >
          <img
            src={
              'https://cdn2.iconfinder.com/data/icons/2018-social-media-app-logos/1000/2018_social_media_popular_app_logo-whatsapp-512.png'
            }
            alt="Floating Button"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: 'rgb(0, 214, 178)',
            }}
          />
        </Fab>
      </Tooltip>
      <FormModal open={modalOpen} handleClose={handleModalClose} />
    </>
  );
};

export default FloatingButton;
