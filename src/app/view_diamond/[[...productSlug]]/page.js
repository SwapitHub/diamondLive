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

export async function generateMetadata({ searchParams }) {
  const { diamond_origin, stock_num } = searchParams;
  
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
  const { diamond_origin, stock_num } = searchParams;
  const {productSlug} = params
  const diamondMeta = await fetchMeta();

  const diamondDetails = await fetchDiamondDetail(diamond_origin, stock_num);

  return (
    <>
      <SelectDiamond diamondDetails={diamondDetails.response.body.diamonds} productSlug={productSlug ? productSlug : null}/>
    </>
  );
};

export default DiamondPage;
