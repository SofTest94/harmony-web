// src/components/molecules/Form.tsx
import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface FormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit, value, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <Input value={value} onChange={onChange} />
      <Button onClick={onSubmit} className={''}>
        Submit
      </Button>
    </form>
  );
};

export default Form;
