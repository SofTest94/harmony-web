import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeaderSteper from '@/components/molecules/HeaderSteper';

import Card from '@/components/atoms/Card';
import { defaultChallengesService } from '@/services/challenge/defaultChallenges';
import { challengeStep1Type } from '@/app/types/challenge.types';

type Step1Props = {
  onFormSubmit: (data: challengeStep1Type) => void;
};

const Step1: React.FC<Step1Props> = ({ onFormSubmit }) => {
  const [challenges, setChallenges] = useState<any>([]); // Cambiar el tipo de datos a el objeto de respuesta de todos los retos.
  const [selectedChallenge, setSelectedChallenge] =
    useState<challengeStep1Type | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<challengeStep1Type>({});

  useEffect(() => {
    const fetchChallengesDefaultData = async () => {
      try {
        const defaultChallengesData: any = // Cambiar el tipo de datos a el objeto de respuesta de todos los retos.
          await defaultChallengesService.getAllDefaultChallenges('');
        console.log('Data fetched', defaultChallengesData);
        setChallenges(defaultChallengesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchChallengesDefaultData();
  }, []);

  const handleSelectChallenge = (id: string) => {
    // Encuentra el desafío por su ID
    const selectedChallengeInfo = challenges.find(
      (challenge: challengeStep1Type) => challenge._id === id,
    );

    // Verifica si se encontró el desafío y muestra su información en consola
    if (selectedChallengeInfo) {
      console.log('Selected challenge details:', selectedChallengeInfo);
    } else {
      console.log('Challenge with ID not found:', id);
      setSelectedChallenge(null);
    }

    // Actualiza el estado con el ID del desafío seleccionado
    setSelectedChallenge(selectedChallengeInfo);
    setShowError(false);
  };

  const onSubmit = (data: challengeStep1Type) => {
    if (!selectedChallenge) {
      setShowError(true);
      return;
    }

    // Agregar el valor de selectedChallenge a los datos del formulario
    const form_data_with_selection: any = {
      challenge: selectedChallenge,
    };
    console.log('Data:', form_data_with_selection);
    onFormSubmit(form_data_with_selection);
  };

  return (
    <>
      <HeaderSteper
        title="Elige el reto"
        description='Bienvenido al emocionante mundo de los "Retos de Salud". Comencemos seleccionando el reto que mejor se adapte a tus objetivos de bienestar. Elige entre nuestra lista de desafíos prediseñados por médicos expertos. ¿Quieres fomentar la actividad física, mejorar la nutrición o promover la salud mental? Selecciona el reto que inspire a tus colaboradores y los motive a adoptar hábitos más saludables. ¡En Mediclar, transformamos la salud en un juego para un equipo más saludable!.'
      />
      <div className="form-control form-center">
        <form
          className="form-control"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              justifyContent: 'center',
            }}
          >
            {challenges.map(
              (
                challenge: any, // Cambiar el tipo de datos a el objeto de respuesta de todos los retos.
              ) => (
                <Card
                  key={challenge._id}
                  challenge={challenge}
                  isSelected={selectedChallenge?._id === challenge._id} // Asegúrate de comparar el ID correcto
                  onSelect={handleSelectChallenge}
                />
              ),
            )}
          </div>

          <div>
            <p>{showError ? 'Selecciona un reto' : ''}</p>
          </div>
          <button className="button-primary" type="submit">
            Siguiente
          </button>
        </form>
      </div>
    </>
  );
};

export default Step1;
