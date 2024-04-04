import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  DashboardPage,
  LoginPage,
  UsersPage,
  RoomsPage,
  DevicesPage,
  ScenesPage,
  ReportsPage,
  EnergyConsumptionPage,
  IntegrationsPage,
} from "./pages";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { AuthProvider } from "./providers/AuthProvider";

const App: React.FC = () => {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/devices" element={<DevicesPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/scenes" element={<ScenesPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route
                path="/energy-consumption"
                element={<EnergyConsumptionPage />}
              />
              <Route path="/integrations" element={<IntegrationsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
