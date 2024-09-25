import { cookies } from "next/headers";
import ChooseDiamondsShape from "./DiamondClient";

async function fetchDataFromAPI(diamond, diamondFilter) {
  const menu = diamondFilter == "lab_grown" ? "diamond" : "engagement-rings";
  const subcategory =
    diamondFilter == "lab_grown"
      ? "diamond/start-with-a-diamond/lab_grown"
      : "start-with-a-diamond";
  const response = await fetch(
    `${process.env.BASE_URL}/check?menu=${menu}&subcategory=${subcategory}`
  );

  const data = await response.json();

  return data;
}

const fetchDiamondAttributes = async () => {
  let diamond = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/diamondshape`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    diamond = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return diamond;
};

const fetchDiamonds = async (diamondShapeFilter, newDiamondType) => {
  let diamond = [];
  try {
    const headers = {
      Authorization:
        "Token token=CX7r3wiul169qAGnMjzlZm8iEpJIMAgks_IgGD0hywg, api_key=_amT48wMLQ3rh4SP1inCzRQ",
    };
    const response = await fetch(
      `https://apiservices.vdbapp.com//v2/diamonds?type=${
        newDiamondType == "lab_grown" ? "Lab_grown_diamond" : "Diamond"
      }&${diamondShapeFilter ? diamondShapeFilter : ""}&with_images=true`,
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

const fetchRingDetail = async (productSlug) => {
  let ring = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/product/${productSlug}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    ring = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return ring;
};

export async function generateMetadata({ params }) {
  const { diamonds, diamondFilter } = params;
  const data = await fetchDataFromAPI(diamonds, diamondFilter);

  if (data) {
    const metadata = {
      title: data.data?.meta_title || "Default Title",
      description: data.data?.meta_description || "Default Description",
      openGraph: {
        title: data.data?.meta_title || "Default Title",
        description: data.data?.meta_description || "Default Description",
        url: data.data?.meta_url || "http://default-url.com",
        siteName: data.data?.meta_site_name || "Default Site Name",
        images: [
          {
            url:
              data.data?.meta_image_url ||
              "https://vd-v360.s3.ap-south-1.amazonaws.com/imaged/A1049/still.jpg",
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
          url: "http://default-image-url.com",
          width: 800,
          height: 600,
          alt: "Default Image Alt",
        },
      ],
    },
  };
}

export default async function DetailRingPage({ params }) {
  const { diamonds, diamondFilter } = params;
  const cookieStore = cookies();
  const diamondStyle = cookieStore.get("diamondShape");
  const newDiamondType = cookieStore.get("diamondType");
  const caratFilter = cookieStore.get("caratfilter");
  const shapeFilterValue = diamondStyle ? JSON.parse(diamondStyle?.value) : "";
  const diamondShapeFilter =
    diamonds === "shape"
      ? `&shapes[]=${
          diamondFilter[0]?.charAt(0).toUpperCase() + diamondFilter[0].slice(1)
        }`
      : shapeFilterValue
      ? shapeFilterValue
          .map(
            (shapes) =>
              `&shapes[]=${shapes.charAt(0).toUpperCase() + shapes.slice(1)}`
          )
          .join("")
      : "";

  const data = await fetchDataFromAPI(diamonds, diamondFilter);
  const shapeData = await fetchDiamondAttributes();
  const diamondData = await fetchDiamonds(
    diamondShapeFilter,
    newDiamondType?.value
    // caratFilter ? caratFilter[0] : "",
    // caratFilter ? caratFilter[1] : "",
  );
  const ringData =
    diamondFilter?.length > 1
      ? await fetchRingDetail(diamondFilter?.length > 1 && diamondFilter[0])
      : null;
  const filterData = ringData
    ? {
        product: ringData && ringData.data,
        imgUrl:
          ringData &&
          ringData?.data?.default_image_url
            .split("/")
            .slice(-1)
            .join()
            .split(".")
            .shift(),
      }
    : null;

  console.log("========", caratFilter?.value);

  return (
    <div>
      <ChooseDiamondsShape
        diamonds={diamonds}
        diamondsFilter={diamondFilter ? diamondFilter[0] : diamondFilter}
        productSlug={diamondFilter?.length > 1 && diamondFilter[0]}
        shapeData={shapeData.data}
        dataServer={diamondData.response.body.diamonds}
        totalDiamondServer={diamondData.response.body.total_diamonds_found}
        filterData={filterData ? filterData : null}
      />
    </div>
  );
}
