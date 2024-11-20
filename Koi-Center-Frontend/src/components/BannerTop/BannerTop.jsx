import React from 'react'
import "./BannerTop.css"
import bannertop from "../../assets/img/bannertop.png"
function BannerTop({title, subTitle}) {
    return (
        <div className='banner-top'>
            <div className='banner-top-content'>
                <img className='banner-top-img' src={bannertop} alt="banner-top" />
                <div className='banner-top-title'>
                    <h5>{subTitle}</h5>
                    <h1>{title}</h1>
                </div>
            </div>

        </div>
    )
}

export default BannerTop