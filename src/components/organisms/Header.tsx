import React, { useRef, useEffect } from 'react';
import '../styles/HeaderStyles.scss';
import { handleScheduleAppointmentClick } from '../../utils/functions';

const Header: React.FC = () => {
  const textoRef = useRef<HTMLHeadingElement>(null);
  const textoWidthRef = useRef<number | null>(null);

  useEffect(() => {
    const updateTextoWidth = () => {
      if (textoRef.current) {
        const textoWidth = textoRef.current.getBoundingClientRect().width;
        textoWidthRef.current = textoWidth;
        console.log('Ancho del texto:', textoWidth);
      }
    };

    window.addEventListener('resize', updateTextoWidth);
    updateTextoWidth(); // Llamada inicial para asegurarse de obtener el ancho del texto
    return () => {
      window.removeEventListener('resize', updateTextoWidth);
    };
  }, []);

  return (
    <header>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTfW3LK612W9CTal5eAfluf0juuIdypb3XPUihuIvzHg&s"
          src="/img/header.png"
          alt="Descripción de la imagen"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '60%', // Ajustar el valor para desplazar el texto más hacia la derecha
            transform: 'translate(-50%, -50%)',
            textAlign: 'start',
            maxWidth: textoWidthRef.current ? `${textoWidthRef.current}px` : 'auto',
            wordWrap: 'break-word',
            paddingTop: '15.5%',
          }}
        >
          <h3
            ref={textoRef}
            style={{ color: 'white', fontSize: '1.8vw', fontFamily: 'Roboto', fontWeight: 700, marginBottom: '1vw' }}
          >
            ¿Quién te acompaña en el viaje hacia
            <br />
            una vida libre de dolores, con felicidad
            <br />
            y libertad para volver a disfrutar de tu
            <br />
            vida plenamente?
          </h3>
          <h3
            style={{
              color: 'white',
              fontSize: '4.5vw',
              marginTop: '-1vw',
              marginBottom: '0.3vw',
              fontFamily: 'Roboto',
              paddingTop: '2vw',
            }}
          >
            Harmony
          </h3>
          <h3 style={{ color: 'white', fontSize: '4.5vw', marginTop: '0.3vw', fontFamily: 'Roboto', marginBottom: '1vw' }}>
            es la respuesta
          </h3>
          <button
            style={{
              backgroundColor: '#F9EC08',
              color: 'black',
              padding: '1.0vw 2.5vw',
              fontSize: '1.6vw',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
              marginTop: '0.3vw', // Agrega margen superior al botón
            }}
            onClick={() => handleScheduleAppointmentClick('7711129510', 'Buenas tardes, me gustaria agendar una cita.')}
          >
            Agendar cita
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
