import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Header from './component/layout/Header/Header.jsx';
import Footer from './component/layout/Footer/Footer.jsx';
import About from './component/layout/About/About.jsx';
import Contact from './component/layout/Contact/Contact.jsx';
import NotFound from './component/layout/Not Found/NotFound.jsx';

import Home from './component/Home/Home.jsx';
import ProductDetails from './component/Product/ProductDetails.jsx';
import Products from './component/Product/Products.jsx';
import Search from './component/Product/Search.jsx';
import LoginSignUp from './component/User/LoginSignup.jsx';
import Profile from './component/User/Profile.jsx';
import UpdateProfile from './component/User/UpdateProfile.jsx';
import UpdatePassword from './component/User/UpdatePassword.jsx';
import ForgotPassword from './component/User/ForgotPassword.jsx';
import ResetPassword from './component/User/ResetPassword.jsx';
import Cart from './component/Cart/Cart.jsx';
import Shipping from './component/Cart/Shipping.jsx';
import ConfirmOrder from './component/Cart/ConfirmOrder.jsx';
import Payment from './component/Cart/Payment.jsx';
import OrderSuccess from './component/Cart/OrderSuccess.jsx';
import MyOrders from './component/Order/MyOrder.jsx';
import OrderDetails from './component/Order/OrderDetails.jsx';
import ProtectedRoute from './component/Routes/ProtectedRoute.jsx';
import AdminRoute from './component/Routes/AdminRoute.jsx';
import Dashboard from './component/Admin/Dashboard.jsx';
import UsersList from './component/Admin/UserList.jsx';
import OrderList from './component/Admin/OrderList.jsx';
import ProductList from './component/Admin/ProductList.jsx';
import ProductReviews from './component/Admin/ProductReviews.jsx';
import NewProduct from './component/Admin/NewProduct.jsx';
import UpdateUser from './component/Admin/UpdateUser.jsx';
import ProcessOrder from './component/Admin/ProcessOrder.jsx';
import UpdateProduct from './component/Admin/UpdateProducts.jsx';
import UserOptions from './component/layout/Header/UserOptions.jsx';
import { loadUser } from './slices/userSlice.js';
import { store } from './store.js';
import { useEffect } from 'react';

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/process/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UsersList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrderList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <AdminRoute>
              <ProductReviews />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminRoute>
              <NewProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <AdminRoute>
              <UpdateUser />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <AdminRoute>
              <ProcessOrder />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
