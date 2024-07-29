import React from 'react'
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

    return (
        <>
            <nav className="bg-white flex items-center justify-between px-6 py-2 drop-shadow w-screen sticky">
                <h2 className="md:text-4xl text-2xl text-black py-2 font-bold">Gamer Card</h2>
                <ProfileInfo
                    userInfo={ userInfo } onLogout={ onLogout }
                />
            </nav>
        </>
    )
}

export default Navbar