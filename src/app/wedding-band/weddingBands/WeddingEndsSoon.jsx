"use client"
import { UserContext } from '@/app/context/UserContext'
import { useContext } from 'react'

export const WeddingEndsSoon = () => {
    const {imgAssetsUrl} = useContext(UserContext)
    return (
        <>
            <div className="endsSoon ends-soon">
                <div className="container">
                    <div className="flex">
                        <div className="endsSoon-img">
                            <img className='desktop' src={`${imgAssetsUrl}/frontend/images/endRings.png`} alt="endSoon"  width="auto"  height="auto"  />
                            <img className='mobile'  src={`${imgAssetsUrl}/frontend/images/off-banner-mob.jpg`} alt="endSoon" loading="lazy"  width="auto"  height="auto"  />

                        </div>
                        <div className="endsSoon-text ends-soon-txt">
                            <h2>Offer</h2>
                            <p>Enjoy a 10% discount with purchase of over $2000</p>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
