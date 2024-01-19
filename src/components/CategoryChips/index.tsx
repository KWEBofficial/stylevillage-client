import { Box, Typography } from '@mui/material';

import Chip from '../Chip';
import { GroupItem } from '../../models/item';

interface CategoryChipsProps {
  handleGroupClick: (e: React.FormEventHandler<HTMLFormElement>, a: string, b: string[]) => void;
  group: string;
  items: string[];
  selected: string[];
}

export default function CategoryChips(props: CategoryChipsProps) {
  const { group, items, handleGroupClick, selected } = props;
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      sx={{
        mt: 1,
        backgroundColor: 'none',
        wrap: 'nowrap',
      }}
    >
      <Typography variant="h6" sx={{ width: '70px', mr: 1.5, fontSize: 17, fontWeight: 'bold' }}>
        {group}
      </Typography>
      {items.map((item, index) => (
        <Chip key={index} handleClick={handleGroupClick(group, item)} label={item} selected={selected} />
      ))}
    </Box>
  );
}
