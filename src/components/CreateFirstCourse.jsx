
import addCourse from "../api/courseApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateFirstCourse = () => {

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [attachment, setAttachment] = useState("");
    const [fileName, setFileName] = useState("");
    const navigate = useNavigate();
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];
        

        if (!allowedTypes.includes(file.type)) {
            alert("Seuls les fichiers PDF ou Word sont acceptés !");
            e.target.value = null; // réinitialise le input
            return;
        }

        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setAttachment(e.target.files[0]);
        } else {
            setFileName("");
        }
    }

    const handleSubmit = async () => {


        const token = localStorage.getItem('token');
        if(!token) {
            alert("Veuillez vous connecter");
            return;
        }
        
        try {
            const data = await addCourse(title, subject, attachment, token);

            if(data.message === "Cours ajouté avec succès") {
                alert("Cours ajouté avec succès");
                setTitle("");
                setSubject(""); 
                setAttachment("");
                setFileName("");
                navigate('/home', { replace: true });
            }
            console.log(data)
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'ajout du cours");
        }
    }

    return (
        <div className="bg-secondary h-full absolute bottom-0 w-full flex flex-col text-center items-center justify-center">
            <h1 className="text-5xl leading-10 font-bold mb-10">Ajoute ton premier cours</h1>

            <div className="flex flex-col gap-2 w-full px-4">
                <input type="text" className="p-2 border border-spacing-0 outline-none focus:border-primary w-full px-4 py-4 rounded-full" placeholder="Titre du cours" onChange={(e) => setTitle(e.target.value)} />
                <input type="text" className="p-2 border border-spacing-0 outline-none focus:border-primary w-full px-4 py-4 rounded-full" placeholder="Matière" onChange={(e) => setSubject(e.target.value)} />
                <label htmlFor="file_upload" accept=".pdf,.doc,.docx" className="cursor-pointer bg-white text-gray-500 rounded-full text-left px-4 py-4 border border-spacing-0">{fileName || "Support de cours"}</label>
                <input type="file" id="file_upload" className="hidden" onChange={handleFileChange}/>
                <button className="bg-black text-white p-2 rounded-full mt-4 w-full px-4 py-4 border" onClick={handleSubmit}>Créer</button>
            </div>
        </div>
    );
};

export default CreateFirstCourse