import { cookies } from "next/headers";
import CartPage from "./cartPageClient";

const fetchMetaCart = async () => {
  let cart = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/cms-metadata?route=cart`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    cart = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return cart;
};

const fetchCartData = async (userIdCookies) => {
  let checkout = [];

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/getcart-items?user_id=${userIdCookies}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    checkout = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return checkout;
};

const fetchMetalData = async () => {
  let checkout = [];

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/metalcolor`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    checkout = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return checkout;
};

export async function generateMetadata() {
  const data = await fetchMetaCart();

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
const CartPageServer = async () => {
  const cart = await fetchMetaCart();
  const cookieStore = cookies();
  const userId = cookieStore.get('userIdCookies')
  const cartDetails = await fetchCartData(userId.value);
  const metalColor = await fetchMetalData();
  
  return (
    <>
      <CartPage cart={cart} cartDetails={cartDetails} metalColor={metalColor.data}/>
    </>
  );
};

export default CartPageServer;
