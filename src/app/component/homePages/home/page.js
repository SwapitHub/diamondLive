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
    try {
        // Run API calls in parallel
        const [
            shapeDataResponse,
            bannersResponse,
            anniversaryRingsResponse,
            diamondPendantsResponse,
            tennisBraceletsResponse,
            diamondStudsResponse,
            shopStyleResponse,
            homeAllSectionsResponse,
            engagementRingsResponse,
            weddingJewelryResponse,
            weddingCollectionResponse
        ] = await Promise.all([
            fetch(`https://api.rocksama.com/api/v1/diamondshape`),
            fetch(`https://api.rocksama.com/api/v1/banners`),
            fetch(`https://api.rocksama.com/api/v1/widget/Trellis Rings`),
            fetch(`https://api.rocksama.com/api/v1/widget/Vintage Rings`),
            fetch(`https://api.rocksama.com/api/v1/widget/Eternity Rings`),
            fetch(`https://api.rocksama.com/api/v1/widget/Nature Inspired Rings`),
            fetch(`https://api.rocksama.com/api/v1/product-style`),
            fetch(`https://api.rocksama.com/api/v1/homecontent`),
            fetch(`https://api.rocksama.com/api/v1/widget/Natural diamonds`),
            fetch(`https://api.rocksama.com/api/v1/widget/Gemstones`),
            fetch(`https://api.rocksama.com/api/v1/widget/Lab Grown Diamonds`)
        ]);

        // Check if any of the fetch requests failed
        if (!shapeDataResponse.ok || !bannersResponse.ok || !anniversaryRingsResponse.ok || !diamondPendantsResponse.ok || 
            !tennisBraceletsResponse.ok || !diamondStudsResponse.ok || !shopStyleResponse.ok || 
            !homeAllSectionsResponse.ok || !engagementRingsResponse.ok || !weddingJewelryResponse.ok || 
            !weddingCollectionResponse.ok) {
            console.error('Error fetching data from one or more endpoints');
            return <div>Error fetching data</div>;
        }

        // Parse JSON responses
        const shapeData = await shapeDataResponse.json();
        const homeContext = await bannersResponse.json();
        const anniversaryRings = await anniversaryRingsResponse.json();
        const diamondPendants = await diamondPendantsResponse.json();
        const tennisBracelets = await tennisBraceletsResponse.json();
        const diamondStuds = await diamondStudsResponse.json();
        const shopStyle = await shopStyleResponse.json();
        const homeAllSections = await homeAllSectionsResponse.json();
        const engagementRings = await engagementRingsResponse.json();
        const weddingJewelry = await weddingJewelryResponse.json();
        const weddingCollection = await weddingCollectionResponse.json();

        return (
            <>      
                <div className="home-page">
                    <Banner homeContext={homeContext}/>
                    <ShopDiamondShape shapeData={shapeData} />
                    <SeeProducts 
                        anniversaryRings={anniversaryRings} 
                        diamondPendants={diamondPendants} 
                        tennisBracelets={tennisBracelets} 
                        diamondStuds={diamondStuds}
                    />
                    <ShopDiamondCotegory shopStyle={shopStyle}/>
                    <BridalJewellery home={homeAllSections}/>
                    <AnniversaryRings home={homeAllSections}/>
                    <CelebarteLove home={homeAllSections}/>
                    <WeddingCollection 
                        engagementRings={engagementRings} 
                        weddingJewelry={weddingJewelry} 
                        weddingCollection={weddingCollection}
                    />
                    <EngagementBridal home={homeAllSections}/>
                    <LoveBrilliance home={homeAllSections}/>
                    <AnniversaryRingFeatured home={homeAllSections}/>
                </div>
            </>
        );
    } catch (error) {
        console.error('An error occurred while fetching the data:', error);
        return <div>Error fetching data</div>;
    }
}
