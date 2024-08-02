import React from 'react'

const LoginIntro = ({header, message}) => {
    return (
    <>
        <div className="flex flex-col justify-center bg-gradient-to-b from-blue-400 to-blue-600 text-white md:p-8 p-3">
            <h1 className="md:text-4xl font-bold text-lg">{header}</h1>
            <p className="mt-2 md:text-2xl text-sm">{message}</p>
        </div>
    </>
    );
};

export default LoginIntro