'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { employeeServices } from '@/services/employees/employees';
import ModalIcon from '@/components/organisms/ModalIcon';
import IconSuccess from '@/icon/icon-success.svg';
import Loading from '@/components/atoms/Loading';
import { FileUploader } from 'react-drag-drop-files';
import Alert from '@/components/atoms/Alert';

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
  const { data: session } = useSession();

  const {
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<MultipleRegisterFormData>({
    resolver: yupResolver(MultipleRegisterSchema),
  });

  const [selected_file, setSelectedFile] = useState<any>();
  const [is_valid_data, setIsValidData] = useState(false);
  const [created_modal_visible, setCreatedModalVisible] = React.useState(false);

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async () => {
    try {
      clearErrors('root');
      setLoading(true);
      await employeeServices.multipleRegister(
        selected_file,
        session?.company.id!,
        session?.accessToken!,
      );
      setLoading(false);
      setCreatedModalVisible(true);
      setValue('file', '');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError('root', {
        message:
          'Ocurrió un error al subir archivo o registrar empleados, revisa que los datos sean correctos',
        type: 'error',
      });
    }
  };

  const handleFileSelect = (event: any) => {
    setSelectedFile(event);
    setIsValidData(event !== undefined);
    clearErrors('root');
  };

  const fileTypes = ['CSV'];

  return (
    <div className="table-container">
      <Alert
        type="error"
        message={errors['root']?.message}
        onHide={() => clearErrors('root')}
      />

      <p className="employees-create-title">
        Agregar empleados de manera masiva
      </p>
      <p className="employees-create-message">
        Sube el archivo CSV de tus empleados para darlos de alta de manera
        masiva, puedes descargar nuestro{' '}
        <Link
          className="download-template"
          href={
            process.env.API_URL_BASE +
            '/btb-employees/template/' +
            session?.company?.id
          }
          target="_blank"
        >
          archivo template aquí
        </Link>{' '}
        para llenarlo y luego subirlo
      </p>
      <div className="employees-create-form-container">
        <div className="form-control">
          <FileUploader
            handleChange={handleFileSelect}
            name="file"
            types={fileTypes}
            classes="drop-area"
          >
            <div className="drop-area-content">
              {selected_file
                ? selected_file?.name
                : 'Seleccionar/arrastrar archivo de empleados'}
            </div>
          </FileUploader>
          <button
            className="button-primary button-top-margin"
            onClick={handleFormSubmit}
            disabled={!is_valid_data || loading}
          >
            Guardar
          </button>

          {loading && <Loading />}
        </div>
      </div>
      <ModalIcon
        visible={created_modal_visible}
        icon={IconSuccess}
        message="Empleados creados exitosamente"
        onPressAccept={() => setCreatedModalVisible(false)}
      />
    </div>
  );
};

export default MultipleRegister;
