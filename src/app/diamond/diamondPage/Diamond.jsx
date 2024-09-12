"use client"
import { UserContext } from '@/app/context/UserContext';
import axios from 'axios';
import { useContext, useMemo, useState } from 'react';
import { DiamondBanner } from './DiamondBanner';
import { DiamondEdu } from './DiamondEdu';
import { DiamondFaq } from './DiamondFaq';
import { DiamondReadyToShip } from './DiamondReadyToShip';
import { DiamondReviews } from './DiamondReviews';
import { DiamondSets } from './DiamondSets';
import { ShopDiamondShape } from '@/app/component/homePages/ShopDiamondShape';


export const DiamondPageMain = () => {
  const { baseUrl } = useContext(UserContext);
  const [shapeData, setShapeData] = useState([]);
 
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
  const currentUrl = window.location.href;
  return (
    <>
  
      <DiamondBanner />
      <ShopDiamondShape shapeData={shapeData} />
      <DiamondReadyToShip />
      {/* <DiamondCommitment /> */}
      {/* <DiamondSets />
      <DiamondReviews /> */}
      <DiamondEdu />
      <DiamondFaq />
    </>
  )
}
