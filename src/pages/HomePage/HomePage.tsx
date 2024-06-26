import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/HomePage/Header';
const HomePage = () => {
  const navigate = useNavigate();
  // Firstly check if the user is logged in.
  const checkIfHasTokens = () => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    if (access_token && refresh_token) {
      return true;
    } else {
      return false;
    }
  };

  checkIfHasTokens();
  useEffect(() => {
    const tokens = checkIfHasTokens();
    if (tokens) {
      //
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Header />
    </>
  );
};

export default HomePage;
