'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';
import { employeeServices } from '@/services/employees/employees';
import { BranchDataType, branchesServices } from '@/services/company/branches';
import Image from 'next/image';
import IconEdit from '@/icon/icon-edit.svg';
import { useRouter } from 'next/navigation';

const EditEmployeeSchema = yup
  .object({
    rol: yup.string().required(),
    firstName: yup.string().required(),
    middleName: yup.string(),
    lastName: yup.string().required(),
    branch: yup.string().required(),
    birthday: yup.string().required(),
    gender: yup.string().required(),
    phoneNumber: yup.string().required(),
    email: yup.string().required(),
    companyId: yup.string(), // jms
  })
  .required();

type EditEmployeeFormData = yup.InferType<typeof EditEmployeeSchema>;

interface Props {
  employeeId: string;
}

const EditEmployee = ({ employeeId }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditEmployeeFormData>({
    resolver: yupResolver(EditEmployeeSchema),
  });

  const [editable, setEditable] = useState(false);
  const [is_valid_data, setIsValidData] = useState(true);
  const [branches, setBranches] = useState<BranchDataType[]>([]);

  const handleFormSubmit = async (data: EditEmployeeFormData) => {
    try {
      await employeeServices.updateById(
        employeeId,
        {
          branchId: data.branch,
          rol: data.rol,
          firstName: data.firstName,
          middleName: data.middleName || '',
          lastName: data.lastName,
          birthday: data.birthday,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
          email: data.email,
          companyId: data.companyId!, // jms
        },
        session?.accessToken!,
      );
      setEditable(false);
      router.push('/dashboard/employees');
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployee = async () => {
    try {
      const employee_data = await employeeServices.getById(
        employeeId,
        session?.accessToken!,
      );

      console.log({ employee_data });

      setValue('rol', 'employee');
      setValue('firstName', employee_data.firstName);
      setValue('middleName', employee_data.middleName);
      setValue('lastName', employee_data.lastName);
      setValue('branch', employee_data.branchOfficeId);
      setValue('birthday', employee_data.birthday);
      setValue('gender', employee_data.gender);
      setValue('phoneNumber', employee_data.username);
      setValue('email', employee_data.email);
      setValue('companyId', session?.company.id!); // jms
    } catch (error) {
      console.log(error);
    }
  };

  const getBranches = async () => {
    try {
      const branches_data = await branchesServices.getByCompany(
        session?.company.id!,
        session?.accessToken!,
      );

      setBranches(branches_data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session && session.accessToken) {
      getEmployee();
      getBranches();
    }
  }, [session]);

  return (
    <>
      <div className="employees-details-title-container">
        <p className="employees-details-title">Datos de empleado</p>
        <div onClick={() => setEditable(true)}>
          <Image src={IconEdit} className="profile-section-edit" alt="edit" />
        </div>
      </div>
      <div className="employees-edit-form-container">
        <form
          className="form-control"
          onSubmit={handleSubmit(handleFormSubmit)}
          autoComplete="off"
        >
          <div className="input-control">
            <select id="rol" disabled={!editable} {...register('rol')}>
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
              disabled={!editable}
            />
          </div>
          <div className="input-control">
            <input
              type="text"
              id="middleName"
              placeholder="Apellido paterno*"
              {...register('middleName')}
              disabled={!editable}
            />
          </div>
          <div className="input-control">
            <input
              type="text"
              id="lastName"
              placeholder="Apellido materno*"
              {...register('lastName')}
              disabled={!editable}
            />
          </div>

          <div className="input-control">
            <select id="branch" disabled={!editable} {...register('branch')}>
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
              type="date"
              id="birthday"
              placeholder="Fecha de nacimiento"
              {...register('birthday')}
              disabled={!editable}
            />
          </div>

          <div className="input-control">
            <select id="gender" disabled={!editable} {...register('gender')}>
              <option value="none" disabled>
                Selecciona género*
              </option>
              <option value="m">Masculino</option>
              <option value="f">Femenino</option>
            </select>
          </div>

          <div className="input-control">
            <input
              type="text"
              id="phoneNumber"
              placeholder="Teléfono"
              {...register('phoneNumber')}
              disabled={!editable}
            />
          </div>

          <div className="input-control">
            <input
              type="text"
              id="email"
              placeholder="Correo electrónico"
              {...register('email')}
              disabled={!editable}
            />
          </div>
          {editable && (
            <button
              className="button-primary button-top-margin"
              type="submit"
              disabled={!is_valid_data}
            >
              Guardar
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
