import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import IncidentListPage from "./pages/IncidentListPage.jsx";
import IncidentFormPage from "./pages/IncidentFormPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import MyProfilePage from "./pages/MyProfilePage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import IncidentDetailPage from "./pages/IncidentDetailPage.jsx";


export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MyProfilePage />
              </ProtectedRoute>
            }
          />

         


          <Route
            path="/incidents"
            element={
              <ProtectedRoute>
                <IncidentListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/incidents/new"
            element={
              <ProtectedRoute>
                <IncidentFormPage mode="create" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/incidents/:id/edit"
            element={
              <ProtectedRoute>
                <IncidentFormPage mode="edit" />
              </ProtectedRoute>
            }
          />

          <Route
  path="/incidents/:id/view"
  element={
    <ProtectedRoute>
      <IncidentDetailPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/users"
  element={
    <ProtectedRoute>
      <UsersPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/users/:id"
  element={
    <ProtectedRoute>
      <UserProfilePage />
    </ProtectedRoute>
  }

  
/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}