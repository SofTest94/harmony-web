type Step1CampaignFormData = {
  name: string;
  branch: string;
  date_application: string;
  object_campaign: string;
  notify?: string;
};
import React, { createContext, useContext, useState } from 'react';

type FormDataContextType = {
  formData: Step1CampaignFormData | null;
  setFormData: React.Dispatch<
    React.SetStateAction<Step1CampaignFormData | null>
  >;
};

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined,
);

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData debe ser usado dentro de FormDataProvider');
  }
  return context;
};

type FormDataProviderProps = {
  children: React.ReactNode;
};

export const FormDataProvider: React.FC<FormDataProviderProps> = ({
  children,
}) => {
  const [formData, setFormData] = useState<Step1CampaignFormData | null>(null);

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
