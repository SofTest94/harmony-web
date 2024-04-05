'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';
import {
  CfdiTaxRegimeDataType,
  billingServices,
} from '@/services/company/billing';
import Image from 'next/image';
import IconEdit from '@/icon/icon-edit.svg';

const BillingSchema = yup
  .object({
    businessName: yup.string().required(),
    RFC: yup
      .string()
      .trim()
      .matches(/^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$/, 'El RFC no es valido')
      .required(),
    zipCode: yup
      .string()
      .min(5, 'Debe de tener mínimo 5 dígitos')
      .matches(/^([0-9]{5})*$/, 'El código postal no es valido'),
    CFDI: yup.string().required().not(['none']),
    taxRegime: yup.string().required().not(['none']),
  })
  .required();

type BillingFormData = yup.InferType<typeof BillingSchema>;

export const BillingData = () => {
  const { data: session } = useSession();

  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BillingFormData>({
    resolver: yupResolver(BillingSchema),
  });

  const [business_name, setBusinessName] = useState('');
  const [rfc, setRfc] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [cfdi, setCfid] = useState('');
  const [tax_regime, setTaxRegime] = useState('');

  const [is_valid_form, setIsValidForm] = useState(false);

  const [editable, setEditable] = useState(false);

  const [cfdis, setCfdis] = useState<CfdiTaxRegimeDataType['CFDI']>([]);
  const [tax_regimes, setTaxRegimes] = useState<
    CfdiTaxRegimeDataType['taxRegime']
  >([]);

  const handleFormSubmit = async (data: BillingFormData) => {
    try {
      await billingServices.update(
        session?.company.id!,
        {
          businessName: data.businessName,
          RFC: data.RFC,
          zipCode: data.zipCode || '',
          CFDI: data.CFDI,
          taxRegime: data.taxRegime,
        },
        session?.accessToken!,
      );

      setEditable(false);
    } catch (error) {
      setError('root', { message: 'Error global', type: 'error' });
    }
  };

  const getBillingData = async () => {
    try {
      const data = await billingServices.get(
        session?.company.id!,
        session?.accessToken!,
      );

      setValue('businessName', data.businessName);
      setValue('RFC', data.RFC);
      setValue('zipCode', data.zipCode);
      setValue('CFDI', data.CFDI);
      setValue('taxRegime', data.taxRegime);

      setBusinessName(data.businessName);
      setRfc(data.RFC);
      setZipCode(data.zipCode);
      setCfid(data.CFDI);
      setTaxRegime(data.taxRegime);
    } catch (error) {
      setError('root', { message: 'Error global', type: 'error' });
    }
  };

  const getCfdiTaxRegime = async () => {
    try {
      const data = await billingServices.getCfdiTaxRegime(
        session?.accessToken!,
      );

      setCfdis(data.CFDI);
      setTaxRegimes(data.taxRegime);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const func = async () => {
      try {
        await BillingSchema.validate({
          businessName: business_name,
          RFC: rfc,
          zipCode: zip_code,
          CFDI: cfdi,
          taxRegime: tax_regime,
        });
        setIsValidForm(true);
      } catch (e) {
        setIsValidForm(false);
      }
    };

    func();
  }, [business_name, rfc, zip_code, cfdi, tax_regime]);

  useEffect(() => {
    if (session && session.accessToken) {
      getBillingData();
      getCfdiTaxRegime();
    }
  }, [session]);

  return (
    <div className="profile-section">
      <div className="profile-section-title-container">
        <p className="profile-section-title">Datos facturación </p>
        <div onClick={() => setEditable(true)}>
          <Image src={IconEdit} className="profile-section-edit" alt="edit" />
        </div>
      </div>

      <form
        className="form-control"
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete="off"
      >
        <div className="input-control">
          <input
            type="text"
            id="businessName"
            placeholder="Nombre o razón social*"
            {...register('businessName')}
            disabled={!editable}
            onChange={(e) => {
              setBusinessName(e.target.value);
            }}
          />
        </div>
        <div className="input-control">
          <input
            type="text"
            id="RFC"
            placeholder="RFC*"
            {...register('RFC')}
            disabled={!editable}
            onChange={(e) => {
              setRfc(e.target.value);
            }}
          />
        </div>
        <div className="input-control">
          <input
            type="text"
            id="zipCode"
            placeholder="Código postal"
            {...register('zipCode')}
            disabled={!editable}
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
          />
        </div>

        <div className="input-control">
          <select
            id="CFDI"
            defaultValue="none"
            disabled={!editable}
            {...register('CFDI')}
            onChange={(e) => {
              setCfid(e.target.value);
            }}
          >
            <option value="none">Uso de CFDI*</option>
            {cfdis.map((temp, index) => {
              if (temp.value !== 0) {
                return (
                  <option key={index.toString()} value={temp.label}>
                    {temp.label}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </div>

        <div className="input-control">
          <select
            id="taxRegime"
            defaultValue="none"
            disabled={!editable}
            {...register('taxRegime')}
            onChange={(e) => {
              setTaxRegime(e.target.value);
            }}
          >
            <option value="none">Regimen fiscal*</option>
            {tax_regimes.map((temp, index) => {
              if (temp.value !== 0) {
                return (
                  <option key={index.toString()} value={temp.label}>
                    {temp.label}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </div>

        {editable && (
          <button
            className="button-primary button-top-margin"
            type="submit"
            disabled={!is_valid_form}
          >
            Guardar datos de facturación
          </button>
        )}
      </form>
    </div>
  );
};
