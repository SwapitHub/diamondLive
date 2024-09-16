import { AnniversaryRingFeatured } from "../AnniversaryRingFeatured";
import { AnniversaryRings } from "../AnniversaryRings";
import { Banner } from "../Banner";
import { BridalJewellery } from "../BridalJewellery";
import { CelebarteLove } from "../CelebarteLove";
import { EngagementBridal } from "../EngagementBridal";
import LoveBrilliance from "../LoveBrilliance";
import { SeeProducts } from "../SeeProducts";
import { ShopDiamondCotegory } from "../ShopDiamondCotegory";
import { ShopDiamondShape } from "../ShopDiamondShape";
import { WeddingCollection } from "../WeddingCollection";

export default async function HomePageData() {
    const response = await fetch(`https://api.rocksama.com/api/v1/diamondshape`);
    if (!response.ok) {
        console.error('Failed to fetch diamondshape data');
        return <div>Error fetching diamondshape</div>;
    }
  
    const shapeData = await response.json();

    const response_2 = await fetch(`https://api.rocksama.com/api/v1/banners`);
    if (!response_2.ok) {
        console.error('Failed to fetch product style data');
        return <div>Error fetching product style</div>;
    }
  
    const homeContext = await response_2.json();  


  // ============see products and wedding collection api start
    const response_3 = await fetch(`https://api.rocksama.com/api/v1/widget/Trellis Rings`);
    if (!response_3.ok) {
        console.error('Failed to fetch product style data');
        return <div>Error fetching product style</div>;
    }
  
    const anniversaryRings = await response_3.json(); 

    const response_4 = await fetch(`https://api.rocksama.com/api/v1/widget/Vintage Rings`);
    if (!response_4.ok) {
        console.error('Failed to fetch product style data');
        return <div>Error fetching product style</div>;
    }
  
    const diamondPendants = await response_4.json(); 

    const response_5 = await fetch(`https://api.rocksama.com/api/v1/widget/Eternity Rings`);
    if (!response_5.ok) {
        console.error('Failed to fetch product style data');
        return <div>Error fetching product style</div>;
    }
  
    const tennisBracelets = await response_5.json(); 

    const response_1 = await fetch(`https://api.rocksama.com/api/v1/widget/Nature Inspired Rings`);
    if (!response_1.ok) {
        console.error('Failed to fetch product style data');
        return <div>Error fetching product style</div>;
    }
  
    const diamondStuds = await response_1.json(); 


    const response_7 = await fetch(`https://api.rocksama.com/api/v1/product-style`);
    if (!response_7.ok) {
        console.error('Failed to fetch product style data');
        return <div>Error fetching product style</div>;
    }
  
    const shopStyle = await response_7.json();


    const response_6 = await fetch(`https://api.rocksama.com/api/v1/homecontent`);
    if (!response_6.ok) {
        console.error('Failed to fetch product style data');
        return <div>Error fetching product style</div>;
    }
  
    const homeAllSections = await response_6.json();


    const response_10 = await fetch(`https://api.rocksama.com/api/v1/widget/Natural diamonds`);
    if (!response_10.ok) {
        console.error('Failed to fetch product style data');
        return <div>Error fetching product style</div>;
    }
  
    const engagementRings = await response_10.json(); 

    const response_8 = await fetch(`https://api.rocksama.com/api/v1/widget/Gemstones`);
    if (!response_8.ok) {
        console.error('Failed to fetch product style data');
        return <div>Error fetching product style</div>;
    }
  
    const weddingJewelry = await response_8.json(); 

    const response_9 = await fetch(`https://api.rocksama.com/api/v1/widget/Lab Grown Diamonds`);
    if (!response_9.ok) {
        console.error('Failed to fetch product style data');
        return <div>Error fetching product style</div>;
    }
  
    const weddingCollection = await response_9.json(); 
    
    return (
      <>      
        {/* <pre>{JSON.stringify(homeDetail.data, null, 2)}</pre> */}
        <div className="home-page">
        <Banner homeContext={homeContext}/>
        <ShopDiamondShape shapeData={shapeData} />
        <SeeProducts anniversaryRings={anniversaryRings} diamondPendants={diamondPendants} tennisBracelets={tennisBracelets} diamondStuds={diamondStuds}/>
        <ShopDiamondCotegory shopStyle={shopStyle}/>
        <BridalJewellery home={homeAllSections}/>
        <AnniversaryRings home={homeAllSections}/>
        <CelebarteLove home={homeAllSections}/>
        <WeddingCollection engagementRings={engagementRings} weddingJewelry={weddingJewelry} weddingCollection={weddingCollection}/>

        <EngagementBridal home={homeAllSections}/>

        <LoveBrilliance home={homeAllSections}/>
        
        <AnniversaryRingFeatured home={homeAllSections}/>
      </div>
      </>
    );
}

