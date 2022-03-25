import React, { useState } from "react";
import Header from "./components/front/Header/Header";
import Products from "./components/front/Products/Products";
import Login from "./components/Login/Login";
import { Routes, Route, Link } from "react-router-dom";
import { data } from "./components/back/data/Data";
import Cart from "./components/front/Cart/Cart";

const App = () => {
  const { productItems } = data;
  const [cartItems, setCartItems] = useState([]);
  //console.log(data);

  const handleAddProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <div>
      <Header cartItems={cartItems}  />
      <Routes
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
        cartItems={cartItems}
      >
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Cart"
          element={
            <Cart cartItems={cartItems} handleAddProduct={handleAddProduct} 
                  handleRemoveProduct={handleRemoveProduct} 
            />
          }
        />
        <Route
          path="/home"
          element={
            <Products
              productItems={productItems}
              handleAddProduct={handleAddProduct}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
