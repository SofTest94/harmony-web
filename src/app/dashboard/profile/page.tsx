'use client';

import React, { useRef, useState } from 'react';
import HeroLayout from '@/components/organisms/HeroLayout';
import LayoutHeader from '@/components/organisms/LayoutHeader';
import { GeneralData } from '@/components/pages/profile/GeneralData';
import { BillingData } from '@/components/pages/profile/BillingData';
import { PasswordData } from '@/components/pages/profile/PasswordData';
import ButtonCreate from '@/components/atoms/ButtonLink';
import ModalMessage from '@/components/organisms/ModalMessage';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Image from 'next/image';
import IconEditLogo from '@/icon/icon-edit-logo.svg';

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDebounceEffect } from './useDebounceEffect';
import { canvasPreview } from './canvasPreview';
import { companyServices } from '@/services/company/company';
import { useSession } from 'next-auth/react';

const CompanyLogoSchema = yup
  .object({
    file: yup
      .mixed()
      .test(
        'fileType',
        'El archivo seleccionado no tiene un formato valido',
        (file: any) => {
          if (file) {
            return (
              file[0].type === 'image/jpeg' ||
              file[0].type === 'image/jpg' ||
              file[0].type === 'image/png'
            );
          } else {
            return false;
          }
        },
      ),
  })
  .required();

type CompanyLogoFormData = yup.InferType<typeof CompanyLogoSchema>;

const Page = () => {
  const { update, data: session } = useSession();

  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompanyLogoFormData>({
    resolver: yupResolver(CompanyLogoSchema),
  });

  const [selected_file, setSelectedFile] = useState<any>();
  const [logo_modal_visible, setLogoModalVisible] = useState(false);

  const preview_canvas_ref = useRef<HTMLCanvasElement>(null);
  const img_ref = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<Crop>();
  const [completed_crop, setCompletedCrop] = useState<PixelCrop>();
  const [scale] = useState(1);
  const [rotate] = useState(0);
  const [aspect] = useState<number | undefined>(1 / 1);

  const handleFormSubmit = async (file: any) => {
    try {
      await companyServices.updateLogo(
        session?.company.id!,
        file,
        session?.accessToken!,
      );
      setValue('file', '');
      setLogoModalVisible(false);
      setCrop(undefined);
      setCompletedCrop(undefined);
      setSelectedFile(null);

      update({ company: { id: '', name: '', logo: '' } });
    } catch (error) {
      setError('root', {
        message: 'Ocurrió un error al subir foto',
        type: 'error',
      });
    }
  };

  const handleFileSelect = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setSelectedFile(reader.result?.toString() || ''),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completed_crop?.width &&
        completed_crop?.height &&
        img_ref.current &&
        preview_canvas_ref.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          img_ref.current,
          preview_canvas_ref.current,
          completed_crop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completed_crop, scale, rotate],
  );

  async function onDownloadCropClick() {
    const image = img_ref.current;
    const preview_canvas = preview_canvas_ref.current;
    if (!image || !preview_canvas || !completed_crop) {
      throw new Error('Crop canvas does not exist');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completed_crop.width * scaleX,
      completed_crop.height * scaleY,
    );

    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      preview_canvas,
      0,
      0,
      preview_canvas.width,
      preview_canvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );

    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    });

    handleFormSubmit(blob);
  }

  return (
    <HeroLayout>
      <LayoutHeader title="Perfil Compañía" />

      <div className="layout-body">
        <div className="table-container">
          <div className="profile-main">
            <div className="profile-company-logo">
              <Image
                src={session?.company.logo!}
                unoptimized
                alt="logo"
                width={130}
                height={130}
                style={{ borderRadius: 65 }}
              />
              <Image
                src={IconEditLogo}
                alt="edit-logo"
                style={{ position: 'relative', bottom: 39, left: 90 }}
                onClick={() => setLogoModalVisible(true)}
              />
            </div>

            <div className="profile-container">
              <GeneralData />
              <BillingData />
              <PasswordData />
            </div>
          </div>
        </div>
      </div>

      <ModalMessage
        visible={logo_modal_visible}
        title="Foto de perfil"
        message="Sube el archivo JPG o PNG con un máximo de 300 KB del logo de la empresa"
        onPressCancel={() => {
          setLogoModalVisible(false);
          setValue('file', '');
          setLogoModalVisible(false);
          setCrop(undefined);
          setCompletedCrop(undefined);
          setSelectedFile(null);
        }}
      >
        <form
          className="form-control"
          onSubmit={() => {}}
          autoComplete="off"
          style={{ marginBottom: 16 }}
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
              placeholder="Seleccionar archivo de empleados"
              {...register('file')}
              onChange={handleFileSelect}
            />
          </div>
        </form>
        {!!selected_file && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            minHeight={100}
            minWidth={100}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={img_ref}
              alt="Crop me"
              src={selected_file}
              style={{
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                maxHeight: 200,
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}

        {!!completed_crop && (
          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <p>Image recortada</p>
            <canvas
              ref={preview_canvas_ref}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: 150,
                height: 150,
              }}
            />
          </div>
        )}

        <button
          className="button-primary"
          onClick={onDownloadCropClick}
          disabled={!completed_crop}
          style={{ marginBottom: 16 }}
        >
          Guardar
        </button>
      </ModalMessage>
    </HeroLayout>
  );
};

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export default Page;
