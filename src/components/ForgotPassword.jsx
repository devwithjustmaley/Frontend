import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const handleClose = () => {
        navigate('/');
    }
    return (
        <div className="absolute top-0 left-0 h-[100vh] w-[100vw] bg-black/50 flex items-end justify-center z-50" onClick={handleClose}>
            <div className="h-[20vh] bg-white p-8 rounded-t-[50px] w-full text-center " onClick={(e) => e.stopPropagation()}>
               
                <form className="flex flex-col gap-4 mt-5">
                    <input className="w-full rounded-full p-3 outline outline-gray-50  focus:outline-primary" type="text" placeholder="Numéro de téléphone" />
                    <button className="bg-secondary text-primary text-[20px] py-3 px-5 rounded-full border-[2px] border-primary" type="submit">Envoyer</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
