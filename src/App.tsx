import { ThemeProvider } from '@/components/theme-provider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import Register from '../src/pages/Register/Register';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Activities from './pages/Activities/Activities';
import Teams from './pages/Teams/Teams';
import CornerButtons from './components/CornerButtons';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <CornerButtons />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
