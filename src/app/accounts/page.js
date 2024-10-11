import { cookies } from "next/headers";
import { MyAccountDashboard } from "./MyAccountDashboard";
import { Suspense } from "react";

const fetchAccount = async () => {
  let account = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/cms-metadata?route=accounts`
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

const fetchUserData = async (user_id) => {
  let account = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/user-account?user_id=${user_id}`
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
            url: data.data.meta_image_url ||  "https://assets.rocksama.com/public/storage/images/1716284040_SAMA.png",
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

  const cookieStore = cookies();

  const userId = cookieStore.get('userIdCookies')

  const profileData = await fetchUserData(userId?.value)
  
  return (
    <>
    <Suspense>

      <MyAccountDashboard  profileData={profileData} userId={userId?.value}/>
    </Suspense>
    </>
  );
};

export default accountPageServer;
