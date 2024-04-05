'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';
import { employeeServices } from '@/services/employees/employees';
import { BranchDataType, branchesServices } from '@/services/company/branches';
import ModalIcon from '@/components/organisms/ModalIcon';
import IconSuccess from '@/icon/icon-success.svg';
import Alert from '@/components/atoms/Alert';

const SingleRegisterSchema = yup
  .object({
    rol: yup.string().required().not(['none']),
    firstName: yup.string().required(),
    middleName: yup.string().required(),
    lastName: yup.string().required(),
    gender: yup.string().required().not(['none']),
    birthday: yup.string().required(),
    branch: yup.string().required().not(['none']),
    phoneNumber: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

type SingleRegisterFormData = yup.InferType<typeof SingleRegisterSchema>;

const SingleRegister = () => {
  const { data: session } = useSession();

  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SingleRegisterFormData>({
    resolver: yupResolver(SingleRegisterSchema),
  });

  const [rol, setRol] = useState('');
  const [first_name, setFirstName] = useState('');
  const [middle_name, setMiddleName] = useState('');
  const [last_name, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [branch, setBranch] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [is_valid_form, setIsValidForm] = useState(false);

  const [branches, setBranches] = useState<BranchDataType[]>([]);

  const [created_modal_visible, setCreatedModalVisible] = React.useState(false);

  const handleFormSubmit = async (data: SingleRegisterFormData) => {
    try {
      const register_data = await employeeServices.singleRegister(
        {
          companyId: session?.company.id!,
          branchId: data.branch,
          rol: data.rol,
          firstName: data.firstName,
          middleName: data.middleName || '',
          lastName: data.lastName,
          birthday: data.birthday,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
          email: data.email,
        },
        session?.accessToken!,
      );

      if (register_data.created) {
        setValue('rol', '');
        setValue('firstName', '');
        setValue('middleName', '');
        setValue('lastName', '');
        setValue('branch', '');
        setValue('birthday', '');
        setValue('gender', '');
        setValue('phoneNumber', '');
        setValue('email', '');

        setCreatedModalVisible(true);
      } else {
        console.log(register_data.message);
      }
    } catch (error) {
      setError('root', {
        message: 'Ocurrió un error al registrar el usuario',
        type: 'error',
      });
    }
  };

  const getBranches = async () => {
    try {
      const branches_data = await branchesServices.getByCompany(
        session?.company?.id!,
        session?.accessToken!,
      );

      setBranches(branches_data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const func = async () => {
      try {
        await SingleRegisterSchema.validate({
          rol,
          firstName: first_name,
          middleName: middle_name,
          lastName: last_name,
          gender,
          birthday,
          branch,
          phoneNumber: phone_number,
          email,
        });
        setIsValidForm(true);
      } catch (e) {
        setIsValidForm(false);
      }
    };

    func();
  }, [
    rol,
    first_name,
    middle_name,
    last_name,
    gender,
    birthday,
    branch,
    phone_number,
    email,
  ]);

  useEffect(() => {
    if (session && session.accessToken) {
      getBranches();
    }
  }, [session]);

  return (
    <div className="table-container">
      <Alert
        type="error"
        message={errors['root']?.message}
        onHide={() => clearErrors('root')}
      />

      <p className="employees-create-title">
        Agregar empleados individualmente
      </p>
      <p className="employees-create-message">
        Captura los datos del empleado que deseas agregar.
      </p>
      <div className="employees-create-form-container">
        <form
          className="form-control"
          onSubmit={handleSubmit(handleFormSubmit)}
          autoComplete="off"
        >
          <div
            className={
              errors.rol === undefined
                ? 'input-control'
                : 'input-control input-error'
            }
          >
            <select
              id="rol"
              defaultValue="none"
              {...register('rol')}
              onChange={(e) => {
                setRol(e.target.value);
              }}
            >
              <option value="none" disabled>
                Rol de empleado*
              </option>
              <option value="company">Administrador</option>
              <option value="employee">Empleado</option>
            </select>
          </div>
          <div className="input-control">
            <input
              type="text"
              id="firstName"
              placeholder="Nombre (s)*"
              {...register('firstName')}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="input-control">
            <input
              type="text"
              id="middleName"
              placeholder="Apellido paterno*"
              {...register('middleName')}
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
            />
          </div>
          <div className="input-control">
            <input
              type="text"
              id="lastName"
              placeholder="Apellido materno*"
              {...register('lastName')}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <div className="input-control">
            <select
              id="gender"
              defaultValue="none"
              {...register('gender')}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option value="none" disabled>
                Selecciona género*
              </option>
              <option value="m">Masculino</option>
              <option value="f">Femenino</option>
            </select>
          </div>

          <div className="input-control">
            <input
              type="date"
              id="birthday"
              placeholder="Fecha de nacimiento"
              {...register('birthday')}
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
            />
          </div>

          <div className="input-control">
            <select
              id="branch"
              defaultValue="none"
              {...register('branch')}
              onChange={(e) => {
                setBranch(e.target.value);
              }}
            >
              <option value="none" disabled>
                Sucursal*
              </option>
              {branches.map((branch, index) => (
                <option key={index} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-control">
            <input
              type="text"
              id="phoneNumber"
              placeholder="Teléfono"
              {...register('phoneNumber')}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>

          <div className="input-control">
            <input
              type="text"
              id="email"
              placeholder="Correo electrónico"
              {...register('email')}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <button
            className="button-primary button-top-margin"
            type="submit"
            disabled={!is_valid_form}
          >
            Guardar
          </button>
        </form>
      </div>
      <ModalIcon
        visible={created_modal_visible}
        icon={IconSuccess}
        message="Empleado creado exitosamente"
        onPressAccept={() => setCreatedModalVisible(false)}
      />
    </div>
  );
};

export default SingleRegister;
