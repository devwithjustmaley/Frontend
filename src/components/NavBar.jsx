import * as HeroIcons from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    return (

        <div className="bg-primary gap-1 primary fixed bottom-3 left-1/2 transform -translate-x-1/2 rounded-full p-2 flex flex-row items-center justify-evenly w-[60vw]">
            <HeroIcons.HomeIcon onClick={() => navigate('/')} className="w-9 h-9 sm:w-8 sm:h-8 text-white" />
            <HeroIcons.PlusIcon onClick={() => navigate('/create')} className="w-10 h-10 bg-secondary rounded-full sm:w-8 sm:h-8 text-primary" />
            <HeroIcons.BookmarkIcon onClick={() => navigate('/profile')} className="w-9 h-9 sm:w-8 sm:h-8 text-white" />
        </div>
    )
}

export default NavBar