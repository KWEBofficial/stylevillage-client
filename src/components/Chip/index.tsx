import { useState } from 'react';
import { Button } from '@mui/material';

interface ChipProps {
  handleClick: () => void;
  label: string;
  // isSelected: boolean;
}
export default function Chip(props: ChipProps) {
  const { label } = props;
  const [isSelected, setisSelected] = useState(false);
  const handleClick = () => {
    setisSelected(!isSelected);
    props.handleClick();
  };
  return (
    <Button
      onClick={handleClick}
      sx={{
        mr: 2,
        padding: 0,
        paddingInline: 1,
        color: 'black',
        fontSize: 13,
        fontWeight: isSelected ? 'bold' : 'medium',
        backgroundColor: isSelected ? '#D9D9D9' : 'white',
        boxShadow: '0 0 0 1px black',
        borderRadius: 100,
      }}
    >
      {label}
    </Button>
  );
}
