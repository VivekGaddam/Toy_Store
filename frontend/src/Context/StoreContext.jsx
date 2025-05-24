import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [toy_list, setToyList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const currency = "₹";
  const deliveryCharge = 50;

  const addToCart = async (toyId) => {
    if (!cartItems[toyId]) {
      setCartItems((prev) => ({ ...prev, [toyId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [toyId]: prev[toyId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId: toyId }, { headers: { token } });
    }
  };

  const removeFromCart = async (toyId) => {
    setCartItems((prev) => ({ ...prev, [toyId]: prev[toyId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId: toyId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          let itemInfo = toy_list.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
      } catch (error) {
        // handle error if needed
      }
    }
    return totalAmount;
  };

  const fetchToyList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setToyList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchToyList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData({ token: localStorage.getItem("token") });
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    toy_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,
    currency,
    deliveryCharge,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
