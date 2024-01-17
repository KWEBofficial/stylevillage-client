import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Card, Chip, Divider, MenuItem, Select, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { StatusEnums } from '../../models/enum';
import { createWishAPICall, deleteWishAPICall } from '../../hooks/api/wish/wish';
import {
  GetClothesResponse,
  deleteClothesAPICall,
  editClothesAPICall,
  getClothesAPICall,
} from '../../hooks/api/clothes/clothes';
import WishBtn from '../../components/WishBtn';
import StatusSign from '../../components/StatusSign';
import ConfirmDialog from '../../components/ConfirmDialog';
import CancelSubmitBtns from '../../components/CancelSubmitBtn';
import ApplyBtn from '../../components/ApplyBtn';

// TODO: 사용자 페이지 링크 추가
export function ClothesPage() {
  const { id } = useParams();
  const clothesId = Number(id);
  const userId = Number(sessionStorage.getItem('userId'));
  const token = sessionStorage.getItem('accessToken') ?? '';
  const [isWish, setIsWish] = useState(false);

  const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);

  const [clothes, setClothes] = useState<GetClothesResponse | null>(null);
  const getClothes = async () => {
    try {
      const result = await getClothesAPICall({ clothesId, token });
      setClothes(result);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    getClothes();
  }, [clothesId]);
  useEffect(() => {
    if (clothes) {
      setIsWish(clothes?.isWished ?? false);
    }
  }, [clothes]);
  const isMyClothes = userId === clothes?.owner.id;

  const handleEdit = () => {};
  const handleDeleteBtnClick = () => {
    setConfirmDialogIsOpen(true);
  };
  const handleDelete = () => {
    deleteClothesAPICall({ clothesId, token });
    setConfirmDialogIsOpen(false);
  };
  const handleCancel = () => {
    setConfirmDialogIsOpen(false);
  };
  const handleWish = async () => {
    try {
      if (isWish) {
        await deleteWishAPICall({ clothesId, token });
      } else {
        await createWishAPICall({ clothesId, token });
      }
      setIsWish(!isWish);
    } catch (error) {
      //
    }
  };
  const handleStatusChange = async (value: string) => {
    try {
      await editClothesAPICall({
        clothesId,
        token,
        clothes: {
          category: clothes?.category || '',
          season: clothes?.season || '',
          status: value,
          isOpen: clothes?.isOpen || false,
          name: clothes?.name || '',
          tag: clothes?.tag || '',
        },
      });
      getClothes();
    } catch (error) {
      //
    }
  };
  const handleIsOpenChange = async (value: string) => {
    try {
      await editClothesAPICall({
        clothesId,
        token,
        clothes: {
          category: clothes?.category || '',
          season: clothes?.season || '',
          status: clothes?.status || '',
          isOpen: value === 'true',
          name: clothes?.name || '',
          tag: clothes?.tag || '',
        },
      });
      getClothes();
    } catch (error) {
      //
    }
  };

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box display={'flex'} sx={{ mt: 4, ml: 7 }} alignItems={'flex-start'}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            {clothes?.image ? (
              <Box
                component="img"
                sx={{
                  width: 250,
                  borderRadius: 10,
                  mb: 2,
                }}
                src={clothes.image}
              />
            ) : (
              <Box
                sx={{
                  backgroundColor: '#D9D9D9',
                  width: 250,
                  height: 300,
                  borderRadius: 10,
                  mb: 2,
                }}
              />
            )}
            {isMyClothes ? (
              <CancelSubmitBtns
                submitBtnText="수정"
                cancelBtnText="삭제"
                handleSubmit={handleEdit}
                handleCancel={handleDeleteBtnClick}
              />
            ) : (
              <ApplyBtn status={clothes?.status ?? ''} />
            )}
          </Box>
          <Box sx={{ mt: 1, ml: 6 }}>
            {isMyClothes ? (
              <Box sx={{ mb: 2 }}>
                <Select
                  sx={{ mr: 1 }}
                  value={clothes?.status}
                  id="status"
                  label="status"
                  size="small"
                  onChange={(event) => handleStatusChange(event.target.value)}
                >
                  {StatusEnums.map((StatusEnum) => (
                    <MenuItem value={StatusEnum}>{StatusEnum}</MenuItem>
                  ))}
                </Select>
                <Select
                  value={clothes?.isOpen ? 'true' : 'false'}
                  id="status"
                  label="status"
                  size="small"
                  onChange={(event) => handleIsOpenChange(event.target.value)}
                >
                  <MenuItem value="true">공개</MenuItem>
                  <MenuItem value="false">비공개</MenuItem>
                </Select>
              </Box>
            ) : (
              <StatusSign status={clothes?.status || ''} />
            )}
            <Box display={'flex'} alignItems={'center'} sx={{ mt: 1 }}>
              <Typography variant="h5" fontWeight={'bold'} sx={{ mr: 2 }}>
                {clothes?.name}
              </Typography>
              <Typography sx={{ mr: 1 }}>{clothes?.category}</Typography>
              {!isMyClothes && <WishBtn isWished={isWish} handleWish={handleWish} />}
            </Box>
            {!isMyClothes && (
              <Box display={'flex'} alignItems={'center'} sx={{ mt: 1 }}>
                <Typography variant="h6" fontWeight={'bold'} sx={{ mr: 1 }}>
                  {clothes?.owner.nickname}님
                </Typography>
                <LocationOnIcon fontSize="small" sx={{ color: 'gray' }} />
                <Typography color={'gray'}>{clothes?.owner.location}</Typography>
              </Box>
            )}
            <Chip label={clothes?.season} size="small" sx={{ mt: 2 }}></Chip>
            <Card variant="outlined" sx={{ width: 500, height: 200, borderRadius: 5, padding: 2, mt: 2 }}>
              <Typography variant="h6" fontWeight={'bold'} sx={{ mb: 1 }}>
                상품정보
              </Typography>
              <Divider />
              <Typography sx={{ mt: 2 }}>{clothes?.description}</Typography>
            </Card>
            <Card variant="outlined" sx={{ width: 500, height: 200, borderRadius: 5, padding: 2, mt: 2 }}>
              <Typography variant="h6" fontWeight={'bold'} sx={{ mb: 1 }}>
                리뷰
              </Typography>
              <Divider />
              {clothes?.review.map((review) => (
                <Typography sx={{ mt: 2 }}>
                  {review.reviewer.nickname} | {review.review}
                </Typography>
              ))}
            </Card>
          </Box>
        </Box>
      </Box>
      <ConfirmDialog
        isOpen={confirmDialogIsOpen}
        message="정말 삭제하시겠습니까?"
        handleSubmit={handleDelete}
        handleCancel={handleCancel}
      />
    </>
  );
}
