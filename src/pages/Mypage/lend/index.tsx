import { useEffect, useState } from 'react';
import { Box, Card, Chip, Divider, MenuItem, Select, Typography } from '@mui/material';

import { GetLendsRes, GetMyLendsResponse, getLendsAPICall } from '../../../hooks/api/lend/lend';
import LendCard from '../../../components/LendCard';

interface LendInfo {
  lendId: number;
  clothesId: number;
  clothesName: string;
  clothesImage?: string;
  price: number;
  startDate: Date;
  endDate: Date;
  lenderName: string;
  lenderNickName?: string;
  loaneeName: string;
  loaneeNickName?: string;
  review?: string;
}

interface LendCardProps {
  isLoanee: boolean;
  lendInfo: LendInfo;
}

export function LendListMyPage() {
  const userId = Number(sessionStorage.getItem('userId'));
  const token = sessionStorage.getItem('accessToken') ?? '';

  const emptyLendsArray: GetLendsRes[] = [];
  const [lends, setLends] = useState<GetMyLendsResponse | null>();
  const [lendsAsLender, setLendsAsLender] = useState<GetLendsRes[]>();
  const [lendsAsLoanee, setLendsAsLoanee] = useState<GetLendsRes[]>();
  const [asLenderCards, setAsLenderCards] = useState<JSX.Element | JSX.Element[]>();
  const [asLoaneeCards, setAsLoaneeCards] = useState<JSX.Element | JSX.Element[]>();

  const getLendList = async () => {
    try {
      const result = await getLendsAPICall(token);
      setLends(result);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    getLendList();
  }, []);
  useEffect(() => {
    setLendsAsLender(lends?.lendsAsLender ?? emptyLendsArray);
    setLendsAsLoanee(lends?.lendsAsLoanee ?? emptyLendsArray);
  }, [lends]);

  const getAsLenderCards = () => {
    if (lendsAsLender && lendsAsLender.length > 0)
      return lendsAsLender.map((lend) => {
        const lendInfo: LendInfo = {
          lendId: lend.id || 0,
          clothesId: lend.clothes.id || 0,
          clothesName: lend.clothes.name,
          clothesImage: lend.clothes.image,
          price: lend.price,
          startDate: lend.startDate,
          endDate: lend.endDate,
          lenderName: lend.lender.username,
          lenderNickName: lend.lender.nickname,
          loaneeName: lend.loanee.username,
          loaneeNickName: lend.loanee.nickname,
          review: lend.review,
        };
        return <LendCard key={lendInfo.lendId} isLoanee={false} lendInfo={lendInfo} />;
      });
    return <Typography>아직 빌려준 옷이 없어요</Typography>;
  };
  useEffect(() => {
    const cards: JSX.Element | JSX.Element[] = getAsLenderCards();
    setAsLenderCards(cards);
  }, [lendsAsLender]);
  const getAsLoaneeCards = () => {
    if (lendsAsLender && lendsAsLender.length > 0)
      return lendsAsLender.map((lend) => {
        const lendInfo: LendInfo = {
          lendId: lend.id || 0,
          clothesId: lend.clothes.id || 0,
          clothesName: lend.clothes.name,
          clothesImage: lend.clothes.image,
          price: lend.price,
          startDate: lend.startDate,
          endDate: lend.endDate,
          lenderName: lend.lender.username,
          lenderNickName: lend.lender.nickname,
          loaneeName: lend.loanee.username,
          loaneeNickName: lend.loanee.nickname,
          review: lend.review,
        };
        return <LendCard key={lendInfo.lendId} isLoanee={true} lendInfo={lendInfo} />;
      });
    return <Typography>아직 빌린 옷이 없어요</Typography>;
  };
  useEffect(() => {
    const cards: JSX.Element | JSX.Element[] = getAsLoaneeCards();
    setAsLoaneeCards(cards);
  }, [lendsAsLoanee]);

  return (
    <>
      <Box>
        <Typography width="100%" sx={{ textAlign: 'center' }}>
          내가 빌렸어요
        </Typography>
        <Box width="100%">{asLenderCards}</Box>
      </Box>
      <Box>
        <Typography width="100%" sx={{ textAlign: 'center' }}>
          내가 빌려줬어요
        </Typography>
        <Box width="100%">{asLoaneeCards}</Box>
      </Box>
    </>
  );
}