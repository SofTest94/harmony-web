import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import HeaderSteper from '@/components/molecules/HeaderSteper';
import { CampaignStep3Type } from '@/app/types/campaign.types';
import iconHealth from '@/icon/icon-health.svg';
import Image from 'next/image';

type Step3Props = {
  onFormSubmit: (data: CampaignStep3Type) => void;
  updateCurrentPage: (cont: number) => void;
};

const Step3: React.FC<Step3Props> = ({ onFormSubmit, updateCurrentPage }) => {
  const [psychologist, setPsychologist] = useState<string>('Psicólogo');
  const [nutritionist, setNutritionist] = useState<string>('Nutriólogo');
  const [general, setGeneral] = useState<string>('General');

  const [selectedButton, setSelectedButton] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignStep3Type>({});

  const convertTypeService = (type: string) => {
    switch (type) {
      case 'nutritionist':
        return 'Nutriólogo';
      case 'psychologist':
        return 'Psicólogo';
      default:
        return 'General';
    }
  };
  const onSubmit = (data: CampaignStep3Type) => {
    // Enviar los datos del formulario y actualizar la página
    if (selectedButton === '') {
      setShowError(true);
      return;
    }

    // Agregar el valor de selectedButton a los datos del formulario
    const form_data_with_selection: CampaignStep3Type = {
      type_specialty: selectedButton,
    };
    form_data_with_selection.type_specialty = convertTypeService(
      form_data_with_selection.type_specialty,
    );
    onFormSubmit(form_data_with_selection);
    updateCurrentPage(2);
  };

  return (
    <>
      <HeaderSteper
        title=" Elige el tipo de cita médica"
        description="Ahora, elige qué tipo de especialista deseas. Selecciona el médico especialista y haz clic en Siguiente para avanzar. 
¡En Mediclar cuidamos la salud de tu equipo con prevención!"
      />
      <div className="form-control form-center">
        <form
          className="form-control"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="input-control-evenly">
            <button
              type="button"
              id="psychologist"
              className="button-select-service"
              onClick={() => {
                setSelectedButton('psychologist');
                setShowError(false);
                setNutritionist('Nutriólogo');
                setGeneral('General');
              }}
            >
              <Image src={iconHealth} alt="" className="icon-select" />
              {psychologist}
            </button>

            <button
              type="button"
              id="nutritionist"
              className="button-select-service"
              onClick={() => {
                setSelectedButton('nutritionist');
                setShowError(false);
                setGeneral('General');
                setPsychologist('Psicólogo');
              }}
            >
              <Image src={iconHealth} alt="" className="icon-select" />
              {nutritionist}
            </button>

            <button
              type="button"
              id="general"
              className="button-select-service"
              onClick={() => {
                setSelectedButton('general');
                setShowError(false);
                setNutritionist('Nutriólogo');
                setPsychologist('Psicólogo');
              }}
            >
              <Image src={iconHealth} alt="" className="icon-select" />
              {general}
            </button>
          </div>

          <div>
            <p>{showError ? 'Selecciona un tipo de cita médica' : ''}</p>
          </div>
          <button className="button-primary" type="submit">
            Siguiente
          </button>
        </form>
      </div>
    </>
  );
};

export default Step3;
