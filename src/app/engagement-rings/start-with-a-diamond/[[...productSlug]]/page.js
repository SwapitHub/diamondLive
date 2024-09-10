import ChooseDiamonds from "./StartWithDiamondClient";


async function fetchDataFromAPI() {
  const response = await fetch(`${process.env.BASE_URL}/check?menu=engagement-rings&subcategory=start-with-a-diamond`);
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
            url: data.data.meta_image_url || "https://vd-v360.s3.ap-south-1.amazonaws.com/imaged/A1049/still.jpg",
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
          url: "https://assets.rocksama.com/public/storage/images/1716284040_SAMA.png",
          width: 800,
          height: 600,
          alt: "Default Image Alt",
        },
      ],
    },
  };
}



export default async function DetailRingPage({ params }) {
  const data = await fetchDataFromAPI();
  const { productSlug } = params;
  
  return (
        <div>
               
          <ChooseDiamonds data={data} productSlug={productSlug[0]}/>      
                   
        </div>
      );
  
  
 
}
