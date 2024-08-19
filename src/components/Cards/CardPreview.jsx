import React from 'react'

const CardPreview = ({userInfo}) => {

    return (
        <>
        <div className="p-23 flex flex-col m-12">
            <div className={`bg-green-300 rounded md:card-size card-size-mobile transition-transform transform-gpu hover:-translate-y-2 hover:shadow-lg`}>{userInfo?.username}</div>
        </div>
        </>
    )
}

export default CardPreview