import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginScreen from './componenets/auth/LoginScreen';
import HomeScreen from './componenets/home/HomeScreen';
import PublicRoute from './componenets/auth/PublicRoute';
import ProtectedRoute from './componenets/auth/ProtectedRoute';
import Cartpage from './componenets/cart/Cartpage';
import Allproductspage from './componenets/allproducts/Allproductspage';

const App = () => {
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />

        <Route
          path="/allproducts"
          element={
            <ProtectedRoute>
              <Allproductspage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cartpage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
};

export default App;