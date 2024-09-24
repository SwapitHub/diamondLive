import ToastWrapper from "@/ToastWrapper";
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import FooterServer from "./_componentStatic/FooterServer";
import { DataProvider } from "./context/DataContext";
import { UserProvider } from "./context/UserContext";
import styles from './page.module.css';
import ReduxProvider from "./reduxProvider";
import "./style/style.css";
import HeaderServer from "./_componentStatic/HeaderServer";
import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });
async function fetchDataFromAPI() {
  const response = await fetch(`${process.env.BASE_URL}/siteinfo`);
  const data = await response.json();

  return data;
}

export async function generateMetadata() {
  const data = await fetchDataFromAPI();

  return {
   
    icons: {
      icon: `${data.data.favicon}`
    },
  };
}
export default function RootLayout({ children }) {
  return (
    <>
    <Head>
       <meta http-equiv="Cache-Control" content="max-age: 86400, must-revalidate"/>
      </Head>
    <html lang="en">
       
      <body className={styles.customFont}>
      <ToastWrapper>
       
        <UserProvider>
          <DataProvider>
            
            <ReduxProvider>
              <HeaderServer/>
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
              <FooterServer/>
            </ReduxProvider>
          </DataProvider>
        </UserProvider>
        </ToastWrapper>
      </body>
    </html>
    </>
    
  );
}
