import { Inter } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import ReduxProvider from "./reduxProvider";
import { DataProvider } from "./context/DataContext";
import "./style/app.css";
import "./style/style.css";
import Header from "./_componentStatic/Header";
import { Footer } from "./_componentStatic/Footer";


const inter = Inter({ subsets: ["latin"] });
async function fetchDataFromAPI() {
  const response = await fetch("http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/siteinfo");
  const data = await response.json();
  
  return data;
}

export async function generateMetadata() {
  const data = await fetchDataFromAPI();

  if (data) {
    const metadata = {
      title: data.data.meta_title || "Default Title",
      description: data.data.meta_description || "Default Description",
      openGraph: {
        title: data.data.meta_title || "Default Title",
        description: data.data.meta_description || "Default Description",
        url: data.data.meta_url || "http://default-url.com",
        siteName: data.data.meta_site_name || "Default Site Name",
        images: [
          {
            url: data.data.meta_image_url || "https://assets.rocksama.com/public/storage/images/1716284040_SAMA.png",
            width: 800,
            height: 600,
            alt: data.data.meta_image_alt || "Default Image Alt",
          },
        ],
      },
    };

    return metadata;
  }

  return {
    title: "Default Title",
    description: "Default Description",
    openGraph: {
      title: "Default Title",
      description: "Default Description",
      url: "http://default-url.com",
      siteName: "Default Site Name",
      images: [
        {
          url: "http://default-image-url.com",
          width: 800,
          height: 600,
          alt: "Default Image Alt",
        },
      ],
    },
  };
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
