import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'; // Importa useForm
import HeaderSteper from '@/components/molecules/HeaderSteper';
import {
  CampaignCheckupsStep4Type,
  CampaignStep4Type,
  getListExams,
} from '@/app/types/campaign.types';
import { getAllExams } from '@/services/exams';
import SearchInput from '@/components/atoms/SearchInput';
import IconDelete from '@/icon/icon-delete.svg';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

type Step4Props = {
  onFormSubmit: (data: CampaignStep4Type) => void;
  updateCurrentPage: () => void;
};

const Step4: React.FC<Step4Props> = ({ onFormSubmit, updateCurrentPage }) => {
  const { data: session } = useSession();
  const [originalSelectedCheckups, setOriginalSelectedCheckups] = useState<
    CampaignCheckupsStep4Type[]
  >([]);
  const [originalSelectedAnalysis, setOriginalSelectedAnalysis] = useState<
    CampaignCheckupsStep4Type[]
  >([]);
  const [data_exams_individual, setDataExamsIndividual] =
    useState<getListExams>();
  const [data_exams_checkups, setDataExamsCheckups] = useState<getListExams>();
  const [showError, setShowError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCheckups, setSelectedCheckups] = useState<
    CampaignCheckupsStep4Type[]
  >([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<
    CampaignCheckupsStep4Type[]
  >([]);

  const [selectedItems, setSelectedItems] = useState<
    CampaignCheckupsStep4Type[]
  >([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CampaignStep4Type>();

  useEffect(() => {
    if (session && session.accessToken) {
      const fetchLoadExams = async () => {
        try {
          const response_exams: getListExams = await getAllExams(
            session?.accessToken!,
          );

          const data_checkups = response_exams.filter((exam) =>
            exam.examId.includes('Q-'),
          );
          const data_only_anality = response_exams.filter((exam) =>
            exam.examId.includes('P-'),
          );

          setDataExamsCheckups(data_checkups.slice(0, 5));
          setDataExamsIndividual(data_only_anality.slice(0, 5));
        } catch (error) {
          console.error('Error fetching getAllExams data:', error);
        }
      };

      fetchLoadExams();
    }
  }, [session]);

  const data_checkups: CampaignCheckupsStep4Type[] =
    data_exams_checkups?.map((exam) => ({
      id: exam._id,
      name: exam.name,
      price: exam.price,
    })) ?? [];

  const data_analysis: CampaignCheckupsStep4Type[] =
    data_exams_individual?.map((exam) => ({
      id: exam._id,
      name: exam.name,
      price: exam.price,
    })) ?? [];

  const onSubmit = (data: CampaignStep4Type) => {
    const list_checkups = data.list_checkups;
    const list_analysis = data.list_analysis;

    if (list_analysis === undefined || list_checkups === undefined) {
      if (list_analysis === undefined && list_checkups === undefined) {
        setShowError(true);
        return;
      }
      if (list_analysis === undefined) {
        if (list_checkups !== undefined) {
          if (list_checkups.length === 0) {
            setShowError(true);
            return;
          }
        }
      } else {
        if (list_checkups === undefined) {
          if (list_analysis !== undefined) {
            if (list_analysis.length === 0) {
              setShowError(true);
              return;
            }
          }
        }
      }
    }

    if (list_analysis !== undefined && list_checkups !== undefined) {
      if (list_analysis.length === 0 && list_checkups.length === 0) {
        setShowError(true);
        return;
      }
    }

    setShowError(false);
    data.total = totalPrice;
    onFormSubmit(data);
    updateCurrentPage();
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const filterOptions = (options: CampaignCheckupsStep4Type[]) => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  useEffect(() => {
    setOriginalSelectedCheckups(selectedCheckups);
    setOriginalSelectedAnalysis(selectedAnalysis);
  }, [selectedCheckups, selectedAnalysis]);

  useEffect(() => {
    const totalPrice = [...selectedCheckups, ...selectedAnalysis].reduce(
      (acc, item) => acc + item.price,
      0,
    );
    setTotalPrice(totalPrice);
    setSelectedItems([...selectedCheckups, ...selectedAnalysis]);
  }, [selectedCheckups, selectedAnalysis]);

  return (
    <>
      <HeaderSteper
        title="Selecciona el tipo de análisis clínicos que requieres"
        description=" Ahora, elige entre nuestros análisis individuales o check-ups diseñados para perfiles específicos. Selecciona tantas opciones como te sean necesarias, puedes usar la barra de búsqueda para encontrar el análisis o check-up que necesitas. ¡En Mediclar cuidamos la salud de tu equipo con prevención!"
      />
      <div className="form-control form-center-step4">
        <form
          className="form-control"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="resume-container">
            <h2>Resumen</h2>
            <h3>
              El costo de tus análisis seleccionados por px:{' '}
              <span>
                {totalPrice.toLocaleString('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }) + ' px'}
              </span>
            </h3>

            <div className="list-analysis">
              {selectedItems.map((item, index) => (
                <div className="analysis-item" key={index}>
                  <p>{item.name}</p>
                  <div className="analysis-item-delete">
                    <Image src={IconDelete} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SearchInput onChange={handleSearchChange} register={register} />{' '}
          <div className="checkups-container">
            <HeaderSteper title="Check-ups" />

            {filterOptions(data_checkups).map((data, index) => (
              <div key={index}>
                <label
                  className="checkbox-label-checkups"
                  htmlFor={`checkbox1_${index}`}
                  key={index}
                >
                  {data.price.toLocaleString('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                  })}{' '}
                  {data.name}
                  <input
                    className="checkbox-checkups"
                    type="checkbox"
                    id={`checkbox1_${index}`}
                    value={data.id}
                    checked={originalSelectedCheckups.some(
                      (item) => item.id === data.id,
                    )}
                    onChange={(e) => {
                      const selectedItems1: CampaignCheckupsStep4Type[] = e
                        .target.checked
                        ? [
                          ...selectedCheckups,
                            data_checkups.find(
                              (appointment) => appointment.id === data.id,
                            )!,
                        ]
                        : selectedCheckups.filter(
                          (item) => item.id !== data.id,
                        );
                      setValue('list_checkups', selectedItems1);

                      setSelectedCheckups(selectedItems1);
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="analysis-list">
            <HeaderSteper
              title="Análisis clínicos individuales"
              description=""
            />
            {filterOptions(data_analysis).map((data, index) => (
              <div key={index} >
                <label
                  className="checkbox-label-checkups"
                  htmlFor={`checkbox2_${index}`}
                >
                  {data.price.toLocaleString('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                  })}{' '}
                  {data.name}

                  <input
                    className="checkbox-analysis"
                    type="checkbox"
                    id={`checkbox2_${index}`}
                    value={data.id}
                    checked={originalSelectedAnalysis.some(
                      (item) => item.id === data.id,
                    )}
                    onChange={(e) => {
                      const selectedItems2: CampaignCheckupsStep4Type[] = e
                        .target.checked
                        ? [
                          ...selectedAnalysis,
                            data_analysis.find(
                              (appointment) => appointment.id === data.id,
                            )!,
                        ]
                        : selectedAnalysis.filter(
                          (item) => item.id !== data.id,
                        );
                      setValue('list_analysis', selectedItems2);
                      setSelectedAnalysis(selectedItems2);
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
          <div>
            <p>{showError ? 'Selecciona al menos una opción' : ''}</p>
          </div>
          <button className="button-primary" type="submit">
            Siguiente
          </button>
        </form>
      </div>
    </>
  );
};

export default Step4;
