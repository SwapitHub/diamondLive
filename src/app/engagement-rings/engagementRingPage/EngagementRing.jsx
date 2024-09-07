"use client"
import { ShopDiamondCotegory } from '@/app/component/homePages/ShopDiamondCotegory'
import { ShopDiamondShape } from '@/app/component/homePages/ShopDiamondShape'
import { UserContext } from '@/app/context/UserContext'
import axios from 'axios'
import { useContext, useMemo, useState } from 'react'
import { EngagementBanner } from './EngagementBanner'
import { OwnEngagementRing } from './OwnEngagementRing'
import { RingEducation } from './RingEducation'
import { RingEndsSoon } from './RingEndsSoon'
import { RingExclusive } from './RingExclusive'
import { RingReadyToShip } from './RingReadyToShip'

export const EngagementRing = () => {
 
    const { baseUrl } = useContext(UserContext);
    const [shapeData, setShapeData] = useState([]);
    const [shopStyle, setShopStyle] = useState([])
    const [covetedProducts, setCovetedProducts] = useState([])
  
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
          const response = await axios.get(`${baseUrl}/coveted-products/engagement-rings`);
          setCovetedProducts(response.data.data);
        } catch (error) {
          console.log("shop style api error:", error);
        }
      }; 
      fetchData();
    }, []);
    const currentUrl = window.location.href;
    return (
        <>
       {/* <HeaderMetaTag
        mainCategory={mainCategory}
        subCategory={subCategory}
        image="https://d24ppbhzdyfrur.cloudfront.net/uploads/image_url/s3_image/36274429/1701007RubyCushion1_17ct_3932_77c52f06-f67b-4338-8cd9-abcd817c178c.jpg"
        currentUrl={currentUrl}
      /> */}
            <EngagementBanner />
            <ShopDiamondShape shapeData={shapeData} />
            <OwnEngagementRing covetedProducts={covetedProducts}/>
            <RingEndsSoon />
            <ShopDiamondCotegory shopStyle={shopStyle}/>
            <RingReadyToShip />
            <RingExclusive />
            {/* <RingReviews /> */}
            <RingEducation />
            {/* <RingFaq /> */}
        </>
    )
}
