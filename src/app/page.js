"use client";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Footer } from "./_componentStatic/Footer";
import { Header } from "./_componentStatic/Header";
import "./globals.css";
import "./style/globals.css";
import HomePage from "./component/homePages/home/page";
import Example from "./testing/page";
export const UserContext = createContext(null);

export default function Home() {
  let [loading, setLoading] = useState(true);
  console.log(process.env);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const ScrollToTopOnNavigate = () => {
    const location = useRouter();

    useEffect(() => {
      // Scroll to top after a delay
      const timeout = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
      return () => clearTimeout(timeout);
    }, [location.pathname]);

    return null;
  };
  return (
    <>
      <div className="App">
        {loading ? (
          <p>Loader...</p>
        ) : (
          <>
            
              <ScrollToTopOnNavigate />
              
              <Example/>
              {/* <Header />
              <HomePage />
              <Footer /> */}
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
