import { DiamondPageMain } from "./diamondPage/Diamond";

const fetchMeta = async () => {
  let gemstone = [];
  try {
    const response = await fetch(
      `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/cms-metadata?route=final_ring_gemstone`
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
    const headers = {
      Authorization:
        "Token token=CX7r3wiul169qAGnMjzlZm8iEpJIMAgks_IgGD0hywg, api_key=_amT48wMLQ3rh4SP1inCzRQ",
    };
    const response = await fetch(
      `https://apiservices.vdbapp.com//v2/gemstones?stock_num=${stock_num}`,
      {
        method: "GET",
        headers: headers,
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
      `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/product/${productSlug}`,
      
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
          url: data.data?.default_image_url || "http://default-image-url.com",
          width: 800,
          height: 600,
          alt: data.data?.name || "Default Image Alt",
        },
      ],
    },
  };

}
const engagement = async ({searchParams, params}) => {
  const {stock_num} = searchParams
  const {productSlug} = params
  const gemstoneData = await fetchGemstoneData(stock_num);
  const ringData = await fetchRingDetail(productSlug);
  
  
  
  return (
    <>
      <DiamondPageMain gemstoneData={gemstoneData} ringData={ringData}/>
    </>
  );
};

export default engagement;
