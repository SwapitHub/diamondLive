import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Banner } from "../Banner";
import { ShopDiamondShape } from "../ShopDiamondShape";
import { ShopDiamondCotegory } from "../ShopDiamondCotegory";
import { SeeProducts } from "../SeeProducts";
import { BridalJewellery } from "../BridalJewellery";
import { AnniversaryRings } from "../AnniversaryRings";
import { CelebarteLove } from "../CelebarteLove";
import { WeddingCollection } from "../WeddingCollection";
import { EngagementBridal } from "../EngagementBridal";
import LoveBrilliance from "../LoveBrilliance";
import { AnniversaryRingFeatured } from "../AnniversaryRingFeatured";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
const window = new JSDOM('').window;
const purify = DOMPurify(window);


const fetchDiamond = async () => {
    let shapeData = [];
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/diamondshape`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      shapeData = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return shapeData;
  };

  const fetchBanner = async () => {
    let homeContext = [];
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/banners`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      homeContext = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return homeContext;
  };

  // ============see products and wedding collection api start

  
    const fetchshopbystyleHome = async () => {
    let shopStyle = [];
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/shopbystyle`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      shopStyle = await response.json();
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return shopStyle;
  };

  const fetchShopStyle = async () => {
    let shopStyle = [];
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/product-style`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      shopStyle = await response.json();
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return shopStyle;
  };

  const fetchHomeAllSections = async () => {
    let homeAllSections = [];
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/homecontent`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      homeAllSections = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return homeAllSections;
  };

  const fetchEngagementRings = async () => {
    let engagementRings = [];
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/widget/Natural diamonds`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      engagementRings = await response.json();
      engagementRings.data.description = purify.sanitize(engagementRings.data?.description);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return engagementRings;
  };

  const fetchWeddingJewelry = async () => {
    let engagementRings = [];
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/widget/Gemstones`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      engagementRings = await response.json();
      engagementRings.data.description = purify.sanitize(engagementRings.data?.description);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return engagementRings;
  };

  const fetchWeddingCollection = async () => {
    let weddingCollection = [];
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/widget/Lab Grown Diamonds`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      weddingCollection = await response.json();
      weddingCollection.data.description = purify.sanitize(weddingCollection.data?.description);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return weddingCollection;
  };
export default async function HomePageData() {
  const shapeData = await fetchDiamond();
  const homeContext = await fetchBanner();
  const shopbystyleHome = await fetchshopbystyleHome();
  
  const shopStyle = await fetchShopStyle();
  const homeAllSections = await fetchHomeAllSections();
  const engagementRingMain = await fetchEngagementRings();
  const weddingJewelry = await fetchWeddingJewelry();
  const weddingCollection = await fetchWeddingCollection();
 
    
    return (
      <>      
        {/* <pre>{JSON.stringify(homeDetail.data, null, 2)}</pre> */}
        <div className="home-page">
        <Banner homeContext={homeContext}/>
        <ShopDiamondShape shapeData={shapeData.data} />
        <SeeProducts shopbystyleHome={shopbystyleHome.data}/>
        <ShopDiamondCotegory shopStyle={shopStyle.data}/>
        <BridalJewellery home={homeAllSections}/>
        <AnniversaryRings home={homeAllSections.data}/>
        <CelebarteLove home={homeAllSections}/>
        <WeddingCollection engagementRingMain={engagementRingMain.data} weddingJewelry={weddingJewelry.data} weddingCollection={weddingCollection.data}/>

        <EngagementBridal home={homeAllSections}/>

        <LoveBrilliance home={homeAllSections}/>
        
        <AnniversaryRingFeatured home={homeAllSections}/>
      </div>
      </>
    );
}

