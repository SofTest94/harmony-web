'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';
import { authServices } from '@/services/auth/auth';

const PasswordSchema = yup
  .object({
    password: yup.string().required('Contraseña es requerida'),
    newPassword: yup.string().required('Contraseña es requerida'),
    newPasswordConfirm: yup
      .string()
      .required('Confirmación de contraseña es requerida')
      .oneOf(
        [yup.ref('newPassword'), ''],
        'Las Contraseñan deben de ser igual',
      ),
  })
  .required();

type PasswordFormData = yup.InferType<typeof PasswordSchema>;

export const PasswordData = () => {
  const { data: session } = useSession();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(PasswordSchema),
  });

  const [password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [new_password_confirm, setNewPasswordConfirm] = useState('');

  const [is_valid_form, setIsValidForm] = useState(false);

  const handleFormSubmit = async (data: PasswordFormData) => {
    try {
      const session_data = await authServices.updatePassword(
        {
          password: data.password,
          newPassword: data.newPassword,
        },
        session?.accessToken!,
      );

      console.log({ session_data });
    } catch (error) {
      console.log({ error });

      setError('root', {
        message: 'Error',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    const func = async () => {
      try {
        await PasswordSchema.validate({
          password,
          newPassword: new_password,
          newPasswordConfirm: new_password_confirm,
        });
        setIsValidForm(true);
      } catch (e) {
        setIsValidForm(false);
      }
    };

    func();
  }, [password, new_password, new_password_confirm]);

  return (
    <div className="profile-section">
      <div className="profile-section-title-container">
        <p className="profile-section-title">Contraseña</p>
      </div>
      <form
        className="form-control"
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete="off"
      >
        <div className="input-control">
          <input
            type="text"
            id="password"
            placeholder="Contraseña actual*"
            {...register('password')}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="input-control">
          <input
            type="text"
            id="newPassword"
            placeholder="Nueva contraseña*"
            {...register('newPassword')}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <div className="input-control">
          <input
            type="text"
            id="newPasswordConfirm"
            placeholder="Confirmar nueva contraseña*"
            {...register('newPasswordConfirm')}
            onChange={(e) => {
              setNewPasswordConfirm(e.target.value);
            }}
          />
        </div>
        <button
          className="button-primary button-top-margin"
          type="submit"
          disabled={!is_valid_form}
        >
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
};
