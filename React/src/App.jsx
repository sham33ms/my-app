import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import SharedLayout from "./components/SharedLayout";
import ProductCreate from "./pages/ProductCreate";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login Page */}
        
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Only Accessible If Token Exists) */}
        <Route element={<SharedLayout />}>
          <Route path="/" element={<ProductCreate />} />
          <Route path="/products" element={<ProductList />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
