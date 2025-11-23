import * as HeroIcons from "@heroicons/react/24/outline";
import { useState } from "react";

const Notifications = ({setNotifications}) => {

    const [notifications, setNotification] = useState([
        
        {
            message: "Tu a 5 quiz en économie à faire",
        },
        {
            message: "Oublie pas de réviser la finance pour demain",
        },
        {
            message: "Ton abonnement expire dans 9 jours",
        },
    ]);

    const handleDeleteNotification = (index) => {
        const newNotifications = [...notifications];
        newNotifications.splice(index, 1);
        
    }

    return (
        notifications.length > 0 ? (
            <div onClick={() => setNotifications(false)} className="fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-50">
                <div className="flex flex-col items-center w-full h-[80%] overflow-y-scroll mt-20 px-2">
                    {notifications.map((notification, index) => (
                        <div onClick={(e) => e.stopPropagation()} className="bg-white mx-5 rounded-3xl flex flex-row items-center justify-between w-full p-5 mb-2">
                            <p className="w-[90%] text-sm">{notification.message}</p>
                            <HeroIcons.TrashIcon className="w-8 h-8 bg-error rounded-full p-1 cursor-pointer sm:w-8 sm:h-8 text-white" onClick={() => handleDeleteNotification(index)}/>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div onClick={() => setNotifications(false)} className="fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-50">
                <p className="text-2xl flex font-semibold text-white text-center justify-center items-center h-screen rounded-3xl">Aucune notification</p>
            </div>
        )
    )
}

export default Notifications