// File: app/engagement-ring/[...detailRingProduct]/page.js

import DetailRingProduct from "./DetailRingClient";

const fetchDetailMeta = async (secondPathSegment) => {
  let ringDetail = [];
  try {
    const response = await fetch(
      `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/product/${secondPathSegment}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    ringDetail = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return ringDetail;
};

export async function generateMetadata({ params }) {
  const pathSegments = params.detailRingProduct || [];
  const secondPathSegment = pathSegments[1] || null;

  const data = await fetchDetailMeta(pathSegments);

  // Return metadata if needed
  return {
    title: data.data?.name || "Default Title",
    description: data.data?.description || "Default Description",
    openGraph: {
      title: data.data?.name || "Default Title",
      description: data.data?.description || "Default Description",
      url: data.data?.default_image_url || "http://default-url.com",
      siteName: data.data?.meta_site_name || "Default Site Name",
      images: [
        {
          url: data.data?.default_image_url || "http://default-image-url.com",
          width: 800,
          height: 600,
          alt: data.data?.name || "Default Image Alt",
        },
      ],
    },
  };
}

export default async function RingDetailPage({ params }) {
  const pathSegments = params.detailRingProduct || [];

  const ringDetail = await fetchDetailMeta(pathSegments);

  return (
    <>
      <DetailRingProduct ringDetail={ringDetail} />
    </>
  );
}
