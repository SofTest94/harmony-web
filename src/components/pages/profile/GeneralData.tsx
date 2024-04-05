'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { companyServices } from '@/services/company/company';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import IconEdit from '@/icon/icon-edit.svg';

const GeneralSchema = yup
  .object({
    name: yup.string().required('El nombre de la compañía es requerido'),
    contact: yup.string().required('El nombre del contacto es requerido'),
    emailContact: yup
      .string()
      .required('El correo electrónico de contacto es requerido'),
    phoneNumberContact: yup
      .string()
      .required('El teléfono de contacto es requerido'),
  })
  .required();

type GeneralFormData = yup.InferType<typeof GeneralSchema>;

export const GeneralData = () => {
  const { data: session } = useSession();

  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GeneralFormData>({
    resolver: yupResolver(GeneralSchema),
  });

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email_contact, setEmailContact] = useState('');
  const [phone_number_contact, setPhoneNumberContact] = useState('');

  const [is_valid_form, setIsValidForm] = useState(false);

  const [editable, setEditable] = useState(false);

  const handleFormSubmit = async (data: GeneralFormData) => {
    try {
      await companyServices.update(
        session?.company.id!,
        {
          companyName: data.name,
          contact: data.contact,
          emailContact: data.emailContact,
          phoneNumberContact: data.phoneNumberContact,
        },
        session?.accessToken!,
      );

      setEditable(false);
    } catch (error) {
      setError('root', { message: 'Error global', type: 'error' });
    }
  };

  const getCompanyData = async () => {
    try {
      const data = await companyServices.get(
        session?.company.id!,
        session?.accessToken!,
      );

      setValue('name', data.name);
      setValue('contact', data.contact);
      setValue('emailContact', data.emailContact);
      setValue('phoneNumberContact', data.phoneNumberContact);

      setName(data.name);
      setContact(data.contact);
      setEmailContact(data.emailContact);
      setPhoneNumberContact(data.phoneNumberContact);
    } catch (error) {
      setError('root', { message: 'Error global', type: 'error' });
    }
  };

  useEffect(() => {
    const func = async () => {
      try {
        await GeneralSchema.validate({
          name,
          contact,
          emailContact: email_contact,
          phoneNumberContact: phone_number_contact,
        });
        setIsValidForm(true);
      } catch (e) {
        setIsValidForm(false);
      }
    };

    func();
  }, [name, contact, email_contact, phone_number_contact]);

  useEffect(() => {
    if (session && session.accessToken) {
      getCompanyData();
    }
  }, [session]);

  return (
    <div className="profile-section">
      <div className="profile-section-title-container">
        <p className="profile-section-title">Datos generales </p>
        <div onClick={() => setEditable(true)}>
          <Image src={IconEdit} className="profile-section-edit" alt="edit" />
        </div>
      </div>
      <form className="form-control" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="input-control">
          <input
            type="text"
            id="company"
            placeholder="Compañía*"
            {...register('name')}
            disabled={!editable}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-control">
          <input
            type="text"
            id="contact"
            placeholder="Contacto principal*"
            {...register('contact')}
            disabled={!editable}
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />
        </div>
        <div className="input-control">
          <input
            type="text"
            id="contactPhone"
            placeholder="Teléfono contacto*"
            {...register('phoneNumberContact')}
            disabled={!editable}
            onChange={(e) => {
              setPhoneNumberContact(e.target.value);
            }}
          />
        </div>
        <div className="input-control">
          <input
            type="text"
            id="contactEmail"
            placeholder="Correo electrónico contacto*"
            {...register('emailContact')}
            disabled={!editable}
            onChange={(e) => {
              setEmailContact(e.target.value);
            }}
          />
        </div>
        {editable && (
          <button
            className="button-primary button-top-margin"
            type="submit"
            disabled={!is_valid_form}
          >
            Guardar datos generales
          </button>
        )}
      </form>
    </div>
  );
};
