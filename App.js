import { Routes, Route } from "react-router-dom";
import Header from "./NavbarComponent/Header";

import HomePage       from "./PageComponent/HomePage";
import LoginPage      from "./UserComponent/UserLoginForm";
import RegisterPage   from "./UserComponent/UserRegister";
import ProductPage    from "./ProductComponent/Product";
import MyOrdersPage   from "./OrderComponent/ViewMyOrders";
import MyBidsPage     from "./ProductOfferComponent/MyBids";
import AdminProducts  from "./ProductComponent/AdminProducts";
import AdminCategories from "./CategoryComponent/AdminCategories";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Public Pages */}
        <Route path="/"                   element={<HomePage />} />
        <Route path="/home"               element={<HomePage />} />
        <Route path="/user/login"         element={<LoginPage />} />
        <Route path="/user/customer/register" element={<RegisterPage />} />

        {/* Category filter on home */}
        <Route path="/product/category/:categoryId/:categoryName" element={<HomePage />} />

        {/* Customer Pages */}
        <Route path="/product/:productId/category/:categoryId" element={<ProductPage />} />
        <Route path="/customer/order"     element={<MyOrdersPage />} />
        <Route path="/customer/bid/all"   element={<MyBidsPage />} />

        {/* Admin Pages */}
        <Route path="/admin/products"    element={<AdminProducts />} />
        <Route path="/admin/categories"  element={<AdminCategories />} />
      </Routes>
    </div>
  );
}

export default App;
