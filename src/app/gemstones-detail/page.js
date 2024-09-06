import GemstonesDetail from "./GemstoneDetailClient";

const fetchMeta = async () => {
  let diamond = [];
  try {
    const response = await fetch(
      `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/cms-metadata?route=gemstones-detail`
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

const fetchGemstoneDetail = async (stock_num) => {
  let diamond = [];
  try {
    const headers = {
      Authorization:
        "Token token=CX7r3wiul169qAGnMjzlZm8iEpJIMAgks_IgGD0hywg, api_key=_amT48wMLQ3rh4SP1inCzRQ",
    };
    const response = await fetch(
      `https://apiservices.vdbapp.com//v2/gemstones?markup_mode=true&stock_num=${stock_num}`,
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
  const { stock_num } = searchParams;

  const data = await fetchMeta();

  const gemstone = await fetchGemstoneDetail(stock_num);


  if (gemstone) {
    const metadataList = gemstone.response.body.gemstones.map((item) => {
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

    return metadataList[0];
  }
}
const DiamondPage = async ({ searchParams }) => {
  const { stock_num } = searchParams;

  const diamondMeta = await fetchMeta();

  const gemstone = await fetchGemstoneDetail(stock_num);

  return (
    <>
      <GemstonesDetail gemstone={gemstone.response.body.gemstones} />
    </>
  );
};

export default DiamondPage;
