import { Route, Routes } from 'react-router-dom';

import { RegisterPage } from '../pages/Register';
import { ProfilePage } from '../pages/Profile';
import MyPageWish from '../pages/Mypage/wish';
import MyPageLend from '../pages/Mypage/lend';
import MyPageCloset from '../pages/Mypage/closet';
import MyPageApply from '../pages/Mypage/apply';
import { MainPage } from '../pages/Main';
import { LoginPage } from '../pages/Login';
import { ClothesPage } from '../pages/Clothes';

/**
 * 어느 url에 어떤 페이지를 보여줄지 정해주는 컴포넌트입니다.
 * Routes 안에 Route 컴포넌트를 넣어서 사용합니다.
 */
export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/clothes/:id" element={<ClothesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/mypage/closet" element={<MyPageCloset />} />
      <Route path="/mypage/apply" element={<MyPageApply />} />
      <Route path="/mypage/lend" element={<MyPageLend />} />
      <Route path="/mypage/wish" element={<MyPageWish />} />
    </Routes>
  );
}
