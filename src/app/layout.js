import { Inter } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import "./globals.css";
import ReduxProvider from "./reduxProvider";
import "./style/globals.css";
import { DataProvider } from "./context/DataContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <DataProvider>
            <ReduxProvider>
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
            </ReduxProvider>
          </DataProvider>
        </UserProvider>
      </body>
    </html>
  );
}
