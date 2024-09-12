// components/RouterProvider.js

"use client"; // Ensure this file is a client component

import {  HashRouter } from 'react-router-dom';

const RouterProvider = ({ children }) => {
  return <HashRouter>{children}</HashRouter>;
};

export default RouterProvider;
