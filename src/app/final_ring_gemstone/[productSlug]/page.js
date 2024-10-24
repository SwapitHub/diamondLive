import FinalGemstone from "./FinalRingGematoneClient";

const fetchMeta = async () => {
  let gemstone = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/cms-metadata?route=final_ring_gemstone`
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

const fetchGemstoneData = async (stock_num, ) => {
  let gemstone = [];
  try {
    
    const response = await fetch(
      `${process.env.BASE_URL}/sama-gemstones?stock_num=${stock_num}`,
      {
        method: "GET",
      }
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
    title: data.data?.name || "Default Title",
    description: data.data?.description || "Default Description",
    openGraph: {
      title: data.data?.name || "Default Title",
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
const gemstonePage = async ({searchParams, params}) => {
  const {stock_num} = searchParams
  const {productSlug} = params
  const gemstoneData = await fetchGemstoneData(stock_num);
  const ringData = await fetchRingDetail(productSlug);
  
  const filterData={
    product: ringData.data,
    imgUrl: ringData.data.entity_id
  }
  
  return (
    <>
      <FinalGemstone data={gemstoneData.response.body.gemstones} filterData={filterData}/>
    </>
  );
};

export default gemstonePage;
