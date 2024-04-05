import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeaderSteper from '@/components/molecules/HeaderSteper';

import { campaignServices } from '@/services/campaign/campaign';
import {
  CampaignStep1Type,
  getListBranchesForCompanyType,
} from '@/app/types/campaign.types';
import { useSession } from 'next-auth/react';

const Step1CampaignSchema = yup.object({
  id_branch: yup.string(),
  name: yup.string().required('Nombre de la campaña es requerido'),
  branch: yup
    .array()
    .of(yup.string())
    .min(1, 'Selecciona al menos una sucursal.')
    .required(), // Cambiamos a array para manejar múltiples selecciones
  date_application: yup
    .string()
    .test(
      'is-valid-date',
      'La fecha debe ser al menos una semana después de hoy.',
      function (value: any) {
        // Verificamos si el valor es una cadena no vacía
        if (!value || value.trim() === '') {
          return false; // La cadena está vacía, por lo tanto, es inválida
        }
        // Convertimos la cadena a una fecha
        const date_value = new Date(value);
        // Obtenemos la fecha actual
        const current_date = new Date();
        // Calculamos una semana a partir de la fecha actual
        const one_week_from_now = new Date(
          current_date.getTime() + 7 * 24 * 60 * 60 * 1000,
        );
        // Verificamos si la fecha introducida es al menos una semana después de hoy
        return date_value >= one_week_from_now;
      },
    )
    .required('Introduce una fecha válida.'),

  object_campaign: yup.string().required('El objetivo es requerido'),
  notify: yup.boolean(),
  current_page: yup.number().default(2).required(),
});

type Step1CampaignFormData = yup.InferType<typeof Step1CampaignSchema>;

type Step1Props = {
  onFormSubmit: (data: CampaignStep1Type) => void;
};

const Step1: React.FC<Step1Props> = ({ onFormSubmit }) => {
  const { data: session } = useSession();
  const [branchesData, setBranchesData] =
    useState<getListBranchesForCompanyType>([]);
  const [showOptions, setShowOptions] = useState(false); // Estado para controlar la visibilidad de las opciones
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]); // Estado para almacenar las sucursales seleccionadas
  const [inputValue, setInputValue] = useState(''); // Estado para el valor del input del select
  const selectRef = useRef<HTMLDivElement>(null); // Ref para el contenedor del select

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Step1CampaignFormData>({
    resolver: yupResolver(Step1CampaignSchema),
  });

  useEffect(() => {
    if (session && session.accessToken) {
      const fetchBranchesData = async () => {
        try {
          const branchData: getListBranchesForCompanyType =
            await campaignServices.getListBranchesForCompany(
              session?.company.id!,
              session?.accessToken!,
            );
          setBranchesData(branchData);
        } catch (error) {
          console.error('Error fetching branch data:', error);
        }
      };

      fetchBranchesData();
    }
  }, [session]);

  const onSubmit = (data: CampaignStep1Type) => {
    // Obtenemos la cadena de sucursales del objeto de datos
    const branch_ids = data.branch.map((branch) => branch?.split(',')[0]);

    // Convertimos los IDs en una cadena separada por comas
    const branch_ids_string = branch_ids.join(',');

    data.id_branch = branch_ids_string;
    onFormSubmit(data);
  };

  const handleInputClick = () => {
    // Cambiamos el estado de la visibilidad al hacer clic en el input
    setShowOptions(!showOptions);
  };

  const handleBranchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const branch_id = e.target.id;
    const branch_name = e.target.value;
    if (e.target.checked) {
      setSelectedBranches([...selectedBranches, `${branch_id},${branch_name}`]);
    } else {
      setSelectedBranches(
        selectedBranches.filter(
          (branch) => branch !== `${branch_id},${branch_name}`,
        ),
      );
    }
  };

  useEffect(() => {
    // Asignamos las sucursales seleccionadas al campo 'branch' del formulario
    setValue('branch', selectedBranches);
  }, [selectedBranches, setValue]);

  // Generamos el texto para mostrar las sucursales seleccionadas en el input
  const selectedBranchesText =
    selectedBranches.length > 0
      ? selectedBranches.map((branch) => branch.split(',')[1]).join(', ')
      : 'Selecciona tu sucursal*';

  // Manejador de eventos para ocultar el select cuando se hace clic fuera de él
  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Manejador de eventos para guardar el valor del input del select al cambiar
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const getValidDefaultDate = () => {
    const current_date = new Date();
    // Inicializamos un contador para días hábiles
    let business_days_count = 0;
    // Checamos que la fecha sea 7 días hábiles después de la fecha actual
    while (business_days_count < 7) {
      // Añadimos un día a la fecha actual
      current_date.setDate(current_date.getDate() + 1);
      // Obtenemos el día de la semana (0 para domingo, 1 para lunes, ..., 6 para sábado)
      const day_of_week = current_date.getDay();
      // Verificamos si el día de la semana no es sábado (6) ni domingo (0)
      if (day_of_week !== 0 && day_of_week !== 6) {
        // Si no es sábado ni domingo, incrementamos el contador de días hábiles
        business_days_count++;
      }
    }
    // Devolvemos la fecha válida en formato YYYY-MM-DD
    return current_date.toISOString().split('T')[0];
  };

  return (
    <>
      <HeaderSteper
        title=" Agenda el tipo de servicio que requieres para tus colaboradores"
        description=" En este paso, elige el enfoque de tu campaña. ¿Ofrecer citas médicas con especialistas o realizar análisis clínicos? Selecciona la opción que mejor se adapte a las necesidades de tus colaboradores y luego haz clic en siguiente."
      />

      <div className="form-control form-center">
        <form
          className="form-control"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="input-control">
            <input
              type="text"
              id="name"
              placeholder="Nombre de la campaña*"
              {...register('name')}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="input-control" ref={selectRef}>
            <input
              type="text"
              id="branch"
              placeholder={selectedBranchesText}
              value={inputValue}
              onClick={handleInputClick}
              onChange={handleInputChange}
              readOnly // Evitamos que el usuario pueda editar el input manualmente
            />
            {showOptions && (
              <div className="select-multiple-container">
                {branchesData.map((branch) => (
                  <div className="select-multiple-item" key={branch._id}>
                    <input
                      type="checkbox"
                      id={branch._id}
                      value={branch.branchBTB_name}
                      checked={selectedBranches.includes(
                        `${branch._id},${branch.branchBTB_name}`,
                      )} // Marcamos el checkbox si la sucursal está seleccionada
                      onChange={handleBranchChange} // Controlamos el cambio en el checkbox
                    />
                    <label htmlFor={branch._id}>{branch.branchBTB_name}</label>
                  </div>
                ))}
              </div>
            )}
            {errors.branch && <p>{errors.branch.message}</p>}
          </div>
          <div className="input-control">
            <input
              type="date"
              id="date_application"
              placeholder="Fecha de aplicación*"
              defaultValue={getValidDefaultDate()}
              {...register('date_application')}
            />
            {errors.date_application && (
              <p>{errors.date_application.message}</p>
            )}
          </div>

          <div className="input-control">
            <input
              type="text"
              id="object_campaign"
              placeholder="Objetivo de la campaña*"
              {...register('object_campaign')}
            />
            {errors.object_campaign && <p>{errors.object_campaign.message}</p>}
          </div>

          <label className="label-control-checkbox" htmlFor="notify">
            <input type="checkbox" id="notify" {...register('notify')} />
            Notificar empleados
          </label>

          <button className="button-primary" type="submit">
            Siguiente
          </button>
        </form>
      </div>
    </>
  );
};

export default Step1;
