import React from 'react'

import PageAnimationWrapper from '../../common/PageAnimationWrapper/PageAnimationWrapper'

import "./HomeCard.scss"


const HomeCard = ({ image, name, index, about_algo }) => {
    return (
        <>
            <PageAnimationWrapper key={name} transition={{ duration: index, delay: index * 0.14 }}>

                <div className='card__body'>
                    <img
                        src={image}
                        className='card__image'
                    />
                    <div className="card__bottom">
                        <h4>
                            {name}
                        </h4>
                        <p>
                            {about_algo}
                        </p>
                    </div>
                </div>

            </PageAnimationWrapper>
        </>
    )
}

export default HomeCard
