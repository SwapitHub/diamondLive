"use client";
import { createContext, useState, useContext } from "react";
import secureLocalStorage from "react-secure-storage";

// Create the context
export const UserContext = createContext(null);

// Create a provider component
export const UserProvider = ({ children }) => {
  const searchedValue = secureLocalStorage.getItem("searchedItem")
    ? JSON.parse(secureLocalStorage.getItem("searchedItem"))
    : null;
  const [cartDetails, setCartDetails] = useState();
  const [userId, setUserId] = useState();
  const [removeWishList, setRemoveWishList] = useState();
  const [searching, setSearching] = useState(searchedValue || "");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showSuggestionHeader, setShowSuggestionHeader] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [toggle, setToggle] = useState(1);

  const baseUrl = "https://api.rocksama.com/api/v1";
  const imgBaseUrl = "https://assets.rocksama.com/images_and_videos/images";
  const imgAssetsUrl = "https://assets.rocksama.com";

  return (
    <UserContext.Provider
      value={{
        cartDetails,
        setCartDetails,
        userId,
        setUserId,
        removeWishList,
        setRemoveWishList,
        searching,
        setSearching,
        showSuggestion,
        setShowSuggestion,
        showSuggestionHeader,
        setShowSuggestionHeader,
        loadingCart,
        setLoadingCart,
        toggle,
        setToggle,
        baseUrl,
        imgBaseUrl,
        imgAssetsUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
