// components/RouterProvider.js

"use client"; // Ensure this file is a client component

import { BrowserRouter } from 'react-router-dom';

const RouterProvider = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterProvider;
