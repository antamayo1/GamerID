import React,{ useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

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
            <Navbar/>
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-2xl mb-7 drop-shadow">Sign-up</h4>
                        <input type="text" placeholder="Name" className="input-box" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <input type="text" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                        <button type="submit" className="btn-primary">
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
        </>
    )
}

export default SignUp