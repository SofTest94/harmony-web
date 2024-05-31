import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { handleScheduleAppointmentClick } from '../../utils/functions';

interface FormModalProps {
  open: boolean;
  handleClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ open, handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = () => {
    console.log(firstName, lastName, selectedOption);
    handleScheduleAppointmentClick(
      '5576877703',
      `Hola!, Soy ${firstName} ${lastName} y me gustaría obtener más información sobre ${
        selectedOption === 'Otro' ? 'Harmony' : selectedOption
      }`
    );
    handleClose();
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handleOptionChange = (e: SelectChangeEvent<string>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Solicitar Información</DialogTitle>
        <DialogContent>
          <DialogContentText>Por favor introduce tu nombre y apellidos (mínimo 3 caracteres cada uno)</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstName"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <TextField
            required
            margin="dense"
            id="lastName"
            label="Apellidos"
            type="text"
            fullWidth
            variant="outlined"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel id="select-label">Motivo de consulta</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={selectedOption}
              onChange={handleOptionChange}
              label="Motivo de consulta"
            >
              <MenuItem value="">Seleccionar opción</MenuItem>
              <MenuItem value={'Agendar cita'}>Agendar cita</MenuItem>
              <MenuItem value={'Precios'}>Precios</MenuItem>
              <MenuItem value={'Otro'}>Otro</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={handleSubmit}
            disabled={!firstName.trim() || !lastName.trim() || !selectedOption.trim()}
            variant="contained"
            color="primary"
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormModal;
