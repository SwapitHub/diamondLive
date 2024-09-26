import { cookies } from "next/headers";
import StartWithASetting from "./RingListPageClient";

async function fetchDataFromAPI(ring, ringFilter, bridalSets) {
  const response = await fetch(
    `${process.env.BASE_URL}/check?menu=engagement-rings&subcategory=${
      bridalSets
        ? "engagement-rings/start-with-bridal-set?bridalSets=true"
        : ringFilter
        ? ringFilter
        : ring
    }`
  );
  const data = await response.json();

  return data;
}

const fetchMetalData = async () => {
  let checkout = [];

  try {
    const response = await fetch(`${process.env.BASE_URL}/metalcolor`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    checkout = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return checkout;
};

const fetchSiteInfo = async () => {
  let checkout = [];

  try {
    const response = await fetch(`${process.env.BASE_URL}/siteinfo`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    checkout = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return checkout;
};

const fetchDiamondShape = async () => {
  let checkout = [];

  try {
    const response = await fetch(`${process.env.BASE_URL}/diamondshape`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    checkout = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return checkout;
};

const fetchProductStyle = async () => {
  let checkout = [];

  try {
    const response = await fetch(`${process.env.BASE_URL}/product-style`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    checkout = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return checkout;
};

const fetchProductData = async (
  PriceShorting,
  ring_style,
  shapeNameMainFilter,
  localBridalData,
  bridalSets
) => {
  let checkout = [];

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/products?page="1"${
        PriceShorting
          ? `&sortby=${PriceShorting == undefined ? "" : PriceShorting}`
          : ""
      }${ring_style ? ring_style : ""}${
        localBridalData
          ? `&bridal_sets=${localBridalData == null ? "" : localBridalData}`
          : ""
      }${shapeNameMainFilter ? shapeNameMainFilter : ""}${
        bridalSets
          ? `&bridal_sets=${bridalSets == null ? "" : bridalSets}`
          : ""
      }`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    checkout = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return checkout;
};

export async function generateMetadata({ params, searchParams }) {
  const { bridalSets } = searchParams;
  const { rings, ringFilter } = params;
  const data = await fetchDataFromAPI(rings, ringFilter, bridalSets);
  const siteInfo = await fetchSiteInfo();

  if (data) {
    const metadata = {
      title: data.data?.meta_title || siteInfo.data?.meta_title,
      description: data.data?.meta_description || siteInfo.data?.meta_description,
      openGraph: {
        title: data.data?.meta_title || siteInfo.data?.meta_title,
        description: data.data?.meta_description || siteInfo.data?.meta_description,
        url: data.data?.image || siteInfo.data?.logo,
        siteName: data.data?.meta_site_name || "SAMA",
        images: [
          {
            url:
              data.data?.image ||
              "https://assets.rocksama.com/products/images/SA50281-E18W-18/SA50281-E18W-18.alt1.jpg",
            width: 800,
            height: 600,
            alt: data.data?.image_alt || "Default Image Alt",
          },
        ],
      },
    };

    return metadata;
  }

  return {
    title: "Default Title",
    description: "Default Description",
    openGraph: {
      title: "Default Title",
      description: "Default Description",
      url: "http://default-url.com",
      siteName: "Default Site Name",
      images: [
        {
          url: "https://assets.rocksama.com/products/images/SA50281-E18W-18/SA50281-E18W-18.alt1.jpg",
          width: 800,
          height: 600,
          alt: "Default Image Alt",
        },
      ],
    },
  };
}

export default async function DetailRingPage({ searchParams, params }) {
  const cookieStore = cookies();
  const PriceShorting = cookieStore.get("PriceShorting");
  const ring_style = cookieStore.get("selectedShopStyleIds");
  const shapeName = cookieStore.get("clickedShape");
  const ringFilterStyle = ring_style ? JSON.parse(ring_style?.value) : "";
  const shapeFilter = shapeName ? shapeName?.value : "";
  const localBridalData = cookieStore.get("");
  const { bridalSets } = searchParams;
  
  const { rings, ringFilter } = params;
  const ringStyleFilter =
    rings === "style"
      ? `&ring_style=${ringFilter}`
      : ringFilterStyle
      ? `&ring_style=${ringFilterStyle.join(",")}`
      : "";

  const shapeNameMainFilter =
    rings == "shape"
      ? `&shape=${ringFilter}`
      : shapeFilter
      ? `&shape=${shapeFilter}`
      : "";
  const data = await fetchDataFromAPI(rings, ringFilter, bridalSets);
  const metalColor = await fetchMetalData();
  const shapeData = await fetchDiamondShape();
  const ShopByStyle = await fetchProductStyle();
  const filterRoseData = await fetchProductData(
    PriceShorting?.value,
    ringStyleFilter,
    shapeNameMainFilter,
    localBridalData?.value,
    bridalSets
  );
  const product_count = filterRoseData.product_count;

  return (
    <div>
      <StartWithASetting
        rings={rings}
        ringFilter={ringFilter ? ringFilter[0] : null}
        metalColor={metalColor.data}
        shapeData={shapeData.data}
        ShopByStyle={ShopByStyle.data}
        filterRoseDatas={filterRoseData.data}
        product_count={product_count}
      />
    </div>
  );
}
