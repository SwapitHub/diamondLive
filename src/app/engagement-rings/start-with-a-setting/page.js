import StartWithASetting from "./RingListPageClient";


async function fetchDataFromAPI(detailRingPage) {
  
  const response = await fetch(`${process.env.BASE_URL}/check?menu=engagement-rings&subcategory=start-with-a-setting`);
  const data = await response.json();
  
  return data;
}

export async function generateMetadata({ params }) {
  const data = await fetchDataFromAPI(params.detailRingPage);

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
            url: data.data.meta_image_url || "https://assets.rocksama.com/products/images/SA50281-E18W-18/SA50281-E18W-18.alt1.jpg",
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
          url: "https://assets.rocksama.com/products/images/SA50281-E18W-18/SA50281-E18W-18.alt1.jpg",
          width: 800,
          height: 600,
          alt: "Default Image Alt",
        },
      ],
    },
  };
}

export default async function DetailRingPage({ params }) {
  const data = await fetchDataFromAPI(params.detailRingPage);

  return (
    <div>
      <StartWithASetting data={data} />
    </div>
  );
}
