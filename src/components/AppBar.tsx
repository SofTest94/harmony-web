import React, { useState } from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import { styled, Theme } from '@mui/system';
import BranchSelect from './BranchSelect';

interface AppBarProps {
  onSelectBranch: (branch: string) => void;
}

const AppBarRoot = styled('div')(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2),
  position: 'fixed', // Hace que el AppBar sea fijo
  top: 0, // Lo fija en la parte superior de la página
  width: '100%', // Ocupa todo el ancho de la página
  zIndex: 1100, // Asegura que esté por encima de otros elementos
}));

const LogoImage = styled('img')({
  marginRight: 'auto',
  height: '50px',
});

const SelectContainer = styled('div')({
  marginLeft: 'auto',
});

const AppBar: React.FC<AppBarProps> = ({ onSelectBranch }) => {
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleMenuItemClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedItem(sectionId); // Actualizar el elemento seleccionado
  };

  return (
    <AppBarRoot>
      <MuiAppBar position="static">
        <Toolbar>
          {/* <LogoImage
            // src={
            //   'https://w7.pngwing.com/pngs/955/987/png-transparent-physical-medicine-and-rehabilitation-physical-therapy-physician-health-text-logo-sign.png'
            // }
            src="/img/"
            alt="Logo"
          /> */}
          <Typography
            variant="h4"
            sx={{
              cursor: 'pointer',
              marginLeft: '20px',
              fontWeight: 'bold',
              color: '#DBE024', // Cambia el color si seleccionado
            }}
          >
            H A R M O N Y
          </Typography>
          <SelectContainer>
            <BranchSelect onSelect={onSelectBranch} />
          </SelectContainer>
          <Typography
            variant="h6"
            sx={{
              cursor: 'pointer',
              marginLeft: '20px',
              color: selectedItem === 'section1' ? '#DBE024' : 'white', // Cambia el color si seleccionado
            }}
            onClick={() => handleMenuItemClick('section1')}
          >
            Descripción
          </Typography>
          <Typography
            variant="h6"
            sx={{
              cursor: 'pointer',
              marginLeft: '20px',
              color: selectedItem === 'section2' ? '#DBE024' : 'white', // Cambia el color si seleccionado
            }}
            onClick={() => handleMenuItemClick('section2')}
          >
            Tratamientos
          </Typography>
          <Typography
            variant="h6"
            sx={{
              cursor: 'pointer',
              marginLeft: '20px',
              color: selectedItem === 'section3' ? '#DBE024' : 'white', // Cambia el color si seleccionado
            }}
            onClick={() => handleMenuItemClick('section3')}
          >
            Especialistas
          </Typography>
          <Typography
            variant="h6"
            sx={{
              cursor: 'pointer',
              marginLeft: '20px',
              color: selectedItem === 'section4' ? '#DBE024' : 'white', // Cambia el color si seleccionado
            }}
            onClick={() => handleMenuItemClick('section4')}
          >
            Opiniones
          </Typography>
          <Typography
            variant="h6"
            sx={{
              cursor: 'pointer',
              marginLeft: '20px',
              color: selectedItem === 'section5' ? '#F3F91F' : 'white', // Cambia el color si seleccionado
            }}
            onClick={() => handleMenuItemClick('section5')}
          >
            Socios
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </AppBarRoot>
  );
};

export default AppBar;
