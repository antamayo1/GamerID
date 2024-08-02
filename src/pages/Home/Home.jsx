import React,{ useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import GameCard from '../../components/Cards/GameCard'; 
import { MdAdd } from 'react-icons/md';
import AddEdit from './AddEdit';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/Cards/EmptyCard';
import addGameImage from "../../assets/addGame.svg"
import Footer from '../../components/Navbar/Footer';


const Home = () => {

    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: "",
        type: "add"
    });

    const [allGames, setAllGames] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    const handleEdit = (gameDetails) => {
        setOpenAddEditModal({
            isShown:true,
            type:"edit",
            data:gameDetails
        });
    }

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown:true,
            message,
            type
        });
    }

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown:false,
            message: "",
        });
    }

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    });

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if(error.response.status == 401){
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    const getAllGames = async () => {
        try {
            const response = await axiosInstance.get("/get-all-games");
            if(response.data && response.data.games){
                setAllGames(response.data.games);
            }
        } catch (error) {
            console.log("Unexpected error. Please try again");
        }
    };

    const deleteGame = async (data) => {
        const gameCardID = data._id;
        try {
            const response = await axiosInstance.delete("/delete-game/" + gameCardID);
            if(response.data && !response.data.error){
                showToastMessage("Game Deleted Successfully", "delete");
                getAllGames();
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        getAllGames();
        getUserInfo();
        return () => {};
    }, []);

    return (
        <>
        <div className='flex justify-between flex-col h-dvh'>
            <Navbar userInfo={userInfo}/>
            <div className="container mx-auto w-1/2">
                {allGames.length > 0 ? <div className='grid grid-cols-1 gap-4 mt-4'>
                    {allGames.map((item) => (
                        <GameCard
                        key={item._id}
                        GameTitle={item.game_title}
                        GamerID={item.game_UID}
                        onEdit={() => handleEdit(item)}
                        onDelete={() => deleteGame(item)}
                    />
                    ))}
                </div> : <EmptyCard imageSource={addGameImage}  message="Click the Add button below to add a Game and Game ID to your list!"/>}
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
                title='Add Game'
                onClick={() => {
                    setOpenAddEditModal({ isShown:true, type:"add", data:null});
                }}>
                <MdAdd className="text-[32px] text-white "/>
            </button>
            <Modal
                ariaHideApp={false}
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                }}
                contentLabel = ""
                className = "w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow -scroll"
            >
                <AddEdit
                    type={openAddEditModal.type}
                    GameData={openAddEditModal.data}
                    onClose={() => setOpenAddEditModal({ isShown:false, type:"add", date:null})}
                    getAllGames = { getAllGames }
                    showToastMessage = { showToastMessage }
                />
            </Modal>
            
            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            />
            
            <Footer />
        </div>
        </>
    )
}

export default Home