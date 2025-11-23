import { useState } from 'react'
import illustrator1 from '../assets/images/illustrator1.svg'
import { useNavigate, Outlet } from 'react-router-dom'

const OnBoarding = () => {

  const navigate = useNavigate();

  const handleConnect = () => {
    navigate('/login');
  }

  const handleRegister = () => {
    navigate('/sign-up');
  }

  


  return (
    <>
      <div className="relative bg-primary h-screen w-[100vw] flex flex-col items-center justify-center">
        
        {/* ILLUSTRATION + CERCLE ENSEMBLE */}
        <div className="absolute flex items-center top-[5vh] w-[70vw] h-[70vw] sm:w-[40vw] sm:h-[40vw] lg:w-[30vw] lg:h-[30vw] xl:w-[20vw] xl:h-[20vw]">
          <img
            className="h-[100%] w-[100%] object-contain"
            src={illustrator1}
            alt=""
            style={{ zIndex: 1 }}
          />

          {/* CERCLE CENTRÉ */}
          <div className="
            bg-secondary 
            rounded-full 
            absolute 
            h-[100%] w-[100%]
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
          "></div>
        </div>

        {/* TEXTE + BOUTONS */}
        <div className="flex flex-col text-center items-center justify-center absolute bottom-[5vh] w-screen px-[20px]">
          <h1 className="text-white text-4xl font-extrabold w-full">
            Réjoins-nous
          </h1>

          <p className="text-white text-[24px] leading-[24px] mt-[20px] sm:w-[500px] w-full">
            Ton assistant pour apprendre, réviser et progresser chaque jour !
          </p>

          <div className="flex flex-col sm:flex-row w-full sm:justify-center gap-2 mt-10">
            <button className="bg-transparent border border-secondary text-secondary text-[20px] py-3 px-5 rounded-full" onClick={handleConnect}>
              Se connecter
            </button>
            <button className="bg-secondary text-primary text-[20px] py-3 px-5 rounded-full" onClick={handleRegister}>
              S'inscrire
            </button>
          </div>
        </div>

        <Outlet />

      </div>
    </>
  );
}

export default OnBoarding;
