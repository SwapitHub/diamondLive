
import { ShopDiamondShape } from "@/app/[...home]/ShopDiamondShape";
import { DiamondBanner } from "./DiamondBanner";
import { DiamondEdu } from "./DiamondEdu";
import { DiamondFaq } from "./DiamondFaq";
import { DiamondReadyToShip } from "./DiamondReadyToShip";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const diamondShape = async () => {
  let diamond = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/diamondshape`);
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

const DiamondPageMain = async () => {
  const shape = await diamondShape();
  const faq = await faqs();

  return (
    <>
      <DiamondBanner />
      <ShopDiamondShape shapeData={shape.data} />
      <DiamondReadyToShip />
      {/* <DiamondCommitment /> */}
      {/* <DiamondSets />
      <DiamondReviews /> */}
      <DiamondEdu />
      <DiamondFaq shapeData={faq.data}/>
    </>
  );
};

export default DiamondPageMain;
