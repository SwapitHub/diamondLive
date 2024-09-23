import { cookies } from "next/headers";
import ChooseWeddingBands from "./ChooseWeddingBands";

async function fetchDataFromAPI(bands, bandFilter) {
  const response = await fetch(
    `${process.env.BASE_URL}/check?menu=wedding-band&subcategory=wedding-band/${bands}/${bandFilter}`
  );
  
  const data = await response.json();

  return data;
}

const fetchWeddingBandAttributes = async () => {
  let weddingBand = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/metalcolor`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    weddingBand = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return weddingBand;
};

const fetchWeddingBands = async (weddingBands, priceSorting) => {
  let weddingBand = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/weddingband-products?subcategory=${weddingBands === undefined ? "" : weddingBands}&sortby=${priceSorting === undefined ? "" : priceSorting}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    weddingBand = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return weddingBand;
};

export async function generateMetadata({ params }) {
  const { bands, bandFilter } = params;
  const filterValue = Array.isArray(bandFilter) ? bandFilter[0] : bandFilter;
  const data = await fetchDataFromAPI(bands, filterValue);

  if (data !== null) {
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

export default async function WeddingBands({ params }) {
  const { bands, bandFilter } = params;
  const cookieStore = cookies();
  const priceSorting = cookieStore.get('bandsPrice')
  console.log(priceSorting);
  
  const filterValue = Array.isArray(bandFilter) ? bandFilter[0] : bandFilter;
  const data = await fetchDataFromAPI(bands, filterValue);
  const metalColor = await fetchWeddingBandAttributes();
  const FilterRoseData = await fetchWeddingBands(filterValue, priceSorting?.value);
  
  return (
    <div>
      <ChooseWeddingBands
        weddingBands={filterValue}
        metalColor={metalColor.data}
        filterRoseData={FilterRoseData.data}
        newPrevData={FilterRoseData}
      />
    </div>
  );
}
