import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { ProfilePage } from '../Profile';

// import MyWishesPage from './myWishes';
// import MyLendsPage from './myLends';
// import MyClosetsPage from './myClosets';
// import MyApplysPage from './myApplys';

type PageType = 'profile' | 'closets' | 'applies' | 'lends' | 'wishes';

export default function MyPage() {
  const [currentPage, setCurrentPage] = useState<PageType | null>(null);
  const nickname = sessionStorage.getItem('userNickname');

  const handleButtonClick = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (currentPage === 'profile') {
      return <ProfilePage />;
    }
    // if (currentPage === 'closets') {
    //   return <MyClosetsPage />;
    // }
    // if (currentPage === 'applies') {
    //   return <MyApplysPage />;
    // }
    // if (currentPage === 'lends') {
    //   return <MyLendsPage />;
    // }
    // if (currentPage === 'wishes') {
    //   return <MyWishesPage />;
    // }
    return null;
  };

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} justifyContent="center">
        <Box sx={{ width: '100%', bgcolor: '#E6E6E6' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', ml: 10, mt: 5 }}>
            <Typography variant="h3" sx={{ p: 2, fontWeight: 'bold' }}>
              마이페이지
            </Typography>
            <Button
              onClick={() => handleButtonClick('profile')}
              sx={{
                mt: 3,
                color: 'black',
                fontSize: 15,
              }}
            >
              내 정보 수정하기
            </Button>
          </Box>
          <Typography variant="body1" sx={{ ml: 12, fontweight: 'bold' }}>
            {nickname}님의 대여 내역을 확인할 수 있습니다.
          </Typography>
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Button
              onClick={() => handleButtonClick('closets')}
              sx={{
                mb: 2,
                mr: 17,
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold',
              }}
            >
              내 옷장
            </Button>
            <Button
              onClick={() => handleButtonClick('applies')}
              sx={{
                mb: 2,
                mr: 17,
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold',
              }}
            >
              대여 신청 내역
            </Button>
            <Button
              onClick={() => handleButtonClick('lends')}
              sx={{
                mb: 2,
                mr: 17,
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold',
              }}
            >
              대여 내역
            </Button>
            <Button
              onClick={() => handleButtonClick('wishes')}
              sx={{
                mb: 2,
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold',
              }}
            >
              찜한 옷
            </Button>
          </Box>
        </Box>
        {renderPage()}
      </Box>
    </>
  );
}
