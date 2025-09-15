import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './theme/theme';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Dashboard Pages
import DashboardLayout from './components/layout/DashboardLayout';
import ClaimsListPage from './pages/dashboard/ClaimsListPage';
import SubmitClaimPage from './pages/dashboard/SubmitClaimPage';
import ApplicationStatusPage from './pages/dashboard/ApplicationStatusPage';
import FAQsPage from './pages/dashboard/FAQsPage';

import NotFound from './pages/NotFound';
import ClaimTablePage from './pages/dashboard/ClaimTablePage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              
              {/* Protected Dashboard Routes */}
              <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<ClaimsListPage />} />
                <Route path="claims-table" element={<ClaimTablePage />} />
                <Route path="submit-claim" element={<SubmitClaimPage />} />
                <Route path="status" element={<ApplicationStatusPage />} />
                <Route path="faqs" element={<FAQsPage />} />
              </Route>
              
              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;