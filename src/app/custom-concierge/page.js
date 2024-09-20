import CustomizationForm from "./CustomizationForm";

const fetchMeta = async () => {
  let gemstone = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/check?menu=custom-concierge`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    gemstone = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return gemstone;
};




export async function generateMetadata() {
  const data = await fetchMeta();

  return {
    title: data.data?.meta_title || data.data?.name,
    description: data.data?.meta_description || "Default Description",
    openGraph: {
      title: data.data?.meta_title || data.data?.name,
      description: data.data?.meta_description || "Default Description",
      url: data.data?.default_image_url || "http://default-url.com",
      siteName: data.data?.meta_site_name || "Default Site Name",
      images: [
        {
          url:  "https://assets.rocksama.com/public/Animated-Loader.svg",
          width: 800,
          height: 600,
          alt: data.data?.name || "Default Image Alt",
        },
      ],
    },
  };

}
const CustomConcierge = async () => {
  
  
  
  return (
    <>
      <CustomizationForm />
    </>
  );
};

export default CustomConcierge;
