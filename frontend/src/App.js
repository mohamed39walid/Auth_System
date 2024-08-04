import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Login";
import Products from "./Component/Products";
import ProtectedRoute from "./Component/ProtectedRoute";
import Logout from "./Component/Logout";
import Home from "./Component/Home";
import Register from "./Component/Register";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/products" element={<ProtectedRoute> <Products /> </ProtectedRoute>}/>
      <Route path="/logout" element={<Logout/>} />
      
    </Routes>
  );
}

export default App;
