'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PasswordValidator from 'password-validator';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { authServices } from '@/services/auth/auth';
import { useEffect, useState } from 'react';

import IconCheck from '@/icon/icon-check.svg';
import IconUncheck from '@/icon/icon-uncheck.svg';

import ImageLogo from '@/image/imgs/logos.png';
import Alert from '@/components/atoms/Alert';

const schema = yup
  .object({
    password: yup.string().required('Contraseña es requerida'),
    passwordConfirm: yup
      .string()
      .required('Confirmación de contraseña es requerida')
      .oneOf([yup.ref('password'), ''], 'Las Contraseñan deben de ser igual'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function Home() {
  const params = useSearchParams();
  const router = useRouter();

  const [passwordChanged, setPasswordChanged] = useState(false);

  const schema_password = new PasswordValidator();
  schema_password
    .has()
    .digits()
    .has()
    .lowercase()
    .has()
    .uppercase()
    .is()
    .min(8);

  const [is_valid_form, setIsValidForm] = useState(false);

  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const [pwd_is_min, setPwdIsMin] = useState(false);
  const [pwd_has_uppercase, setPwdHasUppercase] = useState(false);
  const [pwd_has_lowercase, setPwdHasLowercase] = useState(false);
  const [pwd_has_digit, setPwdHasDigit] = useState(false);

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
    try {
      const token = params.get('token');
      const id = params.get('id');
      if (token !== null && id !== null) {
        await authServices.resetPassword({
          password: data.password,
          token,
          user: id,
        });

        setPasswordChanged(true);
        setValue('password', '');
        setValue('passwordConfirm', '');

        router.replace('/');
      }
    } catch (error) {
      setError('root', {
        message: 'Ocurrió un error al restablecer tu contraseña',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    const validationResult = schema_password.validate(password, {
      details: true,
    }) as any[];
    const need_lowercase = validationResult
      .map((temp) => temp.validation)
      .includes('lowercase');
    const need_uppercase = validationResult
      .map((temp) => temp.validation)
      .includes('uppercase');
    const need_digit = validationResult
      .map((temp) => temp.validation)
      .includes('digits');
    const need_min = validationResult
      .map((temp) => temp.validation)
      .includes('min');

    setPwdIsMin(!need_min);
    setPwdHasLowercase(!need_lowercase);
    setPwdHasUppercase(!need_uppercase);
    setPwdHasDigit(!need_digit);

    setIsValidForm(
      !need_min &&
        !need_lowercase &&
        !need_uppercase &&
        !need_digit &&
        password === confirm_password,
    );
  }, [password, confirm_password]);

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
          <p className="login-welcome ">Crea una nueva contraseña</p>
        </div>
        <form
          className="form-control"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div
            className={
              errors.password === undefined
                ? 'input-control'
                : 'input-control input-error'
            }
          >
            <input
              type="password"
              id="password"
              placeholder="Nueva contraseña"
              {...register('password')}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div
            className={
              errors.passwordConfirm === undefined
                ? 'input-control'
                : 'input-control input-error'
            }
          >
            <input
              type="password"
              id="passwordConfirm"
              placeholder="Confirma nueva contraseña"
              {...register('passwordConfirm')}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="button-primary"
            type="submit"
            disabled={!is_valid_form}
          >
            Crear nueva contraseña
          </button>
        </form>

        <div className="login-success">
          {passwordChanged && <p>Contraseña cambiada exitosamente.</p>}
        </div>

        <div className="login-footer">
          Crea una contraseña segura siguiendo los siguientes parametros
          <div className="login-password-requirement">
            <Image
              src={pwd_is_min ? IconCheck : IconUncheck}
              alt="icon"
              className="icon-check"
            />
            <p>Al menos 8 caracteres alfanuméricos</p>
          </div>
          <div className="login-password-requirement">
            <Image
              src={pwd_has_lowercase ? IconCheck : IconUncheck}
              alt="icon"
              className="icon-check"
            />
            <p>Al menos un caracter minúscula</p>
          </div>
          <div className="login-password-requirement">
            <Image
              src={pwd_has_uppercase ? IconCheck : IconUncheck}
              alt="icon"
              className="icon-check"
            />
            <p>Al menos un caracter mayúscula</p>
          </div>
          <div className="login-password-requirement">
            <Image
              src={pwd_has_digit ? IconCheck : IconUncheck}
              alt="icon"
              className="icon-check"
            />
            <p>Al menos un caracter numérico (0-9)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
