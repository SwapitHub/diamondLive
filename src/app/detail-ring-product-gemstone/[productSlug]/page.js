// File: app/engagement-ring/[...detailRingProduct]/page.js

import ChooseRingGemstone from "./ChooseRingGemstone";


const fetchDetailMeta = async (productSlug) => {
  let ringDetail = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/product/${productSlug}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    ringDetail = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return ringDetail;
};

const fetchGemstoneDetail = async (stock_num) => {
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

export async function generateMetadata({ params }) {
  const { productSlug } = params
  const data = await fetchDetailMeta(productSlug);

  // Return metadata if needed
  return {
    title: data.data?.name || "Default Title",
    description: data.data?.description || "Default Description",
    openGraph: {
      title: data.data?.name || "Default Title",
      description: data.data?.description || "Default Description",
      url: data.data?.default_image_url || "https://assets.rocksama.com/public/storage/images/1716284040_SAMA.png",
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

export default async function RingDetailPage({ searchParams, params }) {
  const { productSlug } = params;
  const {stock_num, color} = searchParams;
  const gemstoneDetail = await fetchGemstoneDetail(stock_num);
  const ringDetail = await fetchDetailMeta(productSlug);

  
  
  return (
    <>
      <ChooseRingGemstone ringDetail={ringDetail} gemstoneDetail={gemstoneDetail.response.body.gemstones} listColor={color}/>
    </>
  );
}
