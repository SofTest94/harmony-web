import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';
import { branchesServices } from '@/services/branches/branches';
import ModalIcon from '@/components/organisms/ModalIcon';
import IconSuccess from '@/icon/icon-success.svg';
import { useRouter } from 'next/navigation';
import { States } from '../../../utils/globalData';

const SingleRegisterSchema = yup
  .object({
    branchBTB_name: yup.string().required('Nombre de sucursal es requerido'),
    street: yup.string().required('Calle es requerida'),
    interior_number: yup.string().required('Número interior es requerido'),
    outdoor_number: yup.string(),
    suburb: yup.string().required('Colonia es requerida'),
    state: yup
      .string()
      .test(
        'is-selected',
        'Selecciona un Estado*',
        (value) => value !== 'Seleccione un Estado...',
      )
      .required('Estado es requerido'),
    reference: yup.string(),
    telephone: yup.string().required('Teléfono es requerido'),
  })
  .required();

type SingleRegisterFormData = yup.InferType<typeof SingleRegisterSchema>;

const SingleRegister = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SingleRegisterFormData>({
    resolver: yupResolver(SingleRegisterSchema),
  });

  const [createdModalVisible, setCreatedModalVisible] = useState(false);

  const handleFormSubmit = async (data: SingleRegisterFormData) => {
    try {
      const register_data = await branchesServices.createBranch(
        {
          id_company: session?.company.id!,
          ...data,
          outdoor_number: data.outdoor_number || 'N/A',
        },
        session?.accessToken!,
      );

      if (register_data.create) {
        // Clear form fields on successful submission
        Object.keys(data).forEach((key) =>
          setValue(key as keyof SingleRegisterFormData, ''),
        );
        setCreatedModalVisible(true);
      } else {
        console.log(register_data.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="table-container">
      <p className="employees-create-title">Agregar sucursal individualmente</p>
      <p className="employees-create-message">
        Captura los datos de la sucursal que deseas agregar.
      </p>
      <div className="employees-create-form-container">
        <form
          className="form-control"
          onSubmit={handleSubmit(handleFormSubmit)}
          autoComplete="off"
        >
          <div className="input-control">
            <input
              type="text"
              id="branchBTB_name"
              placeholder="Nombre de sucursal*"
              {...register('branchBTB_name')}
            />
            {errors.branchBTB_name && <p>{errors.branchBTB_name.message}</p>}
          </div>
          <div className="input-control">
            <input
              type="text"
              id="street"
              placeholder="Calle*"
              {...register('street')}
            />
            {errors.street && <p>{errors.street.message}</p>}
          </div>
          <div className="input-control">
            <input
              type="text"
              id="interior_number"
              placeholder="Número interior*"
              {...register('interior_number')}
            />
            {errors.interior_number && <p>{errors.interior_number.message}</p>}
          </div>
          <div className="input-control">
            <input
              type="text"
              id="outdoor_number"
              placeholder="Número exterior"
              {...register('outdoor_number')}
            />
            {errors.outdoor_number && <p>{errors.outdoor_number.message}</p>}
          </div>
          <div className="input-control">
            <input
              type="text"
              id="suburb"
              placeholder="Colonia*"
              {...register('suburb')}
            />
            {errors.suburb && <p>{errors.suburb.message}</p>}
          </div>
          <div className="input-control">
            <select id="state" {...register('state')}>
              <option value="" disabled>
                Selecciona un Estado*
              </option>
              {States.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
            {errors.state && <p>{errors.state.message}</p>}
          </div>
          <div className="input-control">
            <input
              type="text"
              id="reference"
              placeholder="Referencia"
              {...register('reference')}
            />
            {errors.reference && <p>{errors.reference.message}</p>}
          </div>
          <div className="input-control">
            <input
              type="text"
              id="telephone"
              placeholder="Teléfono*"
              {...register('telephone')}
            />
            {errors.telephone && <p>{errors.telephone.message}</p>}
          </div>

          <button className="button-primary" type="submit">
            Guardar
          </button>
        </form>
      </div>
      <ModalIcon
        visible={createdModalVisible}
        icon={IconSuccess}
        message="Sucursal creada exitosamente."
        onPressAccept={() => {
          setCreatedModalVisible(false);
          router.push('/dashboard/branches');
        }}
      />
    </div>
  );
};

export default SingleRegister;
