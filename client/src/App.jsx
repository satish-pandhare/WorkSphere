import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./pages/Main";
import Users from "./pages/Users";
import NavBar from "./components/NavBar";
import UserProfile from "./components/UserProfile";

import UserDashBoard from "./pages/UserDashBoard";
import LoginPage from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import UserDashboardWorks from "./components/UserDashboardWorks";
import UserDashboardReviews from "./components/UserDashboardReviews";
import UserSettings from "./components/UserDashBoardSettings";
import FindWork from "./pages/FindWork";
import ClientDashBoard from "./pages/ClientDashBoard";
import AdminDashboard from "./components/AdminDashboard";
import AdminUsers from "./components/AdminUsers";
import AdminJobs from "./components/AdminJobs"; // Import Jobs component
import AdminAnalytics from "./components/AdminAnalytics";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

// Create a PrivateRoute component to protect dashboard routes
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
  }

  return isAuthenticated ? children : <LoginPage />;
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/users"
              element={
                <PrivateRoute>
                  <AdminUsers />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/jobs"
              element={
                <PrivateRoute>
                  <AdminJobs />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/analytics"
              element={
                <PrivateRoute>
                  <AdminAnalytics />
                </PrivateRoute>
              }
            />
            {/* <NavBar /> */}

            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protect this route with PrivateRoute */}
            <Route
              path="/user/dashboard"
              element={
                <PrivateRoute>
                  <UserDashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard/applications"
              element={
                <PrivateRoute>
                  <UserDashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard/works"
              element={
                <PrivateRoute>
                  <UserDashboardWorks />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard/reviews"
              element={
                <PrivateRoute>
                  <UserDashboardReviews />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard/settings"
              element={
                <PrivateRoute>
                  <UserSettings />
                </PrivateRoute>
              }
            />
            <Route path="/client/dashboard" element={<ClientDashBoard />} />
            <Route path="/works" element={<FindWork />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/freelancers" element={<Users />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
