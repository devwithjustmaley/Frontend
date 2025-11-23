import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../api/AuthContext"
import { ErrorContext } from "../api/ErrorContext"
import { SignUpUser } from "../api/userApi"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const handleShowPassword = (e) => {
       e.preventDefault();
       setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = (e) => {
       e.preventDefault();
       setShowConfirmPassword(!showConfirmPassword);
    }

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { showError } = useContext(ErrorContext);
    const [program, setProgram] = useState('');
    const [level, setLevel] = useState('');
    const [lastname, setLastName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleProgram = (e) => {
        e.preventDefault();
        setProgram(e.target.value);
    }

    const handleLevel = (e) => {
        e.preventDefault();
        setLevel(e.target.value);
    }

    const handleClose = () => {
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!lastname || !firstname || !phone_number || !program || !level || !password || !confirmPassword) {
            showError('Veuillez remplir tous les champs');
            return;
        }

        if (password !== confirmPassword) {
            showError('Les mots de passe ne correspondent pas');
            return;
        }

        if (phone_number.length !== 10 ) {
            showError('Le numéro de téléphone doit contenir 10 chiffres');
            return;
        }



        try {
            const response = await SignUpUser(lastname, firstname, phone_number, program, level, password);
            
            if (response.token) {
                login(response.token);
                navigate('/create');
                return;
            } else {
                showError(response.message || 'Erreur lors de l\'inscription');
            }
        } catch (error) {
            showError(error.message || 'Erreur de connexion au serveur');
        }
    }

    return (
        <div className="absolute top-0 left-0 h-[100vh] w-[100vw] bg-black/50 flex items-end justify-center z-50" onClick={handleClose}>
            <div className="absolute bottom-0 bg-white p-8 rounded-t-[50px] w-full text-center " onClick={(e) => e.stopPropagation()}>
                <form action="" className="flex flex-col gap-4 mt-5">
                    <div className="flex flex-col gap-4">
                        <input className="w-full rounded-full p-3 outline outline-gray-50 focus:outline-primary" required type="text" placeholder="Nom" onChange={(e) => setLastName(e.target.value)}/>
                        <input className="w-full rounded-full p-3 outline outline-gray-50 focus:outline-primary" required type="text" placeholder="Prénom" onChange={(e) => setFirstName(e.target.value)}/>
                        <input className="w-full rounded-full p-3 outline outline-gray-50  focus:outline-primary" required type="tel" placeholder="Numéro de telephone" onChange={(e) => setPhoneNumber(e.target.value)}/>
                        <select className="border border-gray-50 rounded-3xl p-3" required value={program} onChange={handleProgram}>
                            <option value="" disabled selected hidden>
                                Fillière
                            </option>
                            <option value="COMMUNICATION">COMMUNICATION</option>
                            <option value="SEG">SEG</option>
                            <option value="DROIT">DROIT</option>
                            <option value="ACG">ACG</option>
                            <option value="IGL">IGL</option>
                            <option value="ANGLAIS">ANGLAIS</option>
                            <option value="MP">MP</option>
                            <option value="FC">FC</option>
                        </select>
                        <select className="border border-gray-50 rounded-lg p-3" required value={level} onChange={handleLevel}>
                            <option value="" disabled selected hidden>
                                Année
                            </option>
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                            <option value="M1">M1</option>
                            <option value="M2">M2</option>
                        </select>
                        <div className="flex items-center gap-3 justify-end align-center">
                            <input required className="w-full rounded-full p-3 outline outline-gray-50  focus:outline-primary"  type={showPassword ? "text" : "password"} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}/>
                            <button type="button" onClick={handleShowPassword} className="text-primary text-[20px]">
                                {showPassword ? <EyeIcon className="w-8 h-8" /> : <EyeSlashIcon className="w-8 h-8" />}
                            </button>
                        </div>
                        <div className="flex items-center gap-3 justify-end align-center">
                            <input required className="w-full rounded-full p-3 outline outline-gray-50  focus:outline-primary" type={showConfirmPassword ? "text" : "password"} placeholder="Confirmer le mot de passe" onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <button type="button" onClick={handleShowConfirmPassword} className="text-primary text-[20px]">
                                {showConfirmPassword ? <EyeIcon className="w-8 h-8" /> : <EyeSlashIcon className="w-8 h-8" />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="bg-secondary text-primary text-[20px] py-3 px-5 rounded-full border-[2px] border-primary" onClick={handleSubmit}>S'inscrire</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp