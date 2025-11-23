import { getUserInfos } from "../api/userApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as HeroIcons from "@heroicons/react/24/outline";
import Illus2 from "../assets/images/illus2.svg";
import NavBar from "./NavBar";
import Notifications from "./Notifications";
import { getUserCourses } from "../api/courseApi";

const HomePage = () => {

    const [userInfos, setUserInfos] = useState(null);
    const [notifications, setNotifications] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return; // pas de token, on arrête

        const fetchUserInfos = async () => {
            try {
            const data = await getUserInfos(token);

            if (data) {
                setUserInfos(data);
                
                // Vérifier si l'utilisateur a des cours (seulement au premier chargement)
                const hasCheckedCourses = sessionStorage.getItem('hasCheckedCourses');
                
                if (!hasCheckedCourses) {
                    try {
                        const courses = await getUserCourses(data._id, token);
                        if (!courses || courses.length === 0) {
                            navigate('/create', { replace: true });
                        }
                        sessionStorage.setItem('hasCheckedCourses', 'true');
                    } catch (error) {
                        console.error("Erreur lors de la récupération des cours :", error);
                    }
                }
            } else {
                console.warn("Aucune donnée reçue de l'API");
            }
            } catch (error) {
                console.error("Erreur lors de la récupération des infos utilisateur :", error);
            }
        };

        fetchUserInfos();
    }, [navigate]);

    const fyp = [
        {
            id: 1,
            title: "Course 1",
            todo: "Course",
            category: "Course",
        },
        {
            id: 2,
            title: "Course 2",
            todo: "Course",
            category: "Course",
        },
        {
            id: 3,
            title: "Course 3",
            todo: "Course",
            category: "Course",
        },
        {
            id: 4,
            title: "Course 4",
            todo: "Course",
            category: "Course",
        },
        {
            id: 5,
            title: "Course 5",
            todo: "Course",
            category: "Course",
        },
    ]

    const courses = [
        {
            id: 1,
            title: "Course 1",
            todo: "Course",
            category: "Course",
        },
        {
            id: 2,
            title: "Course 2",
            todo: "Course",
            category: "Course",
        },
        {
            id: 3,
            title: "Course 3",
            todo: "Course",
            category: "Course",
        },
        {
            id: 4,
            title: "Course 4",
            todo: "Course",
            category: "Course",
        },
        {
            id: 5,
            title: "Course 5",
            todo: "Course",
            category: "Course",
        },
    ]

    return (
        <div className="flex flex-col">
            
            {userInfos ? (
                <div className="flex flex-col pt-6 p-5">
                    {/* Header */}
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-md sm:text-2xl">Salut <span className="font-bold">{userInfos?.firstname}</span> 👋</p>
                        <div className="flex flex-row items-center gap-1">
                            <div className="relative bg-black rounded-full p-2 ">
                                <HeroIcons.MagnifyingGlassIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div onClick={() => setNotifications(!notifications)} className="relative bg-black rounded-full p-2 ">
                                <HeroIcons.BellIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div onClick={() => navigate('/profile')} className="relative bg-black rounded-full p-2 ">
                                {userInfos.avatar ? (
                                    <img
                                    src={userInfos.avatar}
                                    alt="Avatar"
                                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                                    />
                                ) : (
                                    <HeroIcons.UserIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Banner */}
                    <div className="bg-primary relative p-5 mt-8 h-[180px] sm:h-[250px] rounded-3xl flex flex-row items-center justify-between">
                        <p className="text-white leading-[1] sm:leading-10 font-semibold text-2xl sm:text-4xl">Alors on fait <br /> quoi  <br />aujourd'hui ?</p>
                        <img className=" h-[110%] sm:h-[100%] absolute right-2 bottom-2" src={Illus2} alt="Illustration" />
                    </div>
                    {/* Courses */}
                    <div className="flex flex-col mt-5">
                        <p className="text-lg sm:text-2xl font-medium text-primary">Cours récents</p>
                        <div className="relative flex items-center mt-4">
                           <div className="w-full  h-full overflow-x-scroll will-change-scroll scroll-smooth whitespace-nowrap">
                            {courses.map((course) => (
                                <div key={course.id} className="w-[200px] shadow mb-4 p-3 relative h-[200px] mr-2 inline-block rounded-3xl bg-[#F5F5F5] items-center">
                                    <p className="text-white text-xs text-right bg-primary absolute top-3 right-3 py-1 px-2 rounded-full">{course.category}</p>
                                    <p className="text-black flex h-full items-center text-left text-xl font-semibold">{course.title}</p>
                                    <p className="text-black absolute bottom-3 left-3 text-xs bg-secondary border border-primary py-1 px-2 rounded-full">{course.todo}</p>
                                </div>
                            ))}
                           </div>
                        </div>
                    </div>

                    {/* Recommandation */}
                    <div className="custom-scroll flex flex-col mt-5">
                        <p className="text-lg sm:text-2xl font-medium text-primary">Recommandation pour toi</p>
                        <div className="relative flex items-center mt-4">
                           <div className="w-full  h-full overflow-x-scroll will-change-scroll scroll-smooth whitespace-nowrap">
                            {fyp.map((course) => (
                                <div key={course.id} className="w-[200px] shadow mb-4 p-3 relative h-[200px] mr-2 inline-block rounded-3xl bg-[#F5F5F5] items-center">
                                    <p className="text-white text-xs text-right bg-primary absolute top-3 right-3 py-1 px-2 rounded-full">{course.category}</p>
                                    <p className="text-black flex h-full items-center text-left text-xl font-semibold">{course.title}</p>
                                    <p className="text-black absolute bottom-3 left-3 text-xs bg-secondary border border-primary py-1 px-2 rounded-full">{course.todo}</p>
                                </div>
                            ))}
                           </div>
                        </div>
                    </div>
                    
                    {notifications && <Notifications setNotifications={setNotifications}/>}
                    
                </div>
            ) : (
                <p className="text-xl">Chargement...</p>
            )}
            <NavBar />
        </div>
    )
}

export default HomePage
