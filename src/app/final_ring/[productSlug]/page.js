import FinalRing from "./FinalRing";

const fetchMeta = async () => {
  let diamond = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/cms-metadata?route=final_ring`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    diamond = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return diamond;
};

const fetchDiamondDetail = async (stock_num, diamond_origin) => {
  let diamond = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/vdb-diamonds?type=${
        diamond_origin == "natural" ? "Diamond" : "Lab_grown_Diamond"
      }&stock_num=${stock_num}`,
      {
        method: "GET",
      
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    diamond = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return diamond;
};

const fetchRingDetail = async (productSlug) => {
  let ring = [];
  try {
    
    const response = await fetch(
      `${process.env.BASE_URL}/product/${productSlug}`,
      
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    ring = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return ring;
};
export async function generateMetadata({params}) {
  const {productSlug} = params
  const data = await fetchRingDetail(productSlug);
  const Metadata = await fetchMeta();

  
  return {
    title: Metadata.data?.name || "Default Title",
    description: data.data?.description || "Default Description",
    openGraph: {
      title: Metadata.data?.name || "Default Title",
      description: data.data?.description || "Default Description",
      url: data.data?.default_image_url || "http://default-url.com",
      siteName: data.data?.meta_site_name || "Default Site Name",
      images: [
        {
          url: data.data?.default_image_url || "https://assets.rocksama.com/public/storage/images/1716284040_SAMA.png",
          width: 800,
          height: 600,
          alt: data.data?.name || "Default Image Alt",
        },
      ],
    },
  };

}
const DiamondPage = async ({searchParams, params}) => {
  const {stock_num, diamond_origin} = searchParams
  const {productSlug} = params
  const diamondMeta = await fetchMeta();
  const diamondData = await fetchDiamondDetail(stock_num, diamond_origin);
  const ringData = await fetchRingDetail(productSlug);
  
  
  return (
    <>
      <FinalRing diamondDataServer={diamondData.response.body.diamonds} ringData={ringData}/>
    </>
  );
};

export default DiamondPage;
