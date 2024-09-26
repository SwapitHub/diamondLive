import { cookies, headers } from "next/headers";
import { ChooseGemstonesPage } from "./ChooseGemstonesPage";

async function fetchDataFromAPI(gemAttribute, gemFilter) {
  const response = await fetch(
    `${process.env.BASE_URL}/check?menu=gemstone&subcategory=start-with-a-gemstone`
  );

  const data = await response.json();

  return data;
}

const fetchGemstoneAttributes = async () => {
  let gemstone = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/gemstone-attributes`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    gemstone = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return gemstone;
};
const fetchGemstones = async (
  gemStyleFilter,
  gemColorFilter,
  gemShapeFilter
) => {
  let gemstone = [];
  try {
    const headers = {
      Authorization:
        "Token token=CX7r3wiul169qAGnMjzlZm8iEpJIMAgks_IgGD0hywg, api_key=_amT48wMLQ3rh4SP1inCzRQ",
    };
    const response = await fetch(
      `https://apiservices.vdbapp.com//v2/gemstones?markup_mode=true&${
        gemStyleFilter ? gemStyleFilter : ""
      }${gemColorFilter ? gemColorFilter : ""}${
        gemShapeFilter ? gemShapeFilter : ""
      }`,
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
  const { gemAttribute, gemFilter } = params;
  const filterValue = Array.isArray(gemFilter) ? gemFilter[0] : gemFilter;
  const data = await fetchDataFromAPI(gemAttribute, filterValue);
  const headersList = headers();
  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";

  console.log("=============",fullUrl);
  

  if (data !== null) {
    const metadata = {
      title: data.data?.meta_title || "Default Title",
      description: data.data?.meta_description || "Default Description",
      openGraph: {
        title: data.data?.meta_title || "Default Title",
        description: data.data?.meta_description || "Default Description",
        url: fullUrl || "http://default-url.com",
        siteName: data.data?.meta_site_name || "SAMA",
        images: [
          {
            url:
              data.data?.meta_image_url ||
              "https://d24ppbhzdyfrur.cloudfront.net/uploads/image_url/s3_image/153584550/tse0670_9a395331-4a47-4c1a-b911-049a9d2d8664.png",
            width: 800,
            height: 600,
            alt: data.data?.meta_image_alt || "Default Image Alt",
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
          url: "https://d24ppbhzdyfrur.cloudfront.net/uploads/image_url/s3_image/153584550/tse0670_9a395331-4a47-4c1a-b911-049a9d2d8664.png",
          width: 800,
          height: 600,
          alt: "Default Image Alt",
        },
      ],
    },
  };
}

export default async function DetailRingPage({ params }) {
  const { gemAttribute, gemFilter } = params;
  const cookieStore = cookies();
  const gemStyle = cookieStore.get("gemStyle");
  const gemShape = cookieStore.get("gemShape");
  const gemColor = cookieStore.get("gemColor");
  const StyleFilterValue = gemStyle ? JSON.parse(gemStyle?.value) : "";
  const gemStyleFilter =
    gemAttribute === "style"
      ? `&gem_type[]=${gemFilter}`
      : StyleFilterValue
      ? StyleFilterValue.map(
          (style) =>
            `&gem_type[]=${style.charAt(0).toUpperCase() + style.slice(1)}`
        ).join("")
      : "";
  const colorFilterValue = gemColor ? JSON.parse(gemColor?.value) : "";
  const gemColorFilter =
    gemAttribute === "color"
      ? `&color[]=${gemFilter}`
      : colorFilterValue
      ? colorFilterValue
          .map(
            (color) =>
              `&color[]=${color.charAt(0).toUpperCase() + color.slice(1)}`
          )
          .join("")
      : "";
  const shapeFilterValue = gemShape ? JSON.parse(gemShape?.value) : "";
  const gemShapeFilter =
    gemAttribute === "shape"
      ? `&shapes[]=${gemFilter}`
      : shapeFilterValue
      ? shapeFilterValue
          .map(
            (shapes) =>
              `&shapes[]=${shapes.charAt(0).toUpperCase() + shapes.slice(1)}`
          )
          .join("")
      : "";
  const filterValue = Array.isArray(gemFilter) ? gemFilter[0] : gemFilter;
  const data = await fetchDataFromAPI(gemAttribute, filterValue);
  const gemstoneFilterData = await fetchGemstoneAttributes();
  const gemstoneData = await fetchGemstones(
    gemStyleFilter,
    gemColorFilter,
    gemShapeFilter
  );



  return (
    <div>
      <ChooseGemstonesPage
        gemAttribute={gemAttribute}
        gemFilter={filterValue}
        gemstoneFilterData={gemstoneFilterData.data}
        dataServer={gemstoneData.response.body.gemstones}
        gemCountServer={gemstoneData.response.body}
      />
    </div>
  );
} 
