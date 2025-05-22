import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Product from "./components/Users/Products/Product";
import OrderPayment from "./components/Users/Products/OrderPayment";
import ShoppingCart from "./components/Users/Products/ShoppingCart";
import ThanksForOrdering from "./components/Users/Products/ThanksForOrdering";
import Login from "./components/Users/Forms/Login";
import RegisterForm from "./components/Users/Forms/RegisterForm";
import Products from "./components/Users/Products/Products";
import Accessories from "./components/Users/Accessories/Accessories";
import Accessory from "./components/Users/Accessories/Accessory";
import Articles from "./components/Users/Articles/Articles";
import Article from "./components/Users/Articles/Article";
import CategoryToAdd from "./components/Users/Profile/CustomerProfile";
import RequestGem from "./components/Users/Forms/RequestGem";
import MyRequests from "./components/Users/Profile/MyRequests";
import ManageRequests from "./components/Admin/gemRequests/ManageRequests";


// Admin Components
import AdminDashboard from "./components/Admin/AdminDashboard";
import DashboardOverview from "./components/Admin/DashboardOverview";
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
import ManageOrders from "./components/Admin/Orders/ManageOrders";
import Customers from "./components/Admin/Customers/Customers";
import CustomerProfile from "./components/Users/Profile/CustomerProfile";

import AdminRoute from "./components/AuthRoute/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/accessories/:id" element={<Accessory />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/order-payment" element={<OrderPayment />} />
        <Route path="/thanks" element={<ThanksForOrdering />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/gem-request" element={<RequestGem />} />
        <Route path="/my-requests" element={<MyRequests />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route index element={<DashboardOverview />} />

          {/* Products */}
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="products/edit/:id" element={<UpdateProduct />} />

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

          {/* Requests */}
          <Route
            path="/admin/manage-requests"
            element={
              <AdminRoute>
                <ManageRequests />
              </AdminRoute>
            }
          />

          {/* Orders & Customers */}
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
