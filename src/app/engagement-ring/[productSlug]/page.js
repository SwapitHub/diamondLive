// File: app/engagement-ring/[...detailRingProduct]/page.js

import DetailRingProduct from "./DetailRingClient";

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

const fetchShapeData = async () => {
  let shape = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/diamondshape`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    shape = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return shape;
};

const fetchDiamondDetail = async (diamond_origin, stock_num) => {
  let diamond = [];
  try {
    const headers = {
      Authorization:
        "Token token=CX7r3wiul169qAGnMjzlZm8iEpJIMAgks_IgGD0hywg, api_key=_amT48wMLQ3rh4SP1inCzRQ",
    };
    const response = await fetch(
      `https://apiservices.vdbapp.com/v2/diamonds?type=${
        diamond_origin === "lab_grown" ? "Lab_grown_Diamond" : "Diamond"
      }&stock_num=${stock_num}`,
      {
        method: "GET",
        headers: headers,
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

export async function generateMetadata({ params }) {
  const { productSlug } = params;

  const data = await fetchDetailMeta(productSlug);

  // Return metadata if needed
  return {
    title: data.data?.name || "Default Title",
    description: data.data?.description || "Default Description",
    openGraph: {
      title: data.data?.name || "Default Title",
      description: data.data?.description || "Default Description",
      url:
        data.data?.default_image_url ||
        "https://assets.rocksama.com/public/storage/images/1716284040_SAMA.png",
      siteName: data.data?.meta_site_name || "Default Site Name",
      images: [
        {
          url:
            data.data?.default_image_url ||
            "https://assets.rocksama.com/public/storage/images/1716284040_SAMA.png",
          width: 800,
          height: 600,
          alt: data.data?.name || "Default Image Alt",
        },
      ],
    },
  };
}

export default async function RingDetailPage({ params, searchParams }) {
  const { productSlug } = params;
  const {stock_num, diamond_origin} = searchParams;
  const ringDetail = await fetchDetailMeta(productSlug);
  const shape = await fetchShapeData();
  const diamond = await fetchDiamondDetail(diamond_origin, stock_num);
  
  const filterData = {
    product: ringDetail.data,
    imgUrl: ringDetail.data.internal_sku,
  };

  return (
    <>
      <DetailRingProduct filterData={filterData} shapeData={shape.data} diamondData={diamond.response.body.diamonds}/>
    </>
  );
}
