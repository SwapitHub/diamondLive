import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import Link from 'next/link';

export const ContinueShoping = () => {
  const {imgAssetsUrl} = useContext(UserContext)
  return (
    <div className="wishlist-shopping">
    <div className="category-tiles">
      <h3>Continue Shopping</h3>
    </div>
    <div className="wishlist-shoping-inner">
      <div className="category-tiles-box">
        <Link href="/engagement-rings/start-with-a-setting">
          <div className="wisher-imager">
            <img  width="auto"  height="auto"  
              src={`${imgAssetsUrl}/public/images/home/Engagement-Rings.jpg`}
              alt="diamond"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;                                                                    
              }}
            />
          </div>
          <div className="category-title">
            <h4>Engagement Rings</h4>
          </div>
        </Link>
      </div>
      <div className="category-tiles-box">
        <Link href="/wedding-band">
          <div className="wisher-imager">
            <img  width="auto"  height="auto"  
              src={`${imgAssetsUrl}/frontend/images/ring.jpg`}
              alt="ring"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;                                                                    
              }}
            />
          </div>
          <div className="category-title">
            <h4>Wedding Rings</h4>
          </div>
        </Link>
      </div>
      <div className="category-tiles-box">
        <Link href="/engagement-rings/start-with-a-gemstone">
          <div className="wisher-imager">
            <img  width="auto"  height="auto"  
              src={`${imgAssetsUrl}/public/images/home/Gemstone-Rings.jpg`}
              alt="rings"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;                                                                    
              }}
            />
          </div>
          <div className="category-title">
            <h4>Gemstone Rings</h4>
          </div>
        </Link>
      </div>
      <div className="category-tiles-box">
        <Link href="/engagement-rings/start-with-a-setting?bridal-sets=true">
          <div className="wisher-imager">
            <img  width="auto"  height="auto"  
              src={`${imgAssetsUrl}/frontend/images/chain.jpg`}
              alt="chain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;                                                                    
              }}
            />
          </div>
          <div className="category-title">
            <h4>Bridal Jewelery</h4>
          </div>
        </Link>
      </div>
    </div>
  </div>
  )
}
