
import React from 'react';
import { ShopDiamondShape } from './StaticBanner';

export default async function BannersPage() {
  const response = await fetch('https://api.rocksama.com/api/v1/diamondshape');
  
  if (!response.ok) {
    console.error('Failed to fetch data');
    return <div>Error fetching banners</div>;
  }

  const banners = await response.json();

  return (
    <div>
      <h1>Banners</h1>
      <ul>
       {banners.data[0].shape}
       <h1><img src={banners.data[0].banner}></img></h1>
       <ShopDiamondShape shapeData={banners} icon={banners.data[2].icon}/>
      </ul>
    </div>
  );
}
