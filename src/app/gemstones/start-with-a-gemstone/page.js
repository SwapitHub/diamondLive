import { ChooseGemstones } from "./ChooseGemstones";


async function fetchDataFromAPI() {
  const response = await fetch(`http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/check?menu=gemstone&subcategory=start-with-a-gemstone`);
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

export default async function DetailRingPage() {
  const data = await fetchDataFromAPI();
  
  return (
    <div>
      <ChooseGemstones data={data} />
    </div>
  );
}
