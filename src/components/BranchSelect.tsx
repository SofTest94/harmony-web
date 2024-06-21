// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { Branches } from './types/branches'; // Importa la interfaz Branches
// import { branchServices } from './services/branches';

// interface BranchSelectProps {
//   onSelect: (branch: Branches) => void; // Función para manejar la selección de la sucursal
// }

// const BranchSelect: React.FC<BranchSelectProps> = ({ onSelect }) => {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const [selectedBranch, setSelectedBranch] = React.useState<Branches | null>(null); // Estado para la sucursal seleccionada
//   const [dataBranches, setDataBranches] = React.useState<Branches[]>([]); // Estado para almacenar las sucursales obtenidas

//   React.useEffect(() => {
//     // Función asincrónica para obtener las sucursales
//     async function fetchDataBranches() {
//       try {
//         const data = await branchServices.getAllBranches(''); // Llama al servicio para obtener las sucursales (debe proporcionar un parámetro aquí si es necesario)
//         setDataBranches(data); // Actualiza el estado con las sucursales recibidas del servicio
//       } catch (error) {
//         console.error('Error fetching data branches:', error);
//       }
//     }

//     fetchDataBranches(); // Llama a la función de carga al montar el componente
//   }, []);

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget); // Abre el menú al hacer clic en el botón
//   };

//   const handleClose = () => {
//     setAnchorEl(null); // Cierra el menú al hacer clic fuera de él
//   };

//   const handleMenuItemClick = (branch: Branches) => {
//     setSelectedBranch(branch); // Establece la sucursal seleccionada
//     onSelect(branch); // Llama a la función onSelect con la sucursal seleccionada
//     handleClose(); // Cierra el menú
//   };

//   return (
//     <div>
//       <Button
//         id="branch-button"
//         aria-controls={anchorEl ? 'branch-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={anchorEl ? 'true' : undefined}
//         onClick={handleClick}
//         sx={{ color: 'inherit', fontWeight: 'bold' }}
//       >
//         Sucursal: {selectedBranch ? selectedBranch.name : 'Seleccionar sucursal'}
//       </Button>
//       <Menu
//         id="branch-menu"
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'branch-button',
//         }}
//       >
//         {dataBranches.map((branch) => (
//           <MenuItem key={branch._id} onClick={() => handleMenuItemClick(branch)}>
//             {branch.name}
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// };

// export default BranchSelect;




import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Branches } from './types/branches'; // Importa la interfaz Branches
import { branchServices } from './services/branches';

interface BranchSelectProps {
  onSelect: (branch: Branches) => void; // Función para manejar la selección de la sucursal
}

const BranchSelect: React.FC<BranchSelectProps> = ({ onSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedBranch, setSelectedBranch] = React.useState<Branches | null>(null); // Estado para la sucursal seleccionada
  const [dataBranches, setDataBranches] = React.useState<Branches[]>([]); // Estado para almacenar las sucursales obtenidas

  React.useEffect(() => {
    // Función asincrónica para obtener las sucursales
    async function fetchDataBranches() {
      try {
        const data = await branchServices.getAllBranches(''); // Llama al servicio para obtener las sucursales (debe proporcionar un parámetro aquí si es necesario)
        setDataBranches(data); // Actualiza el estado con las sucursales recibidas del servicio

        // Aquí establecemos la primera sucursal como la seleccionada por defecto
        if (data.length > 0) {
          setSelectedBranch(data[0]);
          onSelect(data[0]); // Llama a la función onSelect con la primera sucursal seleccionada
        }
      } catch (error) {
        console.error('Error fetching data branches:', error);
      }
    }

    fetchDataBranches(); // Llama a la función de carga al montar el componente
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); // Abre el menú al hacer clic en el botón
  };

  const handleClose = () => {
    setAnchorEl(null); // Cierra el menú al hacer clic fuera de él
  };

  const handleMenuItemClick = (branch: Branches) => {
    setSelectedBranch(branch); // Establece la sucursal seleccionada
    onSelect(branch); // Llama a la función onSelect con la sucursal seleccionada
    handleClose(); // Cierra el menú
  };

  return (
    <div>
      <Button
        id="branch-button"
        aria-controls={anchorEl ? 'branch-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: 'inherit', fontWeight: 'bold' }}
      >
        Sucursal: {selectedBranch ? selectedBranch.name : 'Seleccionar sucursal'}
      </Button>
      <Menu
        id="branch-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'branch-button',
        }}
      >
        {dataBranches.map((branch) => (
          <MenuItem key={branch._id} onClick={() => handleMenuItemClick(branch)}>
            {branch.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default BranchSelect;
