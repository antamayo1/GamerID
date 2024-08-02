import React,{ useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import Footer from '../../components/Navbar/Footer';
import LoginIntro from '../../components/Info/loginIntro';

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    
    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!name){
            setError("Name is REQUIRED");
            return;
        }
        if(!validateEmail(email)){
            setError("Email is NOT VALID");
            return;
        }
        if(!password){
            setError("Password is REQUIRED");
            return;
        }

        setError("")

        try {
            const response = await axiosInstance.post("/create-account", {
                req_username: name,
                req_email:email,
                req_password:password
            });

            if(response.data && response.data.error) {
                setError(response.data.message);
            }

            if(response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/Home");
            }
        } catch (error) {
            if(error.response.data.message){
                setError(error.response.data.message);
            } else {
                setError("An Unexpected Error. Please try again.");
            }
        }
    }

    return (
        <>
        <div className='flex justify-between flex-col h-dvh'>
            <Navbar />
            <div className="flex flex-col md:flex-row md:max-w-2xl bg-background rounded shadow-lg max-w-md md:mx-auto m-xl mx-12">
                <LoginIntro header="Join us to craft your ultimate gamer card!" message="Start right now!"/>
                <div className=" border rounded bg-white md:px-7 md:py-10 px-5 py-5">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-3xl drop-shadow">Sign-up</h4>
                        <p className="text-muted-foreground text-slate-400 mb-6">Welcome new player!</p>
                        <input type="text" placeholder="In-game Name" className="input-box" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <input type="text" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                        <button type="submit" className="btn-primary text-lg">
                            Create Account
                        </button>
                        <p className="text-sm text-center mt-4">
                            Already have an account?
                        </p>
                        <p className='text-sm text-center'>
                        <Link to ="/Login" className="font-medium text-primary underline">
                            Log-in
                        </Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}

export default SignUp