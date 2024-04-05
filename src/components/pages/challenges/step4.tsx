import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeaderSteper from '@/components/molecules/HeaderSteper';
import ModalIcon from '@/components/organisms/ModalIcon';
import IconSuccess from '@/icon/icon-success.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Table from '@/components/organisms/Table';

import { challengeStep1Type } from '@/app/types/challenge.types';

type Step4Props = {
  showData: any;
  onSubmit: () => void;
};

const Step4: React.FC<Step4Props> = ({ showData, onSubmit }) => {
  const router = useRouter();
  const [createdModalVisible, setCreatedModalVisible] = useState(false);
  const { handleSubmit } = useForm<any>();
  const handleFormSubmit = () => {
    setCreatedModalVisible(true);
    onSubmit();
  };

  const challengeStartDate = new Date(
    showData.challengeStartDate + 'T00:00:00',
  );
  const challengeEndDate = new Date(challengeStartDate.getTime());
  challengeEndDate.setDate(challengeEndDate.getDate() + 30); // Reemplazar por la duración del reto

  const formatter = new Intl.DateTimeFormat('es', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Mexico_City',
  });

  const formattedStartDate = formatter.format(challengeStartDate);
  const formattedEndDate = formatter.format(challengeEndDate);

  return (
    <>
      <div className="form-control form-center-step6">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-control form-center-step6">
            <HeaderSteper
              title="Corrobora los detalles del reto"
              description="Antes de lanzar tu desafío, revisa los detalles:"
            />
            <div>
              <div style={{ display: 'flex' }}>
                <h2 style={{ marginRight: 10 }}>Nombre del reto:</h2>
                <p>{showData.challengeName}</p>
              </div>

              <div style={{ display: 'flex' }}>
                <h2 style={{ marginRight: 10 }}>Fecha de inicio:</h2>
                <p>{formattedStartDate}</p>
              </div>

              <div style={{ display: 'flex' }}>
                <h2 style={{ marginRight: 10 }}>Duración del reto:</h2>
                <p>30 días</p>
              </div>

              <div style={{ display: 'flex' }}>
                <h2 style={{ marginRight: 10 }}>Fecha de fin: </h2>
                <p>{formattedEndDate}</p>
              </div>

              <div style={{ display: 'flex' }}>
                <h2 style={{ marginRight: 10 }}>Descripción:</h2>
                <p>{showData.challengeShortDescription}</p>
              </div>

              <div style={{ display: 'flex' }}>
                <h2 style={{ marginRight: 10 }}>Premio:</h2>
                <p>{showData.challengeAward}</p>
              </div>
            </div>

            <div className="form-control form-center">
              <button className="button-primary" type="submit">
                Crear Reto
              </button>
              <button
                className="button-secondary"
                type="button"
                onClick={() => {
                  console.log('Editar reto');
                }}
              >
                Editar reto
              </button>
            </div>
          </div>
        </form>
        <ModalIcon
          visible={createdModalVisible}
          icon={IconSuccess}
          message="Reto de salud creado exitosamente."
          onPressAccept={() => {
            setCreatedModalVisible(false);
            router.push('/dashboard/challenge');
          }}
        />
      </div>
    </>
  );
};

export default Step4;
