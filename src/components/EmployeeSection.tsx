import React from 'react';

interface EmployeeSectionProps {
  selectedBranch: string;
}

const EmployeeSection: React.FC<EmployeeSectionProps> = ({ selectedBranch }) => {
  return (
    <section>
      <h2>Empleados</h2>
      <p>Sucursal seleccionada: {selectedBranch}</p>
      {/* Aquí puedes mostrar la información de los empleados */}
    </section>
  );
};

export default EmployeeSection;
