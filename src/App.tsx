import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Workers from "./pages/Workers";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Attendance from "./pages/Attendance";
import Payslips from "./pages/Payslips";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "manager", "worker"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workers"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <Workers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <Payments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payslips"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "manager", "worker"]}
            >
              <Payslips />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "manager", "worker"]}
            >
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "manager", "worker"]}
            >
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;