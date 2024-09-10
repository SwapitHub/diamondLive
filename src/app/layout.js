import { Inter } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import ReduxProvider from "./reduxProvider";
import { DataProvider } from "./context/DataContext";
import "./style/style.css";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./_componentStatic/Header";
import { Footer } from "./_componentStatic/Footer";
import ToastWrapper from "@/ToastWrapper";


const inter = Inter({ subsets: ["latin"] });
async function fetchDataFromAPI() {
  const response = await fetch(`${process.env.BASE_URL}/siteinfo`);
  const data = await response.json();

  return data;
}

export async function generateMetadata() {
  const data = await fetchDataFromAPI();
console.log(data);

  return {
   
    icons: {
      icon: `${data.favicon}`
    },
  };
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ToastWrapper>
       
        <UserProvider>
          <DataProvider>
            <ReduxProvider>
              <Header/>
              {children}
              <script
                type="text/javascript"
                id="hs-script-loader"
                async
                defer
                src="//js-na1.hs-scripts.com/45427602.js"
              ></script>

              <script
                type="text/javascript"
                id="hs-script-loader"
                async
                defer
                src="//js.hs-scripts.com/45427602.js"
              ></script>
              <Footer/>
            </ReduxProvider>
          </DataProvider>
        </UserProvider>
        </ToastWrapper>
      </body>
    </html>
  );
}
