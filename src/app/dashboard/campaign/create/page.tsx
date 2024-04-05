'use client';
import React, { useEffect, useState } from 'react';
import HeroLayout from '@/components/organisms/HeroLayout';
import LayoutHeader from '@/components/organisms/LayoutHeader';
import Step1 from '@/components/pages/campaigns/step1';
import Step2 from '@/components/pages/campaigns/step2';
import Step3 from '@/components/pages/campaigns/step3';
import Step4 from '@/components/pages/campaigns/step4';
import Step5 from '@/components/pages/campaigns/step5';
import Step6 from '@/components/pages/campaigns/step6';
import { useRouter } from 'next/navigation';
import {
  CampaignShowStep6Type,
  CampaignStep1Type,
  CampaignStep2Type,
  CampaignStep3Type,
  CampaignStep4Type,
  createCampaignType,
  itemsListUsers,
} from '@/app/types/campaign.types';

import { campaignServices } from '@/services/campaign/campaign';
import { useSession } from 'next-auth/react';
import { string } from 'yup';

const Page: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [step1Data, setStep1Data] = useState<CampaignStep1Type>();
  const [step2Data, setStep2Data] = useState<CampaignStep2Type>();
  const [step3Data, setStep3Data] = useState<CampaignStep3Type>();
  const [step4Data, setStep4Data] = useState<CampaignStep4Type>();
  const [step5Data, setStep5Data] = useState<itemsListUsers>([]);

  const [showDataStep6, setShowDataStep6] = useState<CampaignShowStep6Type>();

  const updateCurrentPage = (cont = 1) => {
    setCurrentPage(currentPage + cont);
  };

  const handleStep1FormSubmit = (data: CampaignStep1Type) => {
    setStep1Data(data);
    updateCurrentPage();
  };

  const handleStep2FormSubmit = (data: CampaignStep2Type) => {
    setStep2Data(data);
    updateCurrentPage();
  };

  const handleStep3FormSubmit = (data: CampaignStep3Type) => {
    setStep3Data(data);
    updateCurrentPage();
  };

  const handleStep4FormSubmit = (data: CampaignStep4Type) => {
    setStep4Data(data);
    updateCurrentPage();
  };

  const handleStep5FormSubmit = (data: itemsListUsers) => {
    // en este vamos a transformar los datos
    setStep5Data(data);
    const aux_branch_names = [...new Set(data.map((item) => item.branchName))];
    const branch_names = aux_branch_names
      .join(', ')
      .replace(/, (?!.*, )/, ' y ');

    if (step1Data) {
      const list_checkups =
        step4Data?.list_checkups?.map((item) => item.name) || [];
      const list_analysis =
        step4Data?.list_analysis?.map((item) => item.name) || [];

      const service_to_apply = list_checkups.concat(list_analysis).join(', ');

      const showDataSet: CampaignShowStep6Type = {
        campaign_name: step1Data.name,
        application_branch: branch_names,
        application_date: step1Data.date_application,
        campaign_objective: step1Data.object_campaign,
        notification: step1Data.notify ? 'Si' : 'No',
        service_to_apply:
          step4Data !== undefined
            ? service_to_apply
            : step3Data && 'Consulta ' + step3Data.type_specialty,
        price_per_px:
          step4Data !== undefined
            ? (step4Data.total / data.length).toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN',
              })
            : '$650',
        total_px: data.length,
        total_to_pay:
          step4Data !== undefined
            ? step4Data.total.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN',
              })
            : (data.length * 650).toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }),
      };

      setShowDataStep6(showDataSet);
    }

    updateCurrentPage();
  };
  const handleStep6FormSubmit = async () => {
    if (showDataStep6 && step2Data && step1Data) {
      const list_checkups =
        step4Data !== undefined && step4Data.list_checkups
          ? step4Data.list_checkups.map((item) => item.id)
          : [];
      const list_analysis =
        step4Data !== undefined && step4Data.list_analysis
          ? step4Data.list_analysis.map((item) => item.id)
          : [];

      const listIds = list_checkups.concat(list_analysis);

      const sendData: createCampaignType = {
        name: showDataStep6.campaign_name,
        location: showDataStep6.application_branch,
        campaign_objective: showDataStep6.campaign_objective,
        application_date: showDataStep6.application_date,
        notification: showDataStep6.notification === 'Si' ? true : false,
        is_analysis: step2Data.type_service === 'Análisis',
        data: step3Data ? [step3Data.type_specialty] : listIds,
        collaborators: step5Data.map((item) => item._id),
        id_branchBTB: step1Data.id_branch,
        id_company: session?.company.id!,
        price_per_px: showDataStep6.price_per_px,
        total_px: showDataStep6.total_px,
        total_to_pay: showDataStep6.total_to_pay,
      };

      await campaignServices.createCampaign(sendData, session?.accessToken!);
      router.push('/dashboard/campaign/');
    }
  };

  useEffect(() => {
    if (
      status === 'authenticated' &&
      session &&
      session.accessToken &&
      session.company?.id
    ) {
    }
  }, [status, session]);

  const renderStepComponent = () => {
    switch (currentPage) {
      case 1:
        return <Step1 onFormSubmit={handleStep1FormSubmit} />;
      case 2:
        return (
          <Step2
            onFormSubmit={handleStep2FormSubmit}
            updateCurrentPage={updateCurrentPage}
          />
        );
      case 3:
        return (
          <Step3
            onFormSubmit={handleStep3FormSubmit}
            updateCurrentPage={updateCurrentPage}
          />
        );
      case 4:
        return (
          <Step4
            onFormSubmit={handleStep4FormSubmit}
            updateCurrentPage={updateCurrentPage}
          />
        );
      case 5:
        return (
          <Step5
            onFormSubmit={handleStep5FormSubmit}
            idBranchStep2={step1Data && step1Data.id_branch}
          />
        );
      case 6:
        return (
          <>
            {showDataStep6 && (
              <Step6
                showData={showDataStep6}
                onSubmit={handleStep6FormSubmit}
              />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <HeroLayout>
      <LayoutHeader title="Crear campaña">
        <button className="button-secondary" onClick={() => router.back()}>
          Regresar
        </button>
      </LayoutHeader>

      <div className="layout-body">
        <div className="employees-create-main">
          <div className="employees-create-container">
            <div className="employees-create-section">
              <div className="table-container">{renderStepComponent()}</div>
            </div>
          </div>
        </div>
      </div>
    </HeroLayout>
  );
};

export default Page;
