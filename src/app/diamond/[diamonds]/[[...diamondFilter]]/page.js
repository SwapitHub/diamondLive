import ChooseDiamondsShape from "./DiamondClient";

async function fetchDataFromAPI(diamond, diamondFilter) {
  const response = await fetch(
    `${
      process.env.BASE_URL
    }/check?menu=diamond&subcategory=diamond/${diamond}${
      diamondFilter ? `/${diamondFilter}` : ""
    }`
  );
  const data = await response.json();

  return data;
}

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
  const data = await fetchDataFromAPI(diamonds, diamondFilter);

  

  return (
    <div>
      <ChooseDiamondsShape diamonds={diamonds} diamondsFilter={diamondFilter ? diamondFilter[0] : diamondFilter} />
    </div>
  );
}
