import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import JobDetails from "./pages/JobDetails";
import ApplicationsTracker from "./pages/ApplicationsTracker";
import AdminDashboard from "./pages/AdminDashboard";
import JobMatchExplain from "./pages/JobMatchExplain";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  
  return children;
};

const RootRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;
  if (user) {
    return user.role === 'admin' ? <Navigate to="/admin-dashboard" /> : <Navigate to="/applicant-dashboard" />;
  }
  return <Landing />;
};

const LoginRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;
  if (user) {
    return user.role === 'admin' ? <Navigate to="/admin-dashboard" /> : <Navigate to="/applicant-dashboard" />;
  }
  return <Login />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-950 font-sans text-gray-100 flex flex-col selection:bg-blue-500/30">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<RootRoute />} />
              <Route path="/login" element={<LoginRoute />} />
              
              {/* Applicant Routes */}
              <Route path="/applicant-dashboard" element={
                <ProtectedRoute role="applicant">
                  <ApplicantDashboard />
                </ProtectedRoute>
              } />
              <Route path="/job/:id" element={
                <ProtectedRoute role="applicant">
                  <JobDetails />
                </ProtectedRoute>
              } />
              <Route path="/match-analysis/:id" element={
                <ProtectedRoute role="applicant">
                  <JobMatchExplain />
                </ProtectedRoute>
              } />
              <Route path="/my-applications" element={
                <ProtectedRoute role="applicant">
                  <ApplicationsTracker />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin-dashboard" element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
