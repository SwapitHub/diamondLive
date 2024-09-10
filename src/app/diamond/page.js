import { DiamondPageMain } from "./diamondPage/Diamond";

const fetchMeta = async () => {
  let gemstone = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/check?menu=diamond`
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

  console.log(data);
  
  return {
    title: data.data?.name || "Default Title",
    description: data.data?.description || "Default Description",
    openGraph: {
      title: data.data?.name || "Default Title",
      description: data.data?.description || "Default Description",
      url: data.data?.default_image_url || "http://default-url.com",
      siteName: data.data?.meta_site_name || "Default Site Name",
      images: [
        {
          url:  "https://assets.rocksama.com/frontend/images/dmgsetwet.png",
          width: 800,
          height: 600,
          alt: data.data?.name || "Default Image Alt",
        },
      ],
    },
  };

}
const weddingBand = async ({searchParams, params}) => {
  const {productSlug} = params
  
  const Metadata = await fetchMeta(productSlug);
  
  
  return (
    <>
      <DiamondPageMain gemstoneData={Metadata} />
    </>
  );
};

export default weddingBand;
