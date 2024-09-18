"use client"
import { UserContext } from '@/app/context/UserContext'
import Link from 'next/link'
import { useContext } from 'react'

export const DiamondReadyToShip = () => {
    const {imgAssetsUrl} = useContext(UserContext)
    return (
        <section className="ready-ship-banner tp diamond">
            <div className="container">
                <div className="inner-banner-wrapped">
                    <div className="banner-content">
                        <h2>Design Your Own Diamond
                            Ring</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since..</p>
                        <div className="btn-bar">
                            <Link href="/diamond/start-with-a-diamond" className="btn-custom">Start with a Natural Diamond</Link>
                            <Link href="/diamond/start-with-a-diamond/lab_grown" className="btn-custom bg-trans">Start with a Lab Diamond</Link>
                        </div>
                    </div>
                    <div className="banner-img">
                        <img  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/diamondringer.png`} alt="banner-img"/>
                    </div>
                </div>
            </div>
        </section>
    )
}
