import SelectDiamond from "./SelectDiamond";

const fetchMeta = async () => {
  let diamond = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/cms-metadata?route=view_diamond`
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

const fetchDiamondDetail = async (diamond_origin, stock_num) => {
  let diamond = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/sama-diamonds?type=${
        diamond_origin === "lab_grown" ? "Lab_grown_Diamond" : "Diamond"
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

export async function generateMetadata({ searchParams, params }) {
  const { diamond_origin } = searchParams;
  const {stock_num} = params
  
  const data = await fetchMeta();

  const diamondDetails = await fetchDiamondDetail(diamond_origin, stock_num);

  const defaultMetadata = {
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

  if (
    diamondDetails &&
    diamondDetails.response &&
    diamondDetails.response.body &&
    diamondDetails.response.body.diamonds
  ) {
    const metadataList = diamondDetails.response.body.diamonds.map((item) => {
      return {
        title: item.short_title || data.data?.title,
        description: item.short_title || data.data?.description,
        openGraph: {
          title: item.short_title || data.data?.title,
          description: item.short_title || data.data?.description,
          url: "" || data.data?.description,
          siteName: data.data?.meta_site_name || data.data?.description,
          images: [
            {
              url: item.image_url || data.data?.description,
              width: 800,
              height: 600,
              alt: item.shape || data.data?.description,
            },
          ],
        },
      };
    });

    return metadataList[0] || defaultMetadata;
  }

  // Return default metadata if no diamonds are available
  return defaultMetadata;
}
const DiamondPage = async ({ searchParams, params }) => {
  const { diamond_origin } = searchParams;
  const {productSlug, stock_num} = params
  const diamondMeta = await fetchMeta();
  const ringDetail = productSlug ? await fetchDetailMeta(productSlug) : null;
  const diamondDetails = await fetchDiamondDetail(diamond_origin, stock_num);

  const filterData = ringDetail ? {
    product: ringDetail.data,
    imgUrl: ringDetail.data.internal_sku,
  } : null;
  return (
    <>
      <SelectDiamond diamondDetailsResult={diamondDetails.response.body.diamonds} productSlug={productSlug ? productSlug : null} filterData={filterData ? filterData : null}/>
    </>
  );
};

export default DiamondPage;
