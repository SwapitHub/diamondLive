import  EngagementRing  from "./engagementRingPage/EngagementRing";

const fetchMeta = async () => {
  let gemstone = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/check?menu=engagement-rings`
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

// ==========weight API start
const fetchRingRoseGold = async () => {
  let anniversaryRings = {};
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/widget/Rose Gold Rings`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    anniversaryRings = await response.json();

    anniversaryRings.data.description = purify.sanitize(anniversaryRings.data?.description);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return anniversaryRings;
};

const fetchRingYellowGold = async () => {
  let anniversaryRings = {};
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/widget/Yellow Gold Rings`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    anniversaryRings = await response.json();

    anniversaryRings.data.description = purify.sanitize(anniversaryRings.data?.description);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return anniversaryRings;
};
const fetchRingPlatinumRings = async () => {
  let anniversaryRings = {};
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/widget/Platinum Rings`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    anniversaryRings = await response.json();

    anniversaryRings.data.description = purify.sanitize(anniversaryRings.data?.description);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return anniversaryRings;
};
const fetchRingWhiteGold = async () => {
  let anniversaryRings = {};
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/widget/White Gold Rings`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    anniversaryRings = await response.json();

    anniversaryRings.data.description = purify.sanitize(anniversaryRings.data?.description);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return anniversaryRings;
};
const fetchRingBridalSetRing = async () => {
  let anniversaryRings = {};
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/widget/Bridal Set Ring`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    anniversaryRings = await response.json();

    anniversaryRings.data.description = purify.sanitize(anniversaryRings.data?.description);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return anniversaryRings;
};
// ==========weight API End

export async function generateMetadata() {
  const data = await fetchMeta();

  
  return {
    title: data.data?.meta_title ||  data.data.title,
    description: data.data?.meta_description || "Default Description",
    openGraph: {
      title: data.data?.meta_title || "Default Title",
      description: data.data?.meta_description || "Default Description",
      url: data.data?.default_image_url || "http://default-url.com",
      siteName: data.data?.meta_site_name || "Default Site Name",
      images: [
        {
          url:  "https://assets.rocksama.com/frontend/images/Bridal-set-ring.png",
          width: 800,
          height: 600,
          alt: data.data?.name || "Default Image Alt",
        },
      ],
    },
  };

}
const EngagementRings = async ({searchParams, params}) => {
  const {productSlug} = params
  
  const Metadata = await fetchMeta(productSlug);
  const roseGold = await fetchRingRoseGold();
  const yellowGold = await fetchRingYellowGold();
  const platinumRings = await fetchRingPlatinumRings();
  const whiteGold = await fetchRingWhiteGold();
  const bridalSetRing = await fetchRingBridalSetRing();
  
  
  return (
    <>
      <EngagementRing roseGold={roseGold.data} yellowGold={yellowGold.data} platinumRings={platinumRings.data} whiteGold={whiteGold.data} bridalSetRing={bridalSetRing.data}/>
    </>
  );
};

export default EngagementRings;
