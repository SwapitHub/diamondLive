import { GemstoneBanner } from "./GemstoneBanner";
import { GemstoneByStyle } from "./GemstoneByStyle";
import { GemstoneFaq } from "./GemstoneFaq";
import { GemstoneShopByShape } from "./GemstoneShopByShape";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const gemstone = async () => {
  let diamond = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/gemstone-attributes`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    diamond = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return diamond;
};

const faqs = async () => {
  let style = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/faq`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    style = await response.json();
    if (Array.isArray(style.data)) {
      style.data.forEach(item => {
        
        item.answer = purify.sanitize(item.answer);
       
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return style;
};

export const GemstoneBands = async () => {
  const gemstoneAttribute = await gemstone();
  const faq = await faqs();

  

  return (
    <>
      
      <GemstoneBanner />
      <GemstoneShopByShape gemstoneFilterData={gemstoneAttribute.data}/>
      <GemstoneByStyle gemstoneBands={gemstoneAttribute.data} />
      {/* <GemstoneSets />
      <GemstoneOwnEngagementRing />
      <GemstoneReviews />
      <GemstoneEducation birthStone={birthStone} gemstoneMeaning={gemstoneMeaning} sapphireBuying={sapphireBuying} diamondGuide={diamondGuide}/> */}
      <GemstoneFaq faqData={faq.data}/>
    </>
  );
};
