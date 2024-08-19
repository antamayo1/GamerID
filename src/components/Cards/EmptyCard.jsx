import React from 'react'

const EmptyCard = ({ imageSource, message}) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={ imageSource } alt="Add Game" className="w-60 mb"/>
            You have no games! Press + to add.
        </div>
    )
}

export default EmptyCard