'use client';

import React, { useState, useEffect } from 'react';
import HeroLayout from '@/components/organisms/HeroLayout';
import { useRouter } from 'next/navigation';
import { campaignServices } from '@/services/campaign/campaign';
import { useSession } from 'next-auth/react';
import {
  challengeStep1Type,
  challengeStep2Type,
  itemsListUsers,
  createChallengeType,
} from '@/app/types/challenge.types';
import LayoutHeader from '@/components/organisms/LayoutHeader';
import Step2 from '@/components/pages/challenges/step2';
import Step3 from '@/components/pages/challenges/step3';
import Step1 from '@/components/pages/challenges/step1';
import Step4 from '@/components/pages/challenges/step4';
import { challengeService } from '@/services/challenge/challenge';

const Page: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [step1Data, setStep1Data] = useState<any>();
  const [step2Data, setStep2Data] = useState<challengeStep2Type>();
  const [step3Data, setStep3Data] = useState<itemsListUsers>();
  const [showDataSet4, setShowDataSet4] = useState<any>();

  const updateCurrentPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleStep1FormSubmit = (data: challengeStep1Type) => {
    setStep1Data(data);
    updateCurrentPage();
  };

  const handleStep2FormSubmit = (data: any) => {
    setStep2Data(data);
    updateCurrentPage();
  };

  const handleStep3FormSubmit = (data: itemsListUsers) => {
    setStep3Data(data);

    if (step1Data && step2Data) {
      const showDataSet = {
        challengeName: step1Data.challenge.name,
        challengeDescription: step1Data?.challenge.description,
        challengeStartDate: step2Data?.startDate,
        challengeShortDescription: step2Data?.description,
        challengeAward: step2Data?.prize,
        challengeDetails: step1Data?.challenge.details,
        challengeObjective: step1Data?.challenge.objective,
        challengeStatus: true,
      };
      setShowDataSet4(showDataSet);
      updateCurrentPage();
    }
  };

  const handleStep4FormSubmit = async () => {
    if (step1Data && step2Data) {
      let status = showDataSet4.challengeStatus;
      if (status === true) {
        status = 'Activo';
      } else {
        status = 'Finalizado';
      }
      const sendData: createChallengeType = {
        name: showDataSet4.challengeName,
        description: showDataSet4.challengeDescription,
        shortDescription: showDataSet4.challengeShortDescription,
        startDate: showDataSet4.challengeStartDate,
        reward: showDataSet4.challengeAward,
        details: showDataSet4.challengeDetails,
        objective: showDataSet4.challengeObjective,
        status: status,
        employees: step3Data?.map((item) => item._id) ?? [],
        idCompany: session?.company?.id!,
      };

      await challengeService.createChallenge(sendData, session?.accessToken!);
      /* router.push('/dashboard/challenge'); */
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
        return <Step3 onFormSubmit={handleStep3FormSubmit} />;
      case 4:
        return (
          <>
            {showDataSet4 && (
              <Step4 showData={showDataSet4} onSubmit={handleStep4FormSubmit} />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <HeroLayout>
      <LayoutHeader title="Crear reto">
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
