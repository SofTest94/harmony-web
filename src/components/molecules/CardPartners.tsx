// import React from 'react';

// interface CardProps {
//   imageUrl: string;
//   title: string;
//   description: string;
// }

// const CardPartners: React.FC<CardProps> = ({ imageUrl, title, description }) => {
//   return (
//     <div style={{ width: '50%', textAlign: 'center', margin: '0 auto' }}>
//       <div
//         style={{
//           width: '100%',
//           height: '55vh',
//           borderRadius: '5%',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <img
//           src={imageUrl}
//           alt="Imagen de la tarjeta"
//           style={{
//             width: '60%',
//             height: '40%',
//             border: '3px solid #D9D9D9',
//             borderRadius: '10%',
//             padding: '5%',
//           }}
//         />
//         <h2 style={{ fontSize: '2.5vw', marginBottom: '2vw' }}>{title}</h2> {/* Utilizando unidades relativas */}
//         <p style={{ textAlign: 'justify', fontSize: '2vw' }}>{description}</p> {/* Utilizando unidades relativas */}
//       </div>
//     </div>
//   );
// };

// export default CardPartners;

import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const CardPartners: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div
      style={{
        // backgroundColor: '#F5F5F5',
        padding: '2vw', // Utilizando unidades relativas
        borderRadius: '2vw', // Utilizando unidades relativas
        textAlign: 'center',
        margin: '2vw',
        marginTop: '5vw', // Utilizando unidades relativas
        position: 'relative',
        // border: '0.2vw solid #D9D9D9', // Utilizando unidades relativas
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0vw', // Utilizando unidades relativas
          left: '50%',
          transform: 'translateX(-50%)',
          width: '33vw', // Utilizando unidades relativas
          height: '15vw', // Utilizando unidades relativas
          borderRadius: '5%',
          border: '0.2vw solid #D9D9D9', // Utilizando unidades relativas
          overflow: 'hidden',
          // backgroundColor: 'blue',
        }}
      >
        <img
          src={imageUrl}
          alt="Descripción de la imagen"
          // export type ObjectFit = Globals | "contain" | "cover" | "fill" | "none" | "scale-down";
          style={{ width: '90%', height: '100%', objectFit: 'contain', objectPosition: 'center top' }}
        />
      </div>
      <div
        style={{
          marginTop: '15.5vw',
          // backgroundColor: 'blue',
        }}
      >
        <h2 style={{ textAlign: 'start', fontSize: '2vw' }}>{title}</h2>
        <p style={{ textAlign: 'start', fontSize: '1.5vw', width: '100%' }}>{description}</p>
      </div>
    </div>
  );
};

export default CardPartners;
