import React from 'react';
type StepHeader = {
  title: string;
  description?: string;
};
const HeaderSteper = (props: StepHeader) => {
  const { title, description } = props;
  return (
    <div className="header-steper">
      <h2 className="subtitle-primary-blue">{title}</h2>
      <p className="text-primary-blue">{description}</p>
    </div>
  );
};

export default HeaderSteper;
