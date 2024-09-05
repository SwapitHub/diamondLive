import { MyAccountDashboard } from "./MyAccountDashboard";

const fetchAccount = async () => {
  let account = [];
  try {
    const response = await fetch(
      `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/cms-metadata?route=accounts`
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

export async function generateMetadata() {
  const data = await fetchAccount();

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
            url: data.data.meta_image_url || "http://default-image-url.com",
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
const accountPageServer = async () => {
  const account = await fetchAccount();
  return (
    <>
      <MyAccountDashboard account={account} />
    </>
  );
};

export default accountPageServer;
