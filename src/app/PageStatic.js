"use client";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


import LoaderSpinner from "./_componentStatic/LoaderSpinner";
import HomePageData from "./[...home]/page";
export const UserContext = createContext(null);

export default function Home() {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const ScrollToTopOnNavigate = () => {
    const pathname = usePathname();

    useEffect(() => {
      // Scroll to top after a delay
      const timeout = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
      return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
  };
  return (
    <>
      <div className="App">
        {loading ? (
        <LoaderSpinner/>
        ) : (
          <>
            
              <ScrollToTopOnNavigate />
              <HomePageData />
          </>
        )}
        <ToastContainer
          className="toast-position"
          position="bottom-right"
        ></ToastContainer>
        {/* <PaymentGetWayForm/> */}
      </div>
    </>
  );
}
