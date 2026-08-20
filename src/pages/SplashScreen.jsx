import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/icons/logo.png";

function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    const navigateTimer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div
      onClick={handleClick}
      className="flex min-h-screen cursor-pointer items-center justify-center bg-[#F4FAF6]"
    >
      <img
        src={Logo}
        alt="PureBite"
        className={`w-[190px] object-contain transition-all duration-500
        ${
          fadeOut
            ? "scale-90 opacity-0"
            : "scale-100 opacity-100 animate-logo"
        }`}
      />
    </div>
  );
}

export default SplashScreen;