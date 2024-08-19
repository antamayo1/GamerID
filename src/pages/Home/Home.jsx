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
import CardPreview from '../../components/Cards/CardPreview';


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
            console.log(error);
            if(error.response.status == 403){
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
        <div className='whole-page'>
            <Navbar userInfo={userInfo}/>
            <div className='flex items-center h-fit justify-center gap-7 flex-col md:flex-row'>
                <div className="flex flex-col md:p-6 p-2">
                    {allGames.length > 0 ? <div className='grid grid-cols-1 mb-4 gap-4'>
                        {allGames.map((item) => (
                            <GameCard
                            key={item._id}
                            GameTitle={item.game_title}
                            GamerID={item.game_UID}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteGame(item)}
                        />
                        ))}
                    </div> : <EmptyCard imageSource={addGameImage} />}
                    <button
                        className="h-12 flex items-center justify-center rounded bg-primary hover:bg-blue-400 text-xl text-white"
                        title='Add Game'
                        onClick={() => {
                            setOpenAddEditModal({ isShown:true, type:"add", data:null});
                        }}>
                        <MdAdd className='size-8'/>
                    </button>
                </div>
                <CardPreview userInfo = {userInfo}/>
            </div>
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