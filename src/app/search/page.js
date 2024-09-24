import { cookies } from "next/headers";
import SearchPage from "./searchClient";

const fetchMetawishlist = async () => {
  let wishlistServer = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/cms-metadata?route=search`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    wishlistServer = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return wishlistServer;
};

const fetchSearchColor = async () => {
  let search = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/metalcolor`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    search = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return search;
};

const fetchSearchDiamondShape = async () => {
  let search = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/diamondshape`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    search = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return search;
};

const fetchSearchProductStyle = async () => {
  let search = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/product-style`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    search = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return search;
};

const fetchSearchResults = async (
  searching,
  shapeFilter,
  selectedStyles,
  priceSorting,
  page
) => {
  let search = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/search?q=${searching}&page=${page}${
        shapeFilter?.length > 0
          ? `&shape=${shapeFilter ? shapeFilter : ""}`
          : ""
      }${
        selectedStyles?.length > 0
          ? `&ring_style=${selectedStyles ? selectedStyles : ""}`
          : ""
      }${
        priceSorting
          ? `&sortby=${priceSorting == undefined ? "" : priceSorting}`
          : ""
      }`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    search = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return search;
};

export async function generateMetadata() {
  const data = await fetchMetawishlist();

  if (data) {
    const metadata = {
      title: data.data.meta_title || "Default Title",
      description: data.data.meta_description || "Default Description",
      openGraph: {
        title: data.data.meta_title || "Default Title",
        description: data.data.meta_description || "Default Description",
        url: data.data.meta_url || "http://default-url.com",
        siteName: data.data.meta_site_name || "Default Site Name",
        images: [
          {
            url: data.data.meta_image_url || "http://default-image-url.com",
            width: 800,
            height: 600,
            alt: data.data.meta_image_alt || "Default Image Alt",
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
          url: "http://default-image-url.com",
          width: 800,
          height: 600,
          alt: "Default Image Alt",
        },
      ],
    },
  };
}

const WishlistPageServer = async ({ searchParams }) => {
  const { q, page } = searchParams;
  const cookieStore = cookies();
  const searchShape = cookieStore.get("searchShape");
  const searchStyles = cookieStore.get("searchStyle");
  const searchPrice = cookieStore.get("searchPrice");
  const shapeFilter = searchShape ? JSON.parse(searchShape?.value) : "";
  const styleFilter = searchStyles ? JSON.parse(searchStyles?.value) : "";
  const priceFilter = searchPrice ? searchPrice?.value : "";
  const wishlistServer = await fetchMetawishlist();
  const metalColor = await fetchSearchColor();
  const shapeData = await fetchSearchDiamondShape();
  const ShopByStyle = await fetchSearchProductStyle();
  const searchData = await fetchSearchResults(
    q ? q : "",
    shapeFilter ? shapeFilter.join(",") : "",
    styleFilter ? styleFilter.join(",") : "",
    priceFilter ? priceFilter : "",
    page
  );

  
  return (
    <>
      <SearchPage
        metalColor={metalColor.data}
        shapeData={shapeData.data}
        ShopByStyle={ShopByStyle.data}
        searchDataServer={searchData.data}
        searchedProductCount={searchData}
      />
    </>
  );
};

export default WishlistPageServer;
