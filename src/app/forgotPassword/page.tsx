'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { authServices } from '@/services/auth/auth';
import { useEffect, useState } from 'react';

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

  const [emailSend, setEmailSend] = useState(false);

  const [email, setEmail] = useState('');
  const [is_valid_form, setIsValidForm] = useState(false);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await authServices.requestResetPassword(data.email);
      setEmailSend(true);
      setValue('email', '');
    } catch (error: any) {
      setError('email', {
        message: 'Ocurrió un error al enviar link para restablecer contraseña',
      });
    }
  };

  useEffect(() => {
    const func = async () => {
      try {
        const res = await schema.validate({
          email,
        });
        setIsValidForm(true);
      } catch (e) {
        setIsValidForm(false);
      }
    };

    func();
  }, [email]);

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
          <p className="login-welcome">¿Olvidaste tu contraseña?</p>
          <p className="login-message">
            Ingresa el correo electrónico con el que te registraste, te
            enviaremos un link para que restablezcas tu contraseña.
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <button
            className="button-primary"
            type="submit"
            disabled={!is_valid_form}
          >
            Enviar correo
          </button>
        </form>

        <div className="login-success">
          {emailSend && <p>Email enviado exitosamente.</p>}
        </div>

        {/* <Link href="/register">
          <div className="login-footer">
            ¿Aún no tienes una cuenta?{' '}
            <span>Da clic aquí y únete a Mediclar</span>
          </div>
          </Link> */}
      </div>
    </div>
  );
}
