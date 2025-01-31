import React, { useEffect, Suspense, lazy, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LazyLoaderBlue from "./components/Loader/LazyLoaderBlue";
import LazyLoaderRed from "./components/Loader/LazyLoaderRed";

const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const StudentHome = lazy(() => import("./pages/StudentHome"));
const InstructorPage = lazy(() => import("./pages/InstructorPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const HomePage = lazy(() => import("./pages/HomePage"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LazyLoaderBlue />}>
        {isLoading ? (
          <LazyLoaderBlue />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage onLoad={handleImageLoad} />} />
            <Route
              path="/signup"
              element={<Signup onLoad={handleImageLoad} />}
            />
            <Route path="/login" element={<Login onLoad={handleImageLoad} />} />
            <Route
              path="/student-home"
              element={
                <PrivateRoute>
                  <StudentHome onLoad={handleImageLoad} />
                </PrivateRoute>
              }
            />
            <Route
              path="/instructor-home"
              element={
                <PrivateRoute>
                  <InstructorPage onLoad={handleImageLoad} />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboardadmin"
              element={
                <PrivateRoute>
                  <Dashboard onLoad={handleImageLoad} />
                </PrivateRoute>
              }
            />
          </Routes>
        )}
      </Suspense>
    </Router>
  );
}

export default App;
