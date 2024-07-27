import React,{ useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
const Navbar = ({userInfo}) => {

    // constants
    const navigate = useNavigate();
    
    // functions for react hooks
    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleSearch = () => {

    };

    const onClearSearch = () => {
        setSearchQuery("");
    };

    return (
        <>
            <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
                <h2 className="text-xl font-medium text0-black py-2">Gamer Card</h2>
                <ProfileInfo
                    userInfo={userInfo} onLogout={onLogout}
                />
            </div>
        </>
    )
}

export default Navbar