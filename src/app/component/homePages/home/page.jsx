"use client"; 
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import  {Banner}  from "../Banner";
import { ShopDiamondShape } from "../ShopDiamondShape";
import { SeeProducts } from "../SeeProducts";
import { ShopDiamondCotegory } from "../ShopDiamondCotegory";
import { BridalJewellery } from "../BridalJewellery";
import { AnniversaryRings } from "../AnniversaryRings";
import { CelebarteLove } from "../CelebarteLove";
import { EngagementBridal } from "../EngagementBridal";
import LoveBrilliance from "../LoveBrilliance";
import { AnniversaryRingFeatured } from "../AnniversaryRingFeatured";
import { WeddingCollection } from "../WeddingCollection";
import { UserContext } from "@/app/context/UserContext";

 const HomePage = () => {
  const [shapeData, setShapeData] = useState([]);
  const [shopStyle, setShopStyle] = useState([]);
  const [homeContext, setHomeContext] = useState([]);
  const[homeAllSections, setHomeAllSections] = useState([])
  const {   
    baseUrl
  } = useContext(UserContext);
  useMemo(() => {
    axios
      .get(`${baseUrl}/diamondshape`)
      .then((res) => {
        setShapeData(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);


  useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product-style`);
        setShopStyle(response.data.data);
      } catch (error) {
        console.log("shop style api error:", error);
      }
    };

    fetchData();
  }, []);

  useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/banners`
        );
        const data = response.data.data;

        setHomeContext(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/homecontent`
        );
        const data = response.data.data;

        setHomeAllSections(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // ============see products and wedding collection api start
  const [anniversaryRings, setAnniversaryRings] = useState();
  const [diamondPendants, setDiamondPendants] = useState()
  const [tennisBracelets, setTennisBracelets] = useState()
  const [diamondStuds, setDiamondStuds] = useState()
  useMemo(() => {
     axios
       .get(`${baseUrl}/widget/Trellis Rings`)
       .then((res) => {
         setAnniversaryRings(res.data.data);
       })
       .catch((error) => {
         console.log(error);
       });
   }, []);
 
   useMemo(() => {
     axios
       .get(`${baseUrl}/widget/Vintage Rings`)
       .then((res) => {
         setDiamondPendants(res.data.data);
       })
       .catch((error) => {
         console.log(error);
       });
   }, []);
 
   useMemo(() => {
     axios
       .get(`${baseUrl}/widget/Eternity Rings`)
       .then((res) => {
         setTennisBracelets(res.data.data);
       })
       .catch((error) => {
         console.log(error);
       });
   }, []);
 
   useMemo(() => {
     axios
       .get(`${baseUrl}/widget/Nature Inspired Rings`)
       .then((res) => {
         setDiamondStuds(res.data.data);
       })
       .catch((error) => {
         console.log(error);
       });
   }, []);


  const [engagementRings, setEngagementRings]= useState()
  const[weddingJewelry,setWeddingJewelry] = useState()
  const[weddingCollection, setWeddingCollection] =useState()
  useMemo(() => {
    axios
      .get(`${baseUrl}/widget/Natural diamonds`)
      .then((res) => {
        setEngagementRings(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useMemo(() => {
    axios
      .get(`${baseUrl}/widget/Gemstones`)
      .then((res) => {
        setWeddingJewelry(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useMemo(() => {
    axios
      .get(`${baseUrl}/widget/Lab Grown Diamonds`)
      .then((res) => {
        setWeddingCollection(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  // ============see products and wedding collection api end
  const[siteInfo,setSiteInfo]= useState()
  useMemo(() => {
    axios
      .get(`${baseUrl}/siteinfo`)
      .then((res) => {
        setSiteInfo(res.data.data);
      })
      .catch(() => {
        console.log("profile API is not working");
      });
  }, []);

  
  return (
    <>
      <div className="home-page">
        <Banner homeContext={homeContext}/>
        <ShopDiamondShape shapeData={shapeData} />
        <SeeProducts anniversaryRings={anniversaryRings} diamondPendants={diamondPendants} tennisBracelets={tennisBracelets} diamondStuds={diamondStuds}/>
        <ShopDiamondCotegory shopStyle={shopStyle}/>
        <BridalJewellery home={homeAllSections}/>
        <AnniversaryRings/>
        <CelebarteLove home={homeAllSections}/>
        <WeddingCollection engagementRings={engagementRings} weddingJewelry={weddingJewelry} weddingCollection={weddingCollection}/>

        <EngagementBridal home={homeAllSections}/>

        <LoveBrilliance home={homeAllSections}/>
        
        <AnniversaryRingFeatured home={homeAllSections}/>
      </div>
    </>
  );
};

export default HomePage