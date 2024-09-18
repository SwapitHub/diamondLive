import { WeddingBanner } from "./WeddingBanner";
import { WeddingByStyle } from "./WeddingByStyle";
import { WeddingEndsSoon } from "./WeddingEndsSoon";
import { WeddingPopular } from "./WeddingPopular";
import { WeddingReadyShip } from "./WeddingReadyShip";
import { WeddingSets } from "./WeddingSets";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
const window = new JSDOM('').window;
const purify = DOMPurify(window);
const coveted = async () => {
  let covetedProducts = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/coveted-products/wedding-band`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    covetedProducts = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return covetedProducts;
};

const home = async () => {
  let style = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/homecontent`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    style = await response.json();
    style.data.ring_promotion_banner_desc_2 = purify.sanitize(style.data?.ring_promotion_banner_desc_2);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return style;
};

export const WeddingBands = async () => {
  const covetedProducts = await coveted();
  const homeContent = await home();
  return (
    <>
      {/* <HeaderMetaTag
        mainCategory={mainCategory}
        subCategory={subCategory}
        image="https://d24ppbhzdyfrur.cloudfront.net/uploads/image_url/s3_image/36274429/1701007RubyCushion1_17ct_3932_77c52f06-f67b-4338-8cd9-abcd817c178c.jpg"
        currentUrl={currentUrl}
      /> */}
      <WeddingBanner />
      <WeddingSets bridalSet={homeContent.data}/>
      <WeddingByStyle />

      <WeddingEndsSoon />

      <WeddingPopular covetedWeddingBands={covetedProducts.data} />
      <WeddingReadyShip />
    </>
  );
};
