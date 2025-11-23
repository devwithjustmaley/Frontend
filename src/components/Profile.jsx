import * as HeroIcons from "@heroicons/react/24/outline";
import { getUserInfos, LogoutUser } from "../api/userApi";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../api/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    
    const token = localStorage.getItem("token");
    const [userInfos, setUserInfos] = useState(null);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const fetchUserInfos = async () => {
        try {
            const data = await getUserInfos(token);
            setUserInfos(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des infos utilisateur :", error);
        }
    };
    useEffect(() => {
        fetchUserInfos();
    }, []);

    const handleLogout = async () => {
        try {
            await LogoutUser(token);
            logout();
            navigate('/');
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
            // Déconnexion locale même si l'API échoue
            logout();
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col">
            <HeroIcons.ArrowLeftIcon className="absolute top-5 left-5 w-10 h-10 text-white cursor-pointer" onClick={() => navigate('/')} />
            <div className="bg-primary h-[16vh] w-full"></div>
            <div className="absolute left-1/2 transform p-4 -translate-x-1/2 top-[5vh] bg-primary h-[20vh] w-[20vh] rounded-full">
                <HeroIcons.UserIcon className="w-full h-full text-white" />
            </div>
            <div className="flex flex-col items-center mt-[10vh]">
                <p className="text-black text-2xl font-semibold">{userInfos?.firstname} {userInfos?.lastname}</p>
                <p className="text-black text-lg font-medium">{userInfos?.program} ({userInfos?.level})</p>
            </div>

            <div className="flex flex-col items-center mt-[10vh] w-full px-3">
                <p onClick={handleLogout} className="w-full text-center text-lg font-medium bg-error text-white p-2 rounded-full cursor-pointer">Déconnexion</p>
            </div>
        </div>
    )
}

export default Profile
