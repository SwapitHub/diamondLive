import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import ContactUs from './fetchFooter';

// Server-side DOMPurify setup
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Fetch footer data
const fetchFooterData = async () => {
  let posts = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/footer-pages`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    posts = await response.json();

    // Sanitize the description for each page
    if (Array.isArray(posts.data)) {
      posts.data.forEach(item => {
        item.pages.forEach(innerItem => {
          innerItem.content = purify.sanitize(innerItem.content);
        });
      });
    }
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return posts;
};

// Generate static props
export async function generateStaticProps() {
  const posts = await fetchFooterData();
  return { props: { posts } };
}

// Generate metadata for SEO
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
            url: "https://assets.rocksama.com/public/storage/images/1716284040_SAMA.png",
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
      <ContactUs FooterData={posts.data} />
    </div>
  );
};

export default ContactPage;
