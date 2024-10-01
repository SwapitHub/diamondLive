
import { EngagementBanner } from "./EngagementBanner";
import { OwnEngagementRing } from "./OwnEngagementRing";
import { RingEducation } from "./RingEducation";
import { RingEndsSoon } from "./RingEndsSoon";
import { RingReadyToShip } from "./RingReadyToShip";
import { RingExclusive } from "./RingExclusive";
import { ShopDiamondShape } from "@/app/[...home]/ShopDiamondShape";
import { ShopDiamondCotegory } from "@/app/[...home]/ShopDiamondCotegory";


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

const productStyle = async () => {
  let style = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/product-style`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    style = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return style;
};

const covetedProducts = async () => {
  let coveted = [];
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/coveted-products/engagement-rings`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    coveted = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return coveted;
};
const EngagementRing = async({roseGold,yellowGold,platinumRings,whiteGold,bridalSetRing}) => {

  const diamond = await diamondShape();
  const shopStyle = await productStyle();
  const covetedProduct = await covetedProducts();
  
  return (
    <>
      <EngagementBanner />
      <ShopDiamondShape shapeData={diamond.data} />
      <OwnEngagementRing covetedProducts={covetedProduct.data} />
      <RingEndsSoon />
      <ShopDiamondCotegory shopStyle={shopStyle.data} />
      <RingReadyToShip />
      <RingExclusive roseGold={roseGold} yellowGold={yellowGold} platinumRings={platinumRings} whiteGold={whiteGold}bridalSetRing={bridalSetRing}/>
      {/* <RingReviews /> */}
      <RingEducation />
      {/* <RingFaq /> */}
    </>
  );
};

export default EngagementRing;
