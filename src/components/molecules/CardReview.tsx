// import React from 'react';
// import { FaFacebook } from 'react-icons/fa';

// interface CardProps {
//   title: string;
//   description: string;
//   imageUrl: string;
// }

// const CardReviewUpdate: React.FC<CardProps> = ({ title, description, imageUrl }) => {
//   const shortDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

//   return (
//     <div
//       style={{
//         backgroundColor: '#F5F5F5',
//         padding: '2vw',
//         borderRadius: '2vw',
//         textAlign: 'center',
//         margin: '2vw',
//         marginTop: '5vw',
//       }}
//     >
//       {/* Primera fila */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2vw' }}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <div
//             style={{
//               width: '3vw',
//               height: '3vw',
//               borderRadius: '50%',
//               overflow: 'hidden',
//               marginRight: '1vw',
//             }}
//           >
//             <img
//               src={imageUrl}
//               alt="Descripción de la imagen"
//               style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
//             />
//           </div>
//           <div style={{ textAlign: 'left' }}>
//             <p style={{ margin: 0, fontSize: '1.3vw' }}>Jorge Montiel Salguero</p>
//             <p style={{ margin: 0, fontSize: '1vw', color: 'gray' }}>21/11/1994</p>
//           </div>
//         </div>
//         <div>
//         <FaFacebook style={{ width: '2.8vw', height: '2.8vw' }} color="#3b5998" />
//         </div>
//       </div>

//       {/* Segunda fila */}
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2vw' }}>
//         {/* Aquí podrías agregar el componente de rating (estrellas) */}
//         <p style={{ margin: 0, fontSize: '1.2vw' }}>⭐⭐⭐⭐⭐</p>
//       </div>

//       {/* Tercera fila */}
//       <div style={{ textAlign: 'left' }}>
//         <p style={{ fontSize: '1vw' }}>{shortDescription}</p>
//         {description.length > 100 && (
//           <button style={{ fontSize: '1vw', color: '#00D6B2', background: 'none', border: 'none', cursor: 'pointer' }}>
//             Leer más
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CardReviewUpdate;


import React, { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const CardReviewUpdate: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription = description.substring(0, 100);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      style={{
        backgroundColor: '#F5F5F5',
        padding: '2vw',
        borderRadius: '2vw',
        textAlign: 'center',
        margin: '2vw',
        marginTop: '5vw',
      }}
    >
      {/* Primera fila */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2vw' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '3vw',
              height: '3vw',
              borderRadius: '50%',
              overflow: 'hidden',
              marginRight: '1vw',
            }}
          >
            <img
              src={imageUrl}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '1.3vw' }}>Jorge Montiel Salguero</p>
            <p style={{ margin: 0, fontSize: '1vw', color: 'gray' }}>21/11/1994</p>
          </div>
        </div>
        <div>
          <FaFacebook style={{ width: '2.8vw', height: '2.8vw' }} color="#3b5998" />
        </div>
      </div>

      {/* Segunda fila */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2vw' }}>
        {/* Aquí podrías agregar el componente de rating (estrellas) */}
        <p style={{ margin: 0, fontSize: '1.2vw' }}>⭐⭐⭐⭐⭐</p>
      </div>

      {/* Tercera fila */}
      <div style={{ textAlign: 'left' }}>
        <p style={{ fontSize: '1.3vw' }}>
          {isExpanded ? description : `${shortDescription}...`}
        </p>
        <button 
          onClick={handleToggle} 
          style={{ fontSize: '1vw', color: '#00D6B2', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {isExpanded ? 'Ver menos' : 'Leer más'}
        </button>
      </div>
    </div>
  );
};

export default CardReviewUpdate;
