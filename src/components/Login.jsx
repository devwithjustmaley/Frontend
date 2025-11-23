import { LogUser } from "../api/userApi";
import { useState, useContext } from "react";
import { AuthContext } from "../api/AuthContext";
import { ErrorContext } from "../api/ErrorContext";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import ForgotPassword from "./ForgotPassword";



const Login = () => {
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { showError } = useContext(ErrorContext);
    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    
    const handleShowPassword = () => {
       setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!phone_number || !password) {
            showError('Veuillez remplir tous les champs');
            return;
        }
        
        try {
            const response = await LogUser(phone_number, password);
            
            if (response.token) {
                login(response.token);
                navigate('/home');

                
            } else {
                showError(response.message || 'Erreur de connexion');
            }
        } catch (error) {
            showError(error.message || 'Erreur de connexion au serveur');
        }
    }

    const handleClose = () => {
        navigate('/');
    }

    const handleForgotPassword = () => {
        setShowForgotPassword(true);
    }

    return (
        <>
            {!showForgotPassword && (
                <div className="relative top-0 left-0 h-[100vh] w-[100vw] bg-black/50 flex items-end justify-center z-50" onClick={handleClose}>
                    <div className="absolute bottom-0 bg-white p-8 rounded-t-[50px] w-full text-center " onClick={(e) => e.stopPropagation()}>
                        <form action="" className="flex flex-col gap-4 mt-5">
                            <div className="flex flex-col gap-4">
                                <input className="w-full rounded-full p-3 outline outline-gray-50  focus:outline-primary" required type="tel" placeholder="Numéro de téléphone (ex: 0707070707)" onChange={(e) => setPhoneNumber(e.target.value)} />
                                <div className="flex items-center gap-3 justify-end align-center">
                                    <input className="w-full rounded-full p-3 outline outline-gray-50  focus:outline-primary" autoComplete="current-password" required type={showPassword ? "text" : "password"} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
                                    <button type="button" onClick={handleShowPassword} className="text-primary text-[20px]">
                                        {showPassword ? <EyeIcon className="w-8 h-8" /> : <EyeSlashIcon className="w-8 h-8" />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="bg-secondary text-primary text-[20px] py-3 px-5 rounded-full border-[2px] border-primary" onClick={handleSubmit}>Se connecter</button>
                        </form>
                        <p className="text-primary text-[20px] mt-5 mb-5">Mot de passe oublié ? <a onClick={handleForgotPassword} className="text-blue-500 cursor-pointer">Clique ici</a></p>
                    </div>
                </div>
            )}
            {showForgotPassword && <ForgotPassword />}
        </>
    )
}

export default Login