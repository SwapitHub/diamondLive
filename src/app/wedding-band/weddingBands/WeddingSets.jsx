"use client"
import { UserContext } from "@/app/context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export const WeddingSets = ({bridalSet}) => {
   
    const {imgAssetsUrl} = useContext(UserContext)
    
    return (
        <>
            <div className="wedding-page ">
                <div className="container">
                    <div className="bridalSets-necklaces flex ">
                        <div className="bridalSets flex">
                            <div className="bridalSets-text">
                                <h3>Women's Wedding Bands</h3>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: bridalSet.ring_promotion_banner_desc_2,
                                    }}
                                ></span>
                                <div className="bridalSets-btn">
                                    <Link className="button" href={`/wedding-band/women/womens-wedding`}>
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img">
                                <img src={`${imgAssetsUrl}/frontend/images/hands1.jpg`} alt="ring_promotion_banner_desktop_2" loading="lazy"  width="auto"  height="auto"  />
                            </div>
                          
                        </div>
                        <div className="bridalSets flex">
                            <div className="bridalSets-text">
                                <h3>Men's Wedding Bands</h3>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: bridalSet.ring_promotion_banner_desc_2,
                                    }}
                                ></span>
                                <div className="bridalSets-btn">
                                    <Link className="button" href={`/wedding-band/men/mens-wedding`}>
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img">
                                <img src={`${imgAssetsUrl}/frontend/images/hand3.jpg`} alt="ring_promotion_banner_desktop_2" loading="lazy"  width="auto"  height="auto"  />
                            </div>
                          
                        </div>
                      
                    </div>
                </div>
            </div>
        </>

    );
};
