import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface BranchSelectProps {
  onSelect: (branch: string) => void;
}

const BranchSelect: React.FC<BranchSelectProps> = ({ onSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedBranch, setSelectedBranch] = React.useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (branch: string) => {
    console.log(branch);
    setSelectedBranch(branch);
    onSelect(branch);
    handleClose();
  };

  return (
    <div>
      <Button
        id="branch-button"
        aria-controls={anchorEl ? 'branch-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
        // Aplicamos un estilo para asegurar que el texto sea visible
        sx={{ color: 'inherit', fontWeight: 'bold' }}
      >
        SUCURSAL: {selectedBranch || 'México'}
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
        <MenuItem onClick={() => handleMenuItemClick('México')}>México</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Pachuca')}>Pachuca</MenuItem>
        {/* Agrega más sucursales según sea necesario */}
      </Menu>
    </div>
  );
};

export default BranchSelect;
