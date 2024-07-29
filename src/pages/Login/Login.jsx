import React,{ useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from "react-router-dom"
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import LoginIntro from '../../components/Info/LoginIntro'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if(!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if(!password){
            setError("Please enter password.");
            return;
        }

        setError("");

        try {
            const response = await axiosInstance.post("/login", {
                req_email:email,
                req_password:password
            });
            if(response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/Home");
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if(error.response.data.message){
                setError(error.response.data.message);
            } else {
                setError("An Unexpected Error. Please try again.");
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row md:max-w-2xl bg-background rounded shadow-lg max-w-md mx-auto mt-14 md:mt-28 m-xl">
                <LoginIntro />
                <div className="flex items-center justify-center border rounded bg-white px-4 py-10">
                    <form onSubmit={handleLogin} className="w-56">
                        <h4 className="text-3xl drop-shadow">Log In</h4>
                        <p className="text-muted-foreground text-slate-400">Welcome back!</p>
                        <p className="text-muted-foreground mb-7 text-slate-400">Please log in to your account!</p>
                        <input type="email" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {error && <p className="text-red-500 text-2xs pb-1">{error}</p>}
                        <button type="submit" className="btn-primary">
                            Log in
                        </button>
                        <p className="text-sm text-center mt-4">
                            Not Registered Yet?
                        </p>
                        <p className='text-sm text-center'>
                        <Link to ="/SignUp" className="font-medium text-primary underline">
                            Create An Account
                        </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login