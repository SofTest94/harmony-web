import React from 'react';
import Button from '../../../atoms/Button';
import { handleScheduleAppointmentClick } from '../../../../utils/functions';

const TextContent: React.FC = () => {
  return (
    <>
      <div style={{ width: '40%', display: 'inline-block', alignContent: 'center' }}>
        <img
          src="/img/yellow1.png"
          alt="Descripción de la imagen"
          style={{ width: '100%', maxWidth: '85%', height: 'auto', margin: '0 auto', display: 'block' }}
        />
      </div>
      <div style={{ width: '50%', display: 'inline-block', verticalAlign: 'top', marginTop: '5%' }}>
        <div style={{ paddingTop: '6%', paddingLeft: '5%' }}>
          <h1 style={{ fontSize: '2.8vw' }}>Recuperar tu sonrisa y tu libertad ahora es posible</h1>
          <p style={{ fontSize: '1.2vw' }}>
            Nuestro enfoque se centra en liberar tu potencial fusionando técnicas especializadas y tecnología actual.
            También proporcionándote las herramientas y tratamientos más innovadores para que disfrutes de una vida activa y
            sin limitaciones.
          </p>
          <div style={{ marginTop: '15%' }}>
            <Button
              onClick={() => handleScheduleAppointmentClick('7711129510', 'Buenas tardes, me gustaria agendar una cita.')}
              className={'section-btn'}
            >
              Agendar cita
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextContent;
