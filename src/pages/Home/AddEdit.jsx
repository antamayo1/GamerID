import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance';

const AddEdit = ({ GameData, type, getAllGames, onClose, showToastMessage}) => {

    const [game, setGame] = useState(GameData?.game_title || "");
    const [UID, setUID] = useState(GameData?.game_UID || "");
    const [error, setError] = useState(null);

    const addGameEntry = async () => {
        try {
            const response = await axiosInstance.post("/add-game", {
                req_gameTitle: game,
                req_gameUID: UID
            });
            if(response.data && response.data.message){
                showToastMessage("Game Added Successfully", "add");
                getAllGames();
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
        }
    };

    const editGameEntry = async () => {
        const gameCardID = GameData._id;
        try {
            const response = await axiosInstance.put("/edit-game/" + gameCardID, {
                req_gameTitle: game,
                req_gameUID: UID
            });
            if(response.data && response.data.message){
                showToastMessage("Game Edited Successfully", "edit");
                getAllGames();
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
        }
    };

    const handleAddGame = () => {
        if(!game){
            setError("Please enter a game name.");
            return;
        }
        if(!UID){
            setError("Please enter a UID.");
            return;
        }

        setError("");

        if(type==="edit"){
            editGameEntry();
        } else {
            addGameEntry();
        }
    }

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={ onClose }>
                <MdClose className="text-xl text-slate-400"/>
            </button>
            <div className="flex flex-col gap-2">
                <label className="input-label">Game</label>
                <input
                    type="text"
                    className="text-xl text-slate-950 outline-none"
                    placeholder="Enter Game Name"
                    value={game}
                    onChange={({ target }) => setGame(target.value)}
                />
                
            </div>
            <div className="flex flex-col gap-2">
                <label className="input-label">Tag/UID</label>
                <input
                    type="text"
                    className="text-xl text-slate-950 outline-none"
                    placeholder="Enter Tag/UID"
                    value={UID}
                    onChange={({ target }) => setUID(target.value)}
                />
            </div>
            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
            <button className="btn-primary fnot-medium mt-5 p-3" onClick={handleAddGame}>
                {type === "edit"? "Save Changes" : "Add Game"}
            </button>
        </div>
    );
};

export default AddEdit