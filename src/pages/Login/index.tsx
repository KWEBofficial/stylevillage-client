import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

export function LoginPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    username: null,
    password: null,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setValues(newValues);
  };
  async function Login() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, values);
      if (response.status === 200) {
        const { accessToken } = response.data;
        sessionStorage.setItem('accessToken', accessToken);
        navigate('/');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        enqueueSnackbar(err.response?.data?.message ?? '로그인에 실패했어요 :(', { variant: 'error' });
      } else {
        enqueueSnackbar('로그인에 실패했어요 :(', { variant: 'error' });
      }
    }
  }
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    Login();
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
            StyleVillage에
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            로그인하세요
          </Typography>
        </Box>
        <TextField
          id="username"
          name="username"
          type="username"
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
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 2, width: 120, borderRadius: 100, backgroundColor: 'black' }}
        >
          로그인
        </Button>
        <Typography component={Link} to="/register" sx={{ marginTop: 1.5, color: 'black', textDecoration: 'none' }}>
          회원이 아니신가요?
        </Typography>
      </Box>
    </Box>
  );
}