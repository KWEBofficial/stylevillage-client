import { Box, Typography } from '@mui/material';

import Chip from '../Chip';
import { GroupItem } from '../../models/item';

interface CategoryChipsProps {
  // handleGroupClick: (group: string, label: string, isSelected: boolean) => void; // 아이템 별 isselected 정보를 바꿔주는?
  group: string;
  items: GroupItem[];
}

export default function CategoryChips(props: CategoryChipsProps) {
  const { group, items } = props;
  // const handleClick = (label: string, isSelected: boolean) => {
  //   props.handlegroupClick(category, label, isSelected);
  // };
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
        <Chip key={index} handleClick={item.handleClick} label={item.label} />
      ))}
    </Box>
  );
}
