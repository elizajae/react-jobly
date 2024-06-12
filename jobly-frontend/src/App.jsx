import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { RouteGuard } from "./components/RouteGuard";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Companies } from "./pages/Companies";
import { Company } from "./pages/Company";
import { useEffect } from "react";
import { JoblyApi } from "./lib/api";
import { Jobs } from "./pages/Jobs";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("JOBLY_TOKEN");
    if (token) {
      JoblyApi.startup(token);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/companies"
        element={
          <RouteGuard guardRoute>
            <Layout>
              <Companies />
            </Layout>
          </RouteGuard>
        }
      />
      <Route
        path="/companies/:handle"
        element={
          <RouteGuard guardRoute>
            <Layout>
              <Company />
            </Layout>
          </RouteGuard>
        }
      />
      <Route
        path="/jobs"
        element={
          <RouteGuard guardRoute>
            <Layout>
              <Jobs />
            </Layout>
          </RouteGuard>
        }
      />
      <Route
        path="/login"
        element={
          <RouteGuard>
            <Layout>
              <Login />
            </Layout>
          </RouteGuard>
        }
      />
      <Route
        path="/signup"
        element={
          <RouteGuard>
            <Layout>
              <Signup />
            </Layout>
          </RouteGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <RouteGuard guardRoute>
            <Layout>
              <Profile />
            </Layout>
          </RouteGuard>
        }
      />
      <Route
        path="/logout"
        element={
          <RouteGuard guardRoute>
            <Logout />
          </RouteGuard>
        }
      />
    </Routes>
  );
}

export default App;
