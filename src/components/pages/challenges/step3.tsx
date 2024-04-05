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
import { challengeService } from '@/services/challenge/challenge';
import Pagination from '@/components/organisms/Pagination';
import { useSession } from 'next-auth/react';

type Step3Props = {
  onFormSubmit: (data: itemsListUsers) => void;
};

const Step3: React.FC<Step3Props> = ({ onFormSubmit }) => {
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

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los datos de las sucursales
        const branchesData: getListBranchesForCompanyType =
          await challengeService.getListBranchesForCompany(
            session?.company.id!,
            session?.accessToken!,
          );
        setBranchData(branchesData);

        // Establecer el branch_id predeterminado como el primer elemento
        if (branchesData.length > 0) {
          const defaultBranchId = branchesData[0]._id;
          setSelectedBranchId(defaultBranchId);
          // Cargar los datos de los empleados para la sucursal predeterminada
          await fetchEmployeeData(defaultBranchId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedBranchId) {
      fetchEmployeeData(selectedBranchId);
    }
  }, [selectedBranchId, currentPage]);

  const fetchEmployeeData = async (branchId: string) => {
    try {
      const employeeData: getListUsersForCompanyAndBranchType =
        await challengeService.getListUsersForCompanyAndBranch(
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
      const employeeIndex = prevSelectedEmployees.findIndex(
        (employee) => employee._id === employeeId,
      );
      if (employeeIndex !== -1) {
        // Si el empleado ya está seleccionado, lo eliminamos del array
        const updatedEmployees = [
          ...prevSelectedEmployees.slice(0, employeeIndex),
          ...prevSelectedEmployees.slice(employeeIndex + 1),
        ];
        return updatedEmployees;
      } else {
        // Si el empleado no está seleccionado, lo agregamos al array
        const selectedEmployee = employees.find(
          (employee) => employee._id === employeeId,
        );
        if (selectedEmployee) {
          return [...prevSelectedEmployees, selectedEmployee];
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

  const currentEmployees = employees.filter((employee) =>
    employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Al cambiar de página, se debe volver a obtener los datos de los empleados
    fetchEmployeeData(selectedBranchId || '');
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedBranchId(selectedId);

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
        title="Invita a tus empleados"
        description="Llegó el momento de elegir a los participantes para tu reto de salud. Selecciona a los colaboradores que desees involucrar en esta emocionante aventura hacia hábitos más saludables. Todos a bordo para una experiencia de bienestar única."
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
                <div className="button-secondary">
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
                </div>
              </div>
            </div>
            <Table
              columns={[{ Header: 'Empleado', accessor: 'fullName' }]}
              data={currentEmployees}
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

export default Step3;
