"use client"
import React, { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Link from 'next/link'
import { UserContext } from '@/app/context/UserContext'

export const RingReadyToShip = () => {
    const {imgAssetsUrl} = useContext(UserContext)
    return (
        <section className="ready-ship-banner tp"
        
        >
            <div className="container">
                <div className="inner-banner-wrapped" 
               
                >
                    <div className='Bespoke-banner'>
                        <LazyLoadImage width="auto"  height="auto"   className='desktop' src={`${imgAssetsUrl}/frontend/images/readyRing.jpg`} alt="banner"  />
                        <LazyLoadImage width="auto"  height="auto"   className='mobile'  src={`${imgAssetsUrl}/frontend/images/beskope-mob.jpg`} alt="banner" />

                    </div>
                    <div className="banner-content">
                        <h2>Bespoke Designs</h2>
                        <p>Can’t find what you’re looking for? Design your own unique style using our customization form</p>
                        <div className="btn-bar">
                            <Link href="/engagement-rings/start-with-a-setting" className="btn-custom">See to Page Design</Link>
                        </div>
                    </div>
                   
                </div>
            </div>
        </section>
    )
}
