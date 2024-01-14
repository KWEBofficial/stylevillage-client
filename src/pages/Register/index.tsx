import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';

export function RegisterPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    username: null,
    password: null,
    confirmPassword: null,
    nickname: null,
    gender: null,
    location: null,
    phoneNumber: null,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setValues(newValues);
  };

  async function Register() {
    try {
      if (values.password !== values.confirmPassword) {
        enqueueSnackbar('비밀번호가 일치하지 않습니다.', { variant: 'error' });
        return;
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, values);
      if (response.status === 200) {
        enqueueSnackbar('회원가입에 성공하셨습니다.', { variant: 'success' });
        navigate('/login');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        enqueueSnackbar(err.response?.data?.message ?? '회원가입에 실패하셨습니다.', { variant: 'error' });
      } else {
        enqueueSnackbar('회원가입에 실패하셨습니다.', { variant: 'error' });
      }
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    Register();
  };

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box
        component="form"
        width={300}
        marginTop={15}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { margin: 1 },
        }}
        onSubmit={handleSubmit}
      >
        <Box marginBottom={1} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            StyleVillage의
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            회원이 되어주세요
          </Typography>
        </Box>
        <TextField
          id="username"
          name="username"
          type="text"
          label="아이디"
          size="small"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="비밀번호"
          size="small"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="비밀번호 확인"
          size="small"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="nickname"
          name="nickname"
          type="text"
          label="닉네임"
          size="small"
          fullWidth
          onChange={handleChange}
        />
        <TextField id="gender" name="gender" select label="성별" size="small" fullWidth onChange={handleChange}>
          <MenuItem value="남성">남성</MenuItem>
          <MenuItem value="여성">여성</MenuItem>
        </TextField>
        <TextField id="location" name="location" select label="거주지" size="small" fullWidth onChange={handleChange}>
          <MenuItem value="서울">서울</MenuItem>
          <MenuItem value="인천">인천</MenuItem>
          <MenuItem value="대전">대전</MenuItem>
          <MenuItem value="부산">부산</MenuItem>
          <MenuItem value="대구">대구</MenuItem>
          <MenuItem value="광주">광주</MenuItem>
          <MenuItem value="세종">세종</MenuItem>
          <MenuItem value="울산">울산</MenuItem>
        </TextField>
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          label="전화번호"
          size="small"
          fullWidth
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 2, width: 120, borderRadius: 100, backgroundColor: 'black' }}
        >
          회원가입
        </Button>
        <Typography component={Link} to="/login" sx={{ marginTop: 1.5, color: 'black', textDecoration: 'none' }}>
          이미 회원이신가요?
        </Typography>
      </Box>
    </Box>
  );
}
