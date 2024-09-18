"use client";

import { Provider } from "react-redux";
import store from "../../store/store";

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
        {children}
      {/* <PersistGateWrapper loading={null} persistor={persistor}>
      </PersistGateWrapper> */}
    </Provider>
  );
};

export default ReduxProvider;
