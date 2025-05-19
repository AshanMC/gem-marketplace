import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Product from "./components/Users/Products/Product"; // Product details
import OrderPayment from "./components/Users/Products/OrderPayment";
import ShoppingCart from "./components/Users/Products/ShoppingCart";
import ThanksForOrdering from "./components/Users/Products/ThanksForOrdering";
import Login from "./components/Users/Forms/Login";
import RegisterForm from "./components/Users/Forms/RegisterForm";
import Products from "./components/Users/Products/Products.js";
import ProductsPage from "./components/Users/Products/Products";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminRoute from "./components/AuthRoute/AdminRoute.js"
import Accessories from "./components/Users/Accessories/Accessories.js";
import Accessory from "./components/Users/Accessories/Accessory";

// Admin Components
import AddProduct from "./components/Admin/Products/AddProduct";
import ManageProducts from "./components/Admin/Products/ManageProducts";
import UpdateProduct from "./components/Admin/Products/UpdateProduct";

import AddArticle from "./components/Admin/Articles/addArticle";
import ManageArticles from "./components/Admin/Articles/ManageArticles";
import UpdateArticle from "./components/Admin/Articles/UpdateArticle";

import AddAccessory from "./components/Admin/Accessory/AddAccessory";
import ManageAccessories from "./components/Admin/Accessory/ManageAccessories";
import UpdateAccessory from "./components/Admin/Accessory/UpdateAccessory";

import AddCategory from "./components/Admin/Categories/AddCategory";
import ManageCategories from "./components/Admin/Categories/ManageCategories";
import UpdateCategory from "./components/Admin/Categories/UpdateCategory";
import CategoryToAdd from "./components/Admin/Categories/CategoryToAdd";

import ManageOrders from "./components/Admin/Orders/ManageOrders";
import Customers from "./components/Admin/Customers/Customers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/accessories/:id" element={<Accessory />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products-filters" element={<Products />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/order-payment" element={<OrderPayment />} />
        <Route path="/thanks" element={<ThanksForOrdering />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* ✅ Admin Routes */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          {/* Products */}
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="edit-product/:id" element={<UpdateProduct />} />

          {/* Articles */}
          <Route path="add-article" element={<AddArticle />} />
          <Route path="manage-articles" element={<ManageArticles />} />
          <Route path="edit-article/:id" element={<UpdateArticle />} />

          {/* Accessories */}
          <Route path="add-accessory" element={<AddAccessory />} />
          <Route path="manage-accessories" element={<ManageAccessories />} />
          <Route path="edit-accessory/:id" element={<UpdateAccessory />} />

          {/* Categories */}
          <Route path="category-to-add" element={<CategoryToAdd />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="manage-category" element={<ManageCategories />} />
          <Route path="edit-category/:id" element={<UpdateCategory />} />

          {/* Orders & Customers */}
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
