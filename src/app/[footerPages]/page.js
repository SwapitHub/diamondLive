// app/contact/page.tsx (or .js)

import Head from "next/head";
import ContactUs from "./fetchFooter";

// Fetch data at build time
export async function generateStaticProps() {
  const posts = await fetchFooterData();
  return { props: { posts } };
}

// Function to fetch footer data
const fetchFooterData = async () => {
  let posts = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/footer-pages`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    posts = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return posts;
};

export async function generateMetadata({ params }) {
  const data = await fetchFooterData();
  const { footerPages } = params;
  
  const page = data.data.flatMap(item => item.pages).find(innerItem => innerItem.slug === footerPages);

  if (page) {
    return {
      title: page.name || "Default Title",
      description: page.description || "Default Description",
    openGraph: {
      title: page.name || "Default Title",
      description: page.description || "Default Description",
      url: page.default_image_url || "http://default-url.com",
      siteName: page.meta_site_name || "Default Site Name",
      images: [
        {
          url:  "https://assets.rocksama.com/public/storage/images/1716284040_SAMA.png",
          width: 800,
          height: 600,
          alt: page.name || "Default Image Alt",
        },
      ],
    },
    };
  }

 
}
// Page Component
const ContactPage = async () => {
  const posts = await fetchFooterData();
  return (
    <div>
      <ContactUs posts={posts} />
    </div>
  );
};

export default ContactPage;
