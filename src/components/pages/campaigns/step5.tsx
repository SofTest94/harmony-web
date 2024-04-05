import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Table from '@/components/organisms/Table';
import HeaderSteper from '@/components/molecules/HeaderSteper';
import SearchInput from '@/components/atoms/SearchInput';
import Image from 'next/image';
import iconFilter from '@/icon/icon-filter.svg';
import {
  getListUsersForCompanyAndBranchType,
  getListBranchesForCompanyType,
  itemsListUsers,
} from '@/app/types/campaign.types';
import { campaignServices } from '@/services/campaign/campaign';
import Pagination from '@/components/organisms/Pagination';
import { useSession } from 'next-auth/react';

type Step5Props = {
  onFormSubmit: (data: itemsListUsers) => void;
  idBranchStep2?: string;
};

const Step5: React.FC<Step5Props> = ({ onFormSubmit, idBranchStep2 }) => {
  const { data: session } = useSession();
  const [showError, setShowError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [employees, setEmployees] = useState<itemsListUsers>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<itemsListUsers>(
    [],
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [branchData, setBranchData] = useState<getListBranchesForCompanyType>(
    [],
  );
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(
    '',
  );

  const [auxIdBranchStep2, setAuxIdBranchStep2] = useState<string>(
    idBranchStep2!,
  );

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los datos de las sucursales
        const branches_data: getListBranchesForCompanyType =
          await campaignServices.getListBranchesForCompany(
            session?.company.id!,
            session?.accessToken!,
          );
        setBranchData(branches_data);

        // Establecer el branch_id predeterminado como el primer elemento
        if (branches_data.length > 0) {
          const default_branch_id = branches_data[0]._id;
          setSelectedBranchId(default_branch_id);
          // Cargar los datos de los empleados para la sucursal predeterminada
          await fetchEmployeeData(idBranchStep2!);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (auxIdBranchStep2) {
      // Cuando se selecciona una sucursal, cargar los datos de los empleados
      fetchEmployeeData(auxIdBranchStep2);
    }
  }, [auxIdBranchStep2, currentPage]);

  const fetchEmployeeData = async (branchId: string) => {
    try {
      const employeeData: getListUsersForCompanyAndBranchType =
        await campaignServices.getListUsersForCompanyAndBranch(
          session?.company.id!,
          branchId,
          session?.accessToken!,
          currentPage,
        );

      if (employeeData) {
        setEmployees(employeeData.items); // Actualizar los datos de los empleados
        setTotalPages(employeeData.totalPages);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const onSubmit = () => {
    if (selectedEmployees.length === 0) {
      setShowError(true);
    } else {
      setShowError(false);
      onFormSubmit(selectedEmployees);
    }
  };

  const handleSelectedEmployeesChange = (employeeId: string) => {
    setSelectedEmployees((prevSelectedEmployees) => {
      const employee_index = prevSelectedEmployees.findIndex(
        (employee) => employee._id === employeeId,
      );
      if (employee_index !== -1) {
        // Si el empleado ya está seleccionado, lo eliminamos del array
        const updated_employees = [
          ...prevSelectedEmployees.slice(0, employee_index),
          ...prevSelectedEmployees.slice(employee_index + 1),
        ];
        return updated_employees;
      } else {
        // Si el empleado no está seleccionado, lo agregamos al array
        const selected_employee = employees.find(
          (employee) => employee._id === employeeId,
        );
        if (selected_employee) {
          return [...prevSelectedEmployees, selected_employee];
        } else {
          return prevSelectedEmployees;
        }
      }
    });
  };

  const toggleAllEmployeesSelection = () => {
    setSelectedEmployees((prevSelectedEmployees) =>
      prevSelectedEmployees.length === employees.length ? [] : employees,
    );
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const current_employees = employees.filter((employee) =>
    employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Al cambiar de página, se debe volver a obtener los datos de los empleados
    if (idBranchStep2) {
      fetchEmployeeData(idBranchStep2);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected_id = e.target.value;
    setSelectedBranchId(selected_id);
    setCurrentPage(1); // Restablecer la página actual a 1 al cambiar de sucursal
  };

  const handleFormSubmit = (data: any, e: any) => {
    if (e.nativeEvent.submitter.name === 'submit-button') {
      onSubmit();
    }
  };

  return (
    <>
      <HeaderSteper
        title="Elige a los empleados que se aplicará la campaña"
        description="Selecciona a los empleados a los que aplicarás la campaña de salud. Si elegiste no notificar a tus colaboradores, no recibirán ningún tipo de notificación."
      />
      <div className="form-control form-center-step5">
        <form
          className="form-control"
          onSubmit={handleSubmit(handleFormSubmit)}
          autoComplete="off"
        >
          <div className="table-container">
            <div className="table-header">
              <SearchInput onChange={handleSearchChange} register={{}} />
              <div className="table-filters">
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => {
                    console.log('Filtros!!');
                  }}
                >
                  <Image src={iconFilter} alt="icon" />
                  Filtros
                </button>
                <button
                  className="button-secondary"
                  type="button"
                  onClick={() => {
                    console.log('Ordenar por!!');
                  }}
                >
                  Ordenar por
                </button>
                {/* <div className="button-secondary">
                  <select
                    id="branch"
                    onChange={handleSelectChange}
                    value={selectedBranchId}
                  >
                    <option value="" className="option-disabled" disabled>
                      Elige una sucursal*
                    </option>
                    {branchData.map((branch) => (
                      <option key={branch._id} value={branch._id}>
                        {branch.branchBTB_name}
                      </option>
                    ))}
                  </select>
                </div> */}
              </div>
            </div>
            <Table
              columns={[{ Header: 'Empleado', accessor: 'fullName' }]}
              data={current_employees}
              handleEmployeeSelectionChange={handleSelectedEmployeesChange}
              toggleAllEmployeesSelection={toggleAllEmployeesSelection}
              selectedEmployees={selectedEmployees.map(
                (employee) => employee._id,
              )}
            />

            {showError && <p>Seleccione al menos un empleado.</p>}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
          <button className="button-primary" type="submit" name="submit-button">
            Siguiente
          </button>
        </form>
      </div>
    </>
  );
};

export default Step5;
