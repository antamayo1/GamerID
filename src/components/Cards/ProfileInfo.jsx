import React from 'react'

const ProfileInfo = ({ onLogout , userInfo}) => {
    return (
        userInfo && (<div className="flex items-center gap-3">
            <div>
                <p className="text-sm font-medium">{userInfo?.username}</p>
                <button className="text-sm text-slate-700 underline" onClick={ onLogout }>Log out</button>
            </div>
        </div>)
    )
}

export default ProfileInfo