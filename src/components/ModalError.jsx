import { useContext } from "react";
import { ErrorContext } from "../api/ErrorContext";

const ModalError = () => {
    const { error, clearError } = useContext(ErrorContext);

    if (!error) return null;
    
    const handleClose = () => {
        clearError();
    }
    
    return (
        <div className="absolute top-0 left-0 h-[100vh] w-[100vw] bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
            <div className="bg-error p-8 rounded-3xl w-[90%] max-w-md text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col gap-4">
                    <h2 className="text-white text-[24px] font-bold">Erreur</h2>
                    <p className="text-white text-[18px]">{error}</p>
                    <button 
                        onClick={handleClose}
                        className="bg-white text-error text-[18px] py-2 px-6 rounded-full font-semibold mt-2"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalError;