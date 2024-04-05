import Image from 'next/image';
import React from 'react';

interface CardProps {
  challenge: {
    _id: string;
    name: string;
    description: string;
    duration: number;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ challenge, isSelected, onSelect }) => {
  if (!challenge) {
    return <div>Loading...</div>;
  }

  const cardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    margin: '20px',
    minWidth: '112px',
    height: '148px',
    border: '2px solid #A2A7BF',
    gap: '20px',
    color: '#A2A7BF',
    borderRadius: '8px',

    cursor: 'pointer',
    backgroundColor: isSelected ? '#F0F0F0' : '#FFFFFF',
  };

  const handleClick = () => {
    onSelect(challenge._id);
  };
  const img =
    'https://uploads-ssl.webflow.com/63d16ac1f3b6704b0d3c8ffc/65f2933dae2d27695a803c3b_Union.svg';
  return (
    <div style={cardStyles} onClick={handleClick}>
      <Image src={img} width={60} height={40} alt="" />
      <h3>{challenge.name}</h3>
    </div>
  );
};

export default Card;
