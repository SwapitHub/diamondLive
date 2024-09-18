import { Footer } from "./Footer";

const footerData = async () => {
  let footer = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/footer-pages`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    footer = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return footer;
};
const siteInfo = async () => {
  let siteInfo = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/siteinfo`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    siteInfo = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return siteInfo;
};


const FooterServer = async () => {
  const footer = await footerData();
  const site = await siteInfo();

  return (
    <>
      <Footer FooterData={footer.data} ftrIcon={site.data}/>
    </>
  );
};

export default FooterServer;
