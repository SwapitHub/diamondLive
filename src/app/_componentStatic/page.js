import Header from "./Header";


async function fetchDataFromAPI() {
  const response = await fetch(`http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/cms-metadata?route=final_ring_gemstone`);
  const data = await response.json();
  
  return data;
}

export async function generateMetadata() {
  const data = await fetchDataFromAPI();

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
            url: data.data.meta_image_url || "https://d24ppbhzdyfrur.cloudfront.net/uploads/image_url/s3_image/153584546/xbgpret0920_e5376bda-221d-4d62-910d-beab2b0b7d43.png",
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

export default async function DetailRingPage() {
  const data = await fetchDataFromAPI();
  
  return (
    <div>
      <Header data={data} />
    </div>
  );
}
