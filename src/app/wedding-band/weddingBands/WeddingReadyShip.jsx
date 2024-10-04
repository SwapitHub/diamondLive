"use client"
import { UserContext } from '@/app/context/UserContext'
import Link from 'next/link'
import { useContext } from 'react'

export const WeddingReadyShip = () => {
    const {imgAssetsUrl} = useContext(UserContext)
    return (
        <>
            <section className="ready-ship-banner">
                <div className="container">
                    <div className="inner-banner-wrapped"                    
                    >
                         <div className='Bespoke-banner'>
                            <div className='desktop'>
                        <img  src={`${imgAssetsUrl}/frontend/images/readyBands.jpg`} alt="wedding-ship"  width="auto"  height="auto"  />
                            </div>
                            <div className='mobile'>

                        <img   src={`${imgAssetsUrl}/frontend/images/band-mob.jpg`} alt="wedding-ship"  width="auto"  height="auto"  />
                            </div>

                    </div>
                        <div className="banner-content">
                            <h2>Looking for a matching wedding band?</h2>
                            <p>Select your engagement ring, then discover the perfect wedding ring to match.</p>
                            <div className="btn-bar">
                                <Link href="/engagement-rings/start-with-a-setting?bridalSets=true" className="btn-custom">Get Started</Link>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </section>
        </>
    )
}
