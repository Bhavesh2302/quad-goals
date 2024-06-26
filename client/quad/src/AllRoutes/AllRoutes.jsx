import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../Components/Footer";
import AllRestaurants from "../Pages/AllRestaurants";
import Home from "../Pages/Home";
import SingleRestaurant from "../Pages/SingleRestaurant";
import RestOwnerSignup from "../Pages/RestOwnerSignup";
import Cart from "../Pages/Cart";
import ShopOwnerDashboard from "../Pages/ShopOwnerDashboard";
import ShopOwnerPrivateRoute from "../HOF/ShopOwnerPrivateRoute";
import { RestaurantForm } from "../Components/ShopOwnerDashComponents/RestaurantForm";
import RestaurantDetails from "../Components/ShopOwnerDashComponents/RestaurantDetails";

const AllRoutes = () => (
  <div>
    <Routes>
      <Route path={"/"} element={<Home />}></Route>
      <Route
        path={"/allrestaurants/:city"}
        element={<AllRestaurants />}
      ></Route>
      <Route
        path={"/allrestaurants/:city/:restId"}
        element={<SingleRestaurant />}
      ></Route>
      <Route path={"/restownersignup"} element={<RestOwnerSignup />}></Route>
      <Route path={"/cart"} element={<Cart />} />
      <Route
        path={"/shopownerdashboard"}
        element={
          <ShopOwnerPrivateRoute>
            <ShopOwnerDashboard />
          </ShopOwnerPrivateRoute>
        }
      />
      <Route
        path={"/shopownerdashboard/form"}
        element={
          <ShopOwnerPrivateRoute>
            <RestaurantForm />
          </ShopOwnerPrivateRoute>
        }
      />
      <Route
        path={"/restaurant-details/:restId"}
        element={
          <ShopOwnerPrivateRoute>
            <RestaurantDetails />
          </ShopOwnerPrivateRoute>
        }
      />
    </Routes>
    <Footer />
  </div>
);

export default AllRoutes;
