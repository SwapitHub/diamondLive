import ChooseWeddingBands from "./ChooseWeddingBands";

async function fetchDataFromAPI(bands, bandFilter) {
  const response = await fetch(
    `${process.env.BASE_URL}/check?menu=wedding-band&subcategory=wedding-band/${bands}/${bandFilter}`
  );
  
  const data = await response.json();

  return data;
}

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

export default async function DetailRingPage({ params }) {
  const { bands, bandFilter } = params;
  const filterValue = Array.isArray(bandFilter) ? bandFilter[0] : bandFilter;
  const data = await fetchDataFromAPI(bands, filterValue);
  

  return (
    <div>
      <ChooseWeddingBands
        bands={bands}
        weddingBands={filterValue}
        gemData={data}
      />
    </div>
  );
}
