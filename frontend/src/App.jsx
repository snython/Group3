// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import IncidentListPage from "./pages/IncidentListPage.jsx";
import IncidentFormPage from "./pages/IncidentFormPage.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/incidents"
            element={
              <ProtectedRoute>
                <IncidentListPage />
              </ProtectedRoute>
            }
          />

          {/* CREATE */}
          <Route
            path="/incidents/new"
            element={
              <ProtectedRoute>
                <IncidentFormPage mode="create" />
              </ProtectedRoute>
            }
          />

          {/* EDIT */}
          <Route
            path="/incidents/:id/edit"
            element={
              <ProtectedRoute>
                <IncidentFormPage mode="edit" />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/incidents" />} />
        </Routes>
      </main>
    </div>
  );
}