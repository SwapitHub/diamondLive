import { WeddingBandsDetail } from "./WeddingBandDetail";


const fetchDetailMeta = async (productSlug) => {
  let bandDetail = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/product/${productSlug}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    bandDetail = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return bandDetail;
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

export async function generateMetadata({ params }) {
  const {productSlug} = params

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

export default async function bandDetailPage({ params }) {
 const {productSlug} = params

  const bandDetail = await fetchDetailMeta(productSlug);
  const shape = await fetchShapeData();
  
  const filterData={
    product: bandDetail.data,
    imgUrl: bandDetail.data.internal_sku,
  }

  return (
    <>
      <WeddingBandsDetail productSlug={productSlug} filterData={filterData} shapeData={shape.data}/>
    </>
  );
}
