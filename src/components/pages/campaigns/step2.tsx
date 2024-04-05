import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import HeaderSteper from '@/components/molecules/HeaderSteper';
import { CampaignStep2Type } from '@/app/types/campaign.types';
import iconHealth from '@/icon/icon-health.svg';
import Image from 'next/image';

type Step2Props = {
  onFormSubmit: (data: CampaignStep2Type) => void;
  updateCurrentPage: (cont: number) => void;
};

const Step2: React.FC<Step2Props> = ({ onFormSubmit, updateCurrentPage }) => {
  const [medical_appointment_text, setMedicalAppointmentText] =
    useState<string>('Cita medica');
  const [analysis_text, setAnalysisText] = useState<string>('Análisis');
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignStep2Type>({});

  const onSubmit = (data: CampaignStep2Type) => {
    // Enviar los datos del formulario y actualizar la página
    if (selectedButton === '') {
      setShowError(true);
      return;
    }

    // Agregar el valor de selectedButton a los datos del formulario
    const form_data_with_selection: CampaignStep2Type = {
      type_service: selectedButton,
    };

    if (form_data_with_selection.type_service === 'Análisis') {
      onFormSubmit(form_data_with_selection);
      updateCurrentPage(2);
    } else {
      onFormSubmit(form_data_with_selection);
      updateCurrentPage(1);
    }
  };

  return (
    <>
      <HeaderSteper
        title=" Agenda el tipo de servicio que requieres para tus empleados"
        description=" Elige el enfoque de tu campaña. ¿Ofrecer citas médicas con especialistas o realizar análisis clínicos? 
Selecciona la opción que mejor se adapte a las necesidades de tus colaboradores y luego haz clic en siguiente. "
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
              id="medical_appointment"
              className="button-select-service"
              onClick={() => {
                setSelectedButton('Cita medica');
                setShowError(false);
                setAnalysisText('Analisis');
              }}
            >
              <Image src={iconHealth} alt="" className="icon-select" />
              {medical_appointment_text}
            </button>

            <button
              type="button"
              id="analysis"
              className="button-select-service"
              onClick={() => {
                setSelectedButton('Análisis');
                setShowError(false);
                setMedicalAppointmentText('Cita medica');
              }}
            >
              <Image src={iconHealth} alt="" className="icon-select" />
              {analysis_text}
            </button>
          </div>
          <div>
            <p>{showError ? 'Selecciona un tipo de servicio' : ''}</p>
          </div>
          <button className="button-primary" type="submit">
            Siguiente
          </button>
        </form>
      </div>
    </>
  );
};

export default Step2;
