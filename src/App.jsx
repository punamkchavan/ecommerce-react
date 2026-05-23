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
const LoginSignUp = () => <div>LoginSignUp</div>;
const Profile = () => <div>Profile</div>;
const UpdateProfile = () => <div>UpdateProfile</div>;
const UpdatePassword = () => <div>UpdatePassword</div>;
const ForgotPassword = () => <div>ForgotPassword</div>;
const ResetPassword = () => <div>ResetPassword</div>;
const Cart = () => <div>Cart</div>;
const Shipping = () => <div>Shipping</div>;
const ConfirmOrder = () => <div>ConfirmOrder</div>;
const Payment = () => <div>Payment</div>;
const OrderSuccess = () => <div>OrderSuccess</div>;
const MyOrders = () => <div>MyOrders</div>;
const OrderDetails = () => <div>OrderDetails</div>;
const Dashboard = () => <div>Dashboard</div>;
const UsersList = () => <div>UsersList</div>;
const OrderList = () => <div>OrderList</div>;
const ProductList = () => <div>ProductList</div>;
const ProductReviews = () => <div>ProductReviews</div>;
const NewProduct = () => <div>NewProduct</div>;
const UpdateUser = () => <div>UpdateUser</div>;
const ProcessOrder = () => <div>ProcessOrder</div>;
const UpdateProduct = () => <div>UpdateProduct</div>;

const ProtectedRoute = ({ children }) => children;
const AdminRoute = ({ children }) => children;
const UserOptions = () => null;

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

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
