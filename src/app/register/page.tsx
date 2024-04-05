'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { authServices } from '@/services/auth/auth';
import { useState } from 'react';

import ImageLogo from '@/image/imgs/logos.png';
import Alert from '@/components/atoms/Alert';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Correo electrónico no es valido')
      .required('Correo electrónico es requerido'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function Home() {
  const {
    register,
    setError,
    clearErrors,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data: FormData) => {
    setValue('email', '');
  };

  return (
    <div className="login-main">
      <Alert
        type="error"
        message={errors['root']?.message}
        onHide={() => clearErrors('root')}
      />

      <div className="login-container">
        <div className="login-header">
          <Image src={ImageLogo} alt="logo" className="login-logo" />
          <p className="login-welcome">Unirme a Mediclar</p>
          <p className="login-message">
            Ingresa un correo electrónico para contactarte
          </p>
        </div>
        <form
          className="form-control"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div
            className={
              errors.email === undefined
                ? 'input-control'
                : 'input-control input-error'
            }
          >
            <input
              type="email"
              id="username"
              placeholder="Correo electrónico"
              {...register('email')}
            />
          </div>
          <button className="button-primary" type="submit">
            Enviar
          </button>
        </form>

        <Link href="/">
          <div className="login-footer">
            ¿Ya tienes una cuenta? <span>Da clic aquí para iniciar sesión</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
