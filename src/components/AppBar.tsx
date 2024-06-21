// import React, { useState } from 'react';
// import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
// import { styled, Theme } from '@mui/system';
// import BranchSelect from './BranchSelect';

// interface AppBarProps {
//   onSelectBranch: (branch: string) => void;
// }

// const AppBarRoot = styled('div')(({ theme }: { theme: Theme }) => ({
//   marginBottom: theme.spacing(2),
//   position: 'fixed', // Hace que el AppBar sea fijo
//   top: 0, // Lo fija en la parte superior de la página
//   width: '100%', // Ocupa todo el ancho de la página
//   zIndex: 1100, // Asegura que esté por encima de otros elementos
// }));

// const LogoImage = styled('img')({
//   marginRight: 'auto',
//   height: '50px',
// });

// const SelectContainer = styled('div')({
//   marginLeft: 'auto',
// });

// const AppBar: React.FC<AppBarProps> = ({ onSelectBranch }) => {
//   const [selectedItem, setSelectedItem] = useState<string>('');

//   const handleMenuItemClick = (sectionId: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//     setSelectedItem(sectionId); // Actualizar el elemento seleccionado
//   };

//   return (
//     <AppBarRoot>
//       <MuiAppBar position="static">
//         <Toolbar>
//           {/* <LogoImage
//             // src={
//             //   'https://w7.pngwing.com/pngs/955/987/png-transparent-physical-medicine-and-rehabilitation-physical-therapy-physician-health-text-logo-sign.png'
//             // }
//             src="/img/"
//             alt="Logo"
//           /> */}
//           <Typography
//             variant="h4"
//             sx={{
//               cursor: 'pointer',
//               marginLeft: '20px',
//               fontWeight: 'bold',
//               color: '#DBE024', // Cambia el color si seleccionado
//               fontSize:'2vw'
//             }}
//           >
//             HARMONY
//           </Typography>
//           <SelectContainer>
//             <BranchSelect onSelect={onSelectBranch} />
//           </SelectContainer>
//           <Typography
//             variant="h6"
//             sx={{
//               cursor: 'pointer',
//               marginLeft: '20px',
//               color: selectedItem === 'section1' ? '#DBE024' : 'white', // Cambia el color si seleccionado
//               fontSize:'2vw'
//             }}
//             onClick={() => handleMenuItemClick('section1')}
//           >
//             Descripción
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               cursor: 'pointer',
//               marginLeft: '20px',
//               color: selectedItem === 'section2' ? '#DBE024' : 'white', // Cambia el color si seleccionado
//               fontSize:'2vw'
//             }}
//             onClick={() => handleMenuItemClick('section2')}
//           >
//             Tratamientos
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               cursor: 'pointer',
//               marginLeft: '20px',
//               color: selectedItem === 'section3' ? '#DBE024' : 'white', // Cambia el color si seleccionado
//               fontSize:'2vw'
//             }}
//             onClick={() => handleMenuItemClick('section3')}
//           >
//             Especialistas
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               cursor: 'pointer',
//               marginLeft: '20px',
//               color: selectedItem === 'section4' ? '#DBE024' : 'white', // Cambia el color si seleccionado
//               fontSize:'2vw'
//             }}
//             onClick={() => handleMenuItemClick('section4')}
//           >
//             Opiniones
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               cursor: 'pointer',
//               marginLeft: '20px',
//               color: selectedItem === 'section5' ? '#F3F91F' : 'white', // Cambia el color si seleccionado
//               fontSize:'2vw'
//             }}
//             onClick={() => handleMenuItemClick('section5')}
//           >
//             Socios
//           </Typography>
//         </Toolbar>
//       </MuiAppBar>
//     </AppBarRoot>
//   );
// };

// export default AppBar;

import React, { useState } from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import BranchSelect from './BranchSelect';
import { Branches } from './types/branches';

interface AppBarProps {
  onSelectBranch: (branch: Branches) => void;
}

const AppBarRoot = styled('div')({
  marginBottom: '8px', // Puedes ajustar según tus necesidades
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1100,
  
});

const MenuContainer = styled('div')({
  marginLeft: 'auto',
  marginRight: '16px', // Puedes ajustar el valor del margen derecho aquí
  
});

const AppBar: React.FC<AppBarProps> = ({ onSelectBranch }) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuItemClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedItem(sectionId);
    setAnchorEl(null); // Cerrar el menú después de seleccionar
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="section-container">
    <AppBarRoot>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              marginRight: 'auto',
              marginLeft: '16px', // Puedes ajustar el margen izquierdo aquí
              fontWeight: 'bold',
              color: '#DBE024',
              fontSize: '2vw',
              fontFamily: 'Arial, sans-serif', // Aplica la fuente directamente aquí

            }}
          >
            HARMONY
          </Typography>
          <BranchSelect onSelect={onSelectBranch} />
          <MenuContainer>
            <IconButton
              onClick={handleMenuOpen}
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ marginRight: 1 }}
            >
              <Typography variant="h6" sx={{ fontSize: '1.9vw', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', marginTop:'-0.3vw' }}>
                Menú
              </Typography>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'menu-appbar',
              }}
              sx={{ fontSize: '2vw', color: '#fff', fontFamily: 'Arial, sans-serif' }}
            >
              {/* <Menu
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id="menu-appbar"
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'menu-appbar',
                }}
                sx={{ fontSize: '2vw', color: '#fff', fontFamily: 'Arial, sans-serif' }}
              > */}

              <MenuItem onClick={() => handleMenuItemClick('section1')}>
                Descripción
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('section2')}>
                Tratamientos
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('section3')}>
                Especialistas
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('section4')}>
                Opiniones
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('section5')}>
                Socios
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('section6')}>
                Videos
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('section7')}>
                Servicios
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('section8')}>
                Dudas
              </MenuItem>
            </Menu>
          </MenuContainer>
        </Toolbar>
      </MuiAppBar>
    </AppBarRoot>
    </div>
        
  );
};

export default AppBar;
