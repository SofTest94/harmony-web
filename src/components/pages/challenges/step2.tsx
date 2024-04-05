import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeaderSteper from '@/components/molecules/HeaderSteper';

// Define tu esquema de validación de yup aquí
const Step2Schema = yup.object({
  startDate: yup.string().required('La fecha de inicio es requerida'),
  description: yup.string().required('La descripción del reto es requerida'),
  prize: yup.string(),
  current_page: yup.number().default(2).required(),
});

type Step2FormData = yup.InferType<typeof Step2Schema>;

type Step2Props = {
  onFormSubmit: (data: Step2FormData) => void;
  updateCurrentPage: () => void;
};

const Step2: React.FC<Step2Props> = ({ onFormSubmit, updateCurrentPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: yupResolver(Step2Schema),
  });

  const onSubmit = (data: Step2FormData) => {
    onFormSubmit(data);
    updateCurrentPage();
  };

  return (
    <>
      <HeaderSteper
        title="Configura los detalles del reto"
        description="Personaliza tu reto de salud en segundos. Establece la fecha de inicio, crea una descripción motivadora y, si lo deseas, ofrece un premio opcional para impulsar la participación."
      />

      <div className="form-control form-center">
        <form
          className="form-control"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="input-control">
            <input
              type="date"
              placeholder="Fecha de inicio"
              {...register('startDate')}
            />
            {errors.startDate && <p>{errors.startDate.message}</p>}
          </div>
          <div className="input-control">
            <input
              type="text"
              placeholder="Descripción del reto"
              {...register('description')}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div className="input-control">
            <input
              type="text"
              placeholder="Premio (opcional)"
              {...register('prize')}
            />
            {errors.prize && <p>{errors.prize.message}</p>}
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
