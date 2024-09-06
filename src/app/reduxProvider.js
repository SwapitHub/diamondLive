"use client";

import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import store, { persistor } from "../../store/store";

const PersistGateWrapper = dynamic(
  () => import("redux-persist/integration/react").then(mod => mod.PersistGate),
  { ssr: false }
);

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGateWrapper loading={null} persistor={persistor}>
        {children}
      </PersistGateWrapper>
    </Provider>
  );
};

export default ReduxProvider;
