import { cookies } from "next/headers";
import { CheckOutPage } from "./CheckOutPage";

const fetchMetaCheckout = async () => {
  let checkout = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/cms-metadata?route=check_out`
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
export async function generateMetadata() {
  const data = await fetchMetaCheckout();

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
const CheckOutServer = async () => {
  const cookieStore = cookies();
  const userId = cookieStore.get('userIdCookies')
  const cartDetail = await fetchCartData(userId.value);
  const checkout = await fetchMetaCheckout();


  return (
    <>
      <CheckOutPage checkout={checkout} cartDetails={cartDetail}/>
    </>
  );
};

export default CheckOutServer;
