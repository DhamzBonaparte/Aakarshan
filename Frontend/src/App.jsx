import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Catalog } from "./Pages/Catalog";
import { OrderForm } from "./Pages/OrderForm";
import { Contact } from "./Pages/Contact";
import { CheckoutPage } from "./Pages/Checkout";
import AdminLogin from "./Components/AdminLogin";
import { Admin } from "./Pages/Admin";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route path="/custom" element={<OrderForm />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/admin-login" element={<AdminLogin />}></Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
