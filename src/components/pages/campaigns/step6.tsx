import React from 'react';
import HeaderSteper from '@/components/molecules/HeaderSteper';
import { useForm } from 'react-hook-form';
import {
  CampaignShowStep6Type,
  createCampaignType,
} from '@/app/types/campaign.types';

type Step6Props = {
  showData: CampaignShowStep6Type;
  onSubmit: () => void;
};

const Step6: React.FC<Step6Props> = ({ showData, onSubmit }) => {
  const { handleSubmit } = useForm<createCampaignType>();

  const handleFormSubmit = () => {
    onSubmit();
  };

  return (
    <>
      <HeaderSteper
        title="Corrobora tus datos"
        description="Estás a punto de finalizar la configuración de tu campaña. Verifica cuidadosamente todos los detalles si todo está correcto, haz clic en Crear Campaña. ¿Necesitas hacer algún ajuste? Utiliza el botón de Editar para realizar cambios."
      />
      <div className="form-center-step6">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <HeaderSteper title="Resumen de campaña" description="" />
          <div>
            <div style={{ display: 'flex' }}>
              <h2 style={{ marginRight: 10 }}>Nombre de la campaña:</h2>
              <p>{showData.campaign_name}</p>
            </div>

            <div style={{ display: 'flex' }}>
              <h2 style={{ marginRight: 10 }}>Sucursal de aplicación:</h2>
              <p>{showData.application_branch}</p>
            </div>

            <div style={{ display: 'flex' }}>
              <h2 style={{ marginRight: 10 }}>Fecha de aplicación:</h2>
              <p>{showData.application_date}</p>
            </div>

            <div style={{ display: 'flex' }}>
              <h2 style={{ marginRight: 10 }}>Objetivo de la campaña:</h2>
              <p>{showData.campaign_objective}</p>
            </div>

            <div style={{ display: 'flex' }}>
              <h2 style={{ marginRight: 10 }}>Se notificará a empleados</h2>
              <p>{showData.notification}</p>
            </div>

            <br></br>
            <div style={{ display: 'flex' }}>
              <h2 style={{ marginRight: 10 }}>Servicio a aplicar: </h2>
              <p>{showData.service_to_apply}</p>
            </div>

            <br></br>
            <div style={{ display: 'flex' }}>
              <h2 style={{ marginRight: 10 }}>Precio por px:</h2>
              <p>{showData.price_per_px}</p>
            </div>

            <div style={{ display: 'flex' }}>
              <h2 style={{ marginRight: 10 }}>Total de px:</h2>
              <p>{showData.total_px}</p>
            </div>
            <br></br>
            <div style={{ display: 'flex' }}>
              <h2 style={{ marginRight: 10 }}>Total a pagar: </h2>
              <p>{showData.total_to_pay}</p>
            </div>
          </div>

          <div className="form-control form-center">
            <button className="button-primary" type="submit">
              Crear campaña
            </button>
            <button
              className="button-secondary"
              type="button"
              onClick={() => {
                console.log('editar campaña!!');
              }}
            >
              Editar campaña
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Step6;
