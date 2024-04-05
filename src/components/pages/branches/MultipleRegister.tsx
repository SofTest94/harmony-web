'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import ModalIcon from '@/components/organisms/ModalIcon';
import IconSuccess from '@/icon/icon-success.svg';
import { branchesServices } from '@/services/branches/branches';
import { useRouter } from 'next/navigation';

const MultipleRegisterSchema = yup
  .object({
    file: yup
      .mixed()
      .test(
        'fileType',
        'El archivo seleccionado no tiene un formato valido',
        (file: any) => {
          if (file) {
            return file[0].type === 'text/csv';
          } else {
            return false;
          }
        },
      ),
  })
  .required();

type MultipleRegisterFormData = yup.InferType<typeof MultipleRegisterSchema>;

const MultipleRegister = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MultipleRegisterFormData>({
    resolver: yupResolver(MultipleRegisterSchema),
  });

  const [selected_file, setSelectedFile] = useState(null);
  const [is_valid_data, setIsValidData] = useState(false);
  const [created_modal_visible, setCreatedModalVisible] = React.useState(false);

  const handleFormSubmit = async (data: MultipleRegisterFormData) => {
    try {
      const add_branches = await branchesServices.multipleRegister(
        selected_file,
        session?.company.id!,
        session?.accessToken!,
      );
      setValue('file', '');
      if (add_branches) {
        setCreatedModalVisible(add_branches[0].create);
      }
    } catch (error) {
      setError('root', {
        message: 'Ocurrió un error al subir archivo o registrar sucursales',
        type: 'error',
      });
    }
  };

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsValidData(event.target.files[0] !== undefined);
  };

  return (
    <div className="table-container">
      <p className="employees-create-title">
        Agregar sucursales de manera masiva
      </p>
      <p className="employees-create-message">
        Sube el archivo CCV o XSL de tus sucursales para darlos de alta de
        manera masiva, puedes descargar nuestro{' '}
        <Link
          className="download-template"
          href={
            process.env.API_URL_BASE +
            '/branchesbtbs/template/' +
            session?.company?.id
          }
          target="_blank"
        >
          archivo template aquí
        </Link>{' '}
        para llenarlo y luego subirlo
      </p>
      <div className="employees-create-form-container">
        <form
          className="form-control"
          onSubmit={handleSubmit(handleFormSubmit)}
          autoComplete="off"
        >
          <div
            className={
              errors.file === undefined
                ? 'input-control'
                : 'input-control input-error'
            }
          >
            <input
              type="file"
              id="file"
              placeholder="Seleccionar archivo de sucursales"
              {...register('file')}
              onChange={handleFileSelect}
            />
          </div>

          <button
            className="button-primary"
            type="submit"
            disabled={!is_valid_data}
          >
            Guardar
          </button>
        </form>
      </div>
      <ModalIcon
        visible={created_modal_visible}
        icon={IconSuccess}
        message="Sucursales creadas exitosamente."
        onPressAccept={() => {
          setCreatedModalVisible(false);
          router.push('/dashboard/branches');
        }}
      />
    </div>
  );
};

export default MultipleRegister;
