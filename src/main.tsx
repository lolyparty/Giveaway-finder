import { StrictMode, type ReactNode } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Header from "./components/header";
// import { useStore } from "./store/useStore";

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // const user = useStore.getState().user;
  const user = true;
  return user ? children : <Navigate to="/" />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Header />
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
