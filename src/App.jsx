import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Followups from './pages/Followups';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Login from './pages/Login';
import BudgetPage from './pages/BudgetPage';
import Clients from './pages/Clients';
import Users from './pages/Users';
import Organization from './pages/Organization';
import Roles from './pages/Roles';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, permission }) => {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (permission && !hasPermission(permission)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const InitialRedirect = () => {
  const { user, hasPermission } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const modules = [
    'Dashboard', 'Leads', 'Followups', 'Budgets', 'Clients', 'Reports', 'Organization', 'Users', 'Roles'
  ];

  const firstAllowed = modules.find(m => hasPermission(m));

  if (firstAllowed) {
    return <Navigate to={`/${firstAllowed.toLowerCase()}`} replace />;
  }

  // Fallback if somehow no permissions
  return <Box sx={{ p: 4 }}>No access granted. Contact administrator.</Box>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<InitialRedirect />} />
            <Route path="dashboard" element={
              <ProtectedRoute permission="Dashboard">
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="leads" element={
              <ProtectedRoute permission="Leads">
                <Leads />
              </ProtectedRoute>
            } />
            <Route path="followups" element={
              <ProtectedRoute permission="Followups">
                <Followups />
              </ProtectedRoute>
            } />
            <Route path="budgets" element={
              <ProtectedRoute permission="Budgets">
                <BudgetPage />
              </ProtectedRoute>
            } />
            <Route path="clients" element={
              <ProtectedRoute permission="Clients">
                <Clients />
              </ProtectedRoute>
            } />
            <Route path="users" element={
              <ProtectedRoute permission="Users">
                <Users />
              </ProtectedRoute>
            } />
            <Route path="organization" element={
              <ProtectedRoute permission="Organization">
                <Organization />
              </ProtectedRoute>
            } />
            <Route path="roles" element={
              <ProtectedRoute permission="Roles">
                <Roles />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
