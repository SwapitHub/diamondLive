import SuccessPayment from "./SuccessPayment";

const fetchSuccessServer = async () => {
  let success = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/cms-metadata?route=success`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    success = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return success;
};

export async function generateMetadata() {
  const data = await fetchSuccessServer();

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
const fetchUserData = async (order_id) => {
  let account = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/order-detail?order_id=${order_id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    account = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return account;
};
const SuccessServer = async ({params}) => {
  const {order_id} = params
  const success = await fetchSuccessServer();
  const orderId = await fetchUserData(order_id)
  return (
    <>
      <SuccessPayment orderId={orderId} order_id={order_id}/>
    </>
  );
};

export default SuccessServer;
