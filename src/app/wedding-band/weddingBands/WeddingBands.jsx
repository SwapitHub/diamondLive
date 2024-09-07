"use client"
import axios from 'axios'
import { useContext, useMemo, useState } from 'react'
import { WeddingBanner } from './WeddingBanner'
import { WeddingByStyle } from './WeddingByStyle'
import { WeddingEndsSoon } from './WeddingEndsSoon'
import { WeddingPopular } from './WeddingPopular'
import { WeddingReadyShip } from './WeddingReadyShip'
import { WeddingSets } from './WeddingSets'
import { UserContext } from '@/app/context/UserContext'

export const WeddingBands = () => {
    const {baseUrl} = useContext(UserContext);
    const [covetedWeddingBands, setCovetedWeddingBands] = useState([])
  
    useMemo(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${baseUrl}/coveted-products/wedding-band`);
            setCovetedWeddingBands(response.data.data);
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
            <WeddingBanner/>
            <WeddingSets/>
            <WeddingByStyle/>
       
            <WeddingEndsSoon/>
            
            <WeddingPopular covetedWeddingBands={covetedWeddingBands}/>
            <WeddingReadyShip/>
          
           
         
          
        </>
    )
}
